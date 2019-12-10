import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Dimmer,
  Loader,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Tab,
  Input,
  Label,
  Statistic,
  Modal,
  Form,
  Table,
  Popup,
  Dropdown,
  Checkbox,
} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import firebase from './components/Firebase';
import { VenueDetails } from './VenueDetails';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const db = firebase.firestore();
const storage = firebase.storage().ref();

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.setState({ user: null, isLoggedIn: false });
      console.log('Sign out successful');
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    const { children, user } = this.props
    const { fixed } = this.state

    return (
       <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
         <Visibility
           once={false}
           onBottomPassed={this.showFixedMenu}
           onBottomPassedReverse={this.hideFixedMenu}
         >
           <Segment
             inverted
             textAlign='center'
             style={{ backgroundImage: `url('https://source.unsplash.com/random')`,
               backgroundSize: 'cover',
               backgroundAttachment: 'fixed',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               // opacity: 0.6,
               minHeight: 150,
               Zindex: 0,
             padding: '1em 0em' }}
             vertical
           >

             <Menu
               fixed={fixed ? 'top' : null}
               inverted={!fixed}
               pointing={!fixed}
               secondary={!fixed}
               size='large'
               style={{ borderWidth: 0 }}
             >
               <Container>
                 <Menu.Item header>Our Company</Menu.Item>
                 <Menu.Item as={Link} to='/'>
                   Home
                 </Menu.Item>
                 <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
                 <Menu.Item as='a'>Venues</Menu.Item>
                 <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
                 <Menu.Item position='right'>
                   { user ?
                     ([(<Dropdown item text="Profile" pointing>
                       <Dropdown.Menu>
                         <Dropdown.Item>Dashboard</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>),
                       (<Button as='a' inverted={!fixed} onClick={this.handleSignOut} secondary icon labelPosition='left'>
                         <Icon name='power off'/>
                         Logout
                       </Button>)])
                   :
                   [(<Button as='a' inverted={!fixed}>
                     Log in
                   </Button>),
                     (<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                       Sign Up
                     </Button>)]
                   }
                 </Menu.Item>
               </Container>
             </Menu>
           </Segment>
         </Visibility>

         {children}
       </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Sign out successful');
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    const currUser = firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        console.log(user);
        return user;
      }
  });
    const { children } = this.props
    const { sidebarOpened } = this.state
    const user = currUser;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='scale down'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item header>Our Company</Menu.Item>
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as='a'>Venues</Menu.Item>
          <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
          {user ?
            (
              [(<Menu.Item as='a'>Dashboard</Menu.Item>),
              (<Menu.Item as='a'>Notifications</Menu.Item>),
              (<Menu.Item as='a' onClick={this.handleSignOut}>Logout</Menu.Item>)]
            )
          :
          ([(<Menu.Item as='a'>Log in</Menu.Item>),
            (<Menu.Item as='a'>Sign Up</Menu.Item>)])}
          <Menu.Item as='a' onClick={this.handleSidebarHide}><Icon name='close'/></Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ backgroundImage: `url('https://source.unsplash.com/random')`,
                backgroundSize: 'cover',
                Zindex: -2,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // opacity: 0.6,
                minHeight: 150,
            padding: '1em 0em' }}
            vertical
          >

            <Container style={{ 	backgroundColor: "#333333",
              opacity: 0.6,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            Zindex: -2 }}>
              <Container>
                <Menu inverted pointing secondary size='large' style={{ borderWidth: 0 }}>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {user ?
                      ""
                    :
                    ([<Button as='a' inverted>
                      Log in
                    </Button>],
                      [<Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>])}
                  </Menu.Item>
                </Menu>
              </Container>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, user }) => (
  <div>
    <DesktopContainer user={user}>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
}

export function ManagerDashboard() {
  const [manager, setManager] = React.useState([]);
  const [venue, setVenue] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    setActive(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        db.collection("Managers").doc(user.uid).get().then(doc => {
          if (doc.exists){
            db.collection("Venues").where("managerUID", "==", user.uid).get().then(querySnapshot => {
              let venue = [];
              querySnapshot.forEach(doc =>
                venue.push({ ...doc.data() })
              );
              setVenue(venue);
              console.log(venue);
            })
            setManager(doc.data());
            setActive(false);
          }
          else {
            setManager(null);
            setActive(false);
          }
        });
      }
      else {
        setManager(null);
        setRedirect(true);
        setActive(false);
      }
    });
  }, []);

  const panes = [
    { menuItem: { key: 'details', icon: 'building', content: 'Details' }, render: () => <Segment raised><VenueDetails venue={venue}/></Segment> },
    { menuItem: { key: 'menu', icon: 'clipboard', content: 'Menu' }, render: () => <Segment raised>{venue.map(ven => (<Menus venue={ven}/>))}</Segment> },
    { menuItem: { key: 'photos', icon: 'image', content: 'Photos' }, render: () => <Segment raised>{venue.map(ven => (<Photos venue={ven}/>))}</Segment> },
  ]

  return(
    <ResponsiveContainer user={manager}>
      <Dimmer active={active} page>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
      <Container style={{ padding: '5em 0em' }}>
        <Header size='huge' textAlign='center'>
          <Icon name='dashboard' color='grey'/>
          <Header.Content>Manager Dashboard</Header.Content>
        </Header>
        <Segment padded raised size='small'>
          <Grid centered doubling columns={6} divided='vertically'>
            <Grid.Column textAlign='center'>
              {venue.map(ven=>(
                [
                (<Image src={ven.venueImgUrl ? ven.venueImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='small' circular/>),
                (<Header>
                  <Header.Content>{manager.venueName}</Header.Content>
                  <Header.Subheader>{ven.venueCategory}</Header.Subheader>
                </Header>)
                ]
              ))}
              {/* <Image src={venue.venueImgUrl ? venue.venueImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='small' circular/>
                <Header>
                <Header.Content>{manager.venueName}</Header.Content>
                <Header.Subheader>Venue Category</Header.Subheader>
              </Header> */}
            </Grid.Column>
          </Grid>
        </Segment>
        <Tab menu={{ fluid: true, vertical: true, pointing: true }} panes={panes}/>
      </Container>
    </ResponsiveContainer>
  );
}

Menus.propTypes = {
  venue: PropTypes.any.isRequired,
}

function Menus(props) {
  const {venue} = props
  const docRef = firebase.firestore().collection("Venues").doc(venue.uid);
  const [menus, setMenus] = React.useState([]);
  const fileInputRef = React.createRef();
  const [menuImgs, setMenuImgs] = React.useState([]);
  React.useEffect(() => {
    docRef.collection("Menus").get().then(querySnapshot => {
      if(querySnapshot){
        let menus = [];
        querySnapshot.forEach(doc => menus.push({ ...doc.data() }))
        setMenus(menus);
      }
      else {
        setMenus([]);
      }
    })
  }, []);
  const handleMenuUpload = e => {
    console.log(e.target.files);
    setMenuImgs(e.target.files);
  }

  const uploadMenus = e => {
    if (menuImgs) {
      console.log(menuImgs)
      for(var i = 0; i < menuImgs.length; i++){
        const file = menuImgs[i];
        console.log(file);
        const uploadMenus = storage.child(`VenueMenus/${venue.venueName}/${file.name}`).put(file);
        uploadMenus.on(
          'state_changed', function(snapshot){

          },
          function(error) {
            console.log('Error occured during upload')
          },
          function() {
            uploadMenus.snapshot.ref.getDownloadURL().then(function(url) {
              docRef.collection("Menus").doc(file.name).set({
                'menuUrl': url,
                'menuName': file.name
              });
            });
          }
        );
      }
    }
    else {
      console.log('No file to be uploaded');
    }
  }
  const menuPanes = [
    {
      menuItem: 'Upload Menu',
      render: () =>
      <Tab.Pane>
        <Segment placeholder>
          <Header icon>
            <Icon name='clipboard' />
            <Header.Content>Upload menus for your venue (jpeg, jpg, png)</Header.Content>
            <Header.Subheader>You can upload multiple files</Header.Subheader>
          </Header>
          <Segment.Inline>
            <Button type='button' primary onClick={() => fileInputRef.current.click()}>Choose from files</Button>
            <input type='file' ref={fileInputRef} multiple hidden onChange={handleMenuUpload}/>
            <Button type='submit' secondary onClick={uploadMenus}>Upload</Button>
          </Segment.Inline>
        </Segment>
      </Tab.Pane>
    },
    {
      menuItem: 'View Menus',
      render: () =>
      <Tab.Pane>
        <Card.Group centered items={menus.count}>
          {menus.map(menu => (
            <Modal
              trigger={
                <Card link>
                  <Image src={menu.menuUrl} wrapped ui={false} size='small'/>
                  <Card.Content>
                    <Card.Header>{menu.menuName}</Card.Header>
                  </Card.Content>
                </Card>
              }
              size='fullscreen'
              closeIcon
            >
              <Modal.Header>{menu.menuName}</Modal.Header>
              <Modal.Content image scrolling>
                <Image src={menu.menuUrl} wrapped size='massive' centered style={{ paddingBottom: 5 }}/>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red'>
                  <Icon name='delete'/>Delete
                </Button>
              </Modal.Actions>
            </Modal>
          ))}
        </Card.Group>
      </Tab.Pane>
    }
  ]
  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={menuPanes}/>
  );
}

Photos.propTypes = {
  venue: PropTypes.any.isRequired,
}

function Photos(props) {
  const {venue} = props;
  const docRef = firebase.firestore().collection("Venues").doc(venue.uid);
  const [photos, setPhotos] = React.useState([]);
  const fileInputRef = React.createRef();
  const [photoImgs, setPhotoImgs] = React.useState([]);
  React.useEffect(() => {
    docRef.collection("Photos").get().then(querySnapshot => {
      if(querySnapshot){
        let photos = [];
        querySnapshot.forEach(doc => photos.push({ ...doc.data() }))
        setPhotos(photos);
      }
      else {
        setPhotos([]);
      }
    })
  }, [])
  const handlePhotoUpload = e => {
    console.log(e.target.files);
    setPhotoImgs(e.target.files)
  }
  const uploadPhotos = e => {
    if(photoImgs) {
      for(var i = 0; i < photoImgs.length; i++) {
        const file = photoImgs[i];
        const uploadPhoto = storage.child(`VenuePhotos/${venue.venueName}/${file.name}`).put(file);
        uploadPhoto.on('state_changed',
        function (snapshot){

        },
        function (error){
          console.log(error);
        },
        function (){
          uploadPhoto.snapshot.ref.getDownloadURL().then(function(url){
            docRef.collection("Photos").doc(file.name).set({
              photoUrl: url,
              photoName: file.name
            });
          });
        }
      );
      }
    }
    else {
      console.log('No file to be uploaded');
    }
  }
  const photoPanes = [
    {
      menuItem: 'Upload Photos',
      render: () =>
      <Tab.Pane>
        <Segment placeholder>
          <Header icon>
            <Icon name='image' />
            <Header.Content>Upload featured photos for your venue (jpeg, jpg, png)</Header.Content>
            <Header.Subheader>You can upload multiple files</Header.Subheader>
          </Header>
          <Segment.Inline>
            <Button type='button' primary onClick={() => fileInputRef.current.click()}>Choose from files</Button>
            <input type='file' ref={fileInputRef} multiple hidden onChange={handlePhotoUpload}/>
            <Button type='submit' secondary onClick={uploadPhotos}>Upload</Button>
          </Segment.Inline>
        </Segment>
      </Tab.Pane>
    },
    {
      menuItem: 'Featured Photos',
      render: () =>
      <Tab.Pane>
        <Card.Group centered items={photos.count}>
          {photos.map(photo => (
            <Modal
              trigger={
                <Card link>
                  <Image src={photo.photoUrl} wrapped ui={false} size='small'/>
                </Card>
              }
              basic
              size='large'
              closeIcon
            >
              <Modal.Content image>
                <Image src={photo.photoUrl} size='big' centered size={{ paddingBottom: 5 }}/>
              </Modal.Content>
            </Modal>
          ))}
        </Card.Group>
      </Tab.Pane>
    }
  ]
  return(
    <Tab menu={{ secondary: true, pointing: true }} panes={photoPanes}/>
  );
}
