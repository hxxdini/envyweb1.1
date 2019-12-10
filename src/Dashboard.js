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
import { EditEvent } from './EditEvent';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const db = firebase.firestore();
const storage = firebase.storage().ref();

class DesktopContainer extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.setState({ isLoggedIn: false });
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
            (<Menu.Item as='a'>Sign Up</Menu.Item>)])
          }
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
                      </Button>])
                    }
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

const ResponsiveContainer = ({ children, user }) => {
  // const [user, setUser] = React.useState(firebase.auth().currentUser);
//   React.useEffect(() => {
//     firebase.auth().onAuthStateChanged(function(user){
//       if (user) {
//         console.log(user);
//         setUser(user);
//       }
//       else {
//         setUser(null);
//       }
//   })
// }, []);
  return(
  <div>
    <DesktopContainer user={user}>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
}


export function Dashboard() {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [userInfo, setUserInfo] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    setActive(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // setUser(user);
        console.log(user)
        db.collection("Users").doc(user.uid).get().then(doc => {
          if(doc.exists){
          db.collection("Users").doc(user.uid).collection("friendRequests").where("agree", "==", true).get().then(
            querySnapshot => {
              let friends = [];
              querySnapshot.forEach(doc =>
                friends.push({ ...doc.data() })
              );
              console.log(friends);
              setFriends(friends);
            }
          );
          db.collection("Events").where("createdBy", "==", user.uid).get()
          .then(querySnapshot => {
            let events = [];
            querySnapshot.forEach(doc =>
              events.push({ ...doc.data() })
            )
            console.log(events);
            setEvents(events);
          });
          console.log(doc.data().uid);
          setUserInfo(doc.data());
        }
        else {
          setRedirect(true);
        }
        })
        console.log(user);
        setActive(false);
      }
      else {
        setRedirect(true);
        setUser(null);
        setActive(false);
      }
    });
  }, []);


  const panes = [
    { menuItem: { key: 'events', icon: 'calendar alternate', content: 'Events' }, render: () => <Segment raised><Event events={events}/></Segment> },
    // { menuItem: { key: 'venues', icon: 'building', content: 'Venues' }, render: () => <Segment padded raised>Tab 2 Content</Segment> },
    { menuItem: { key: 'friends', icon: 'users', content: 'Friends' }, render: () => <Segment raised><Friends userInfo={userInfo} friends={friends}/></Segment> },
    { menuItem: { key: 'profile', icon: 'user', content: 'Profile' }, render: () => <Segment raised><Profile userInfo={userInfo}/></Segment>},
  ]

  return (
      <ResponsiveContainer user={user}>
        {redirect ? (<Redirect to='/'/>) : ""}
        <Dimmer active={active} page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Container style={{ padding: '5em 0em' }}>
          <Header size='huge' textAlign='center'>
            <Icon name='dashboard' color='grey'/>
            <Header.Content>Dashboard</Header.Content>
          </Header>
          <Segment padded raised size='small'>
            <Grid centered doubling columns={6} divided='vertically'>
              <Grid.Column textAlign='center'>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' circular/>
                <Header>
                  <Header.Content>{userInfo.firstName} {userInfo.lastName}</Header.Content>
                  <Header.Subheader>{userInfo.username ? (`@${userInfo.username}`) : ''}</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Row centered columns={6} textAlign='center'>
                <Grid.Column textAlign='center'>
                  <Header size='tiny'>
                    { userInfo.biography ? userInfo.biography : "Briefly describe your profile" }
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row centered columns={6} divided textAlign='center'>
                <Grid.Column>
                  <Statistic size='small'>
                    <Statistic.Value>{friends.length}</Statistic.Value>
                    <Statistic.Label>Friends</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column>
                  <Statistic size='small'>
                    <Statistic.Value>{events.length}</Statistic.Value>
                    <Statistic.Label>Events Created</Statistic.Label>
                  </Statistic>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Tab menu={{ fluid: true, vertical: true, pointing: true }} panes={panes}/>
          </Container>
      </ResponsiveContainer>
  );
}

Event.propTypes = {
  events: PropTypes.any.isRequired,
}

function Event(props) {
  const {events} = props
  const eventPanes = [
    {
      menuItem: 'Upcoming',
      render: () => <Tab.Pane attached={false}><Upcoming events={events}/></Tab.Pane>,
    },
    {
      menuItem: 'Recently Created',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
  ]
  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={eventPanes} />
  )
}

Upcoming.propTypes = {
  events: PropTypes.any.isRequired,
}

function Upcoming(props) {
  const {events} = props
  const [date, setDate] = React.useState(new Date());

  return (
<Card.Group centered items={events.count}>
  {events.map(event => (
    (<Modal
      trigger={<Card link>
        <Image src={event.eventImgUrl} wrapped ui={false} size='small' />
        <Card.Content>
          <Card.Header>{event.eventName}</Card.Header>
          <Card.Meta>
            <span className='date'>{event.startDate}</span>
          </Card.Meta>
          <Card.Description>
            {event.eventDetails}
          </Card.Description>
        </Card.Content>
      </Card>}
      size='large'
      closeIcon
     >
      <Modal.Header>Edit Event</Modal.Header>
      <Modal.Content image scrolling><EditEvent event={event}/></Modal.Content>
      {/* <Modal.Actions>
      </Modal.Actions> */}
    </Modal>)
  ))}
</Card.Group>
  );
}

Profile.propTypes = {
  userInfo: PropTypes.any.isRequired,
}

function Profile(props) {
  const {userInfo} = props
  const docRef = firebase.firestore().collection("Users").doc(userInfo.uid);
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.createRef();
  const [profileImage, setImage] = React.useState();
  const [prevUrl, setPrevUrl] = React.useState();
  const [values, setValues] = React.useState({
    'firstName': '',
    'lastName': '',
    'username': '',
    'biography': '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPrevUrl(URL.createObjectURL(e.target.files[0]));
    }
  }
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (profileImage) {
        const uploadImage = storage.child(`Users/${userInfo.uid}`).put(profileImage);
        uploadImage.on('state_changed',
          (snapshot) => {

          },
          (error) => {
            console.log(error)
          },
          () => {
            uploadImage.snapshot.ref.getDownloadURL().then((url) => {
              docRef.update({
                'firstName': values.firstName ? values.firstName : userInfo.firstName,
                'lastName': values.lastName ? values.lastName : userInfo.lastName,
                'username': values.username ? values.username : userInfo.username,
                'biography': values.biography ? values.biography : userInfo.biography,
                'profileImgUrl': url
              }).then(function() {
                setLoading(false);
                setValues({
                  'firstName': '',
                  'lastName': '',
                  'username': '',
                  'biography': '',
                });
                setImage("");
              }).catch(function(error) {
                console.error("Error updating document: ", error)
              })
            });
          }
      )
    }
    else {
      docRef.update({
        'firstName': values.firstName ? values.firstName : userInfo.firstName,
        'lastName': values.lastName ? values.lastName : userInfo.lastName,
        'username': values.username ? values.username : userInfo.username,
        'biography': values.biography ? values.biography : userInfo.biography
      }).then(function() {
        setLoading(false);
        setValues({
          'firstName': '',
          'lastName': '',
          'username': '',
          'biography': '',
        });
      }).catch(function(error) {
        console.error("Error updating document: ", error)
      })
    }

  }
  return (
    <Form loading={loading} onSubmit={onSubmit}>
      <Form.Group>
        <Form.Input label='First Name' placeholder={userInfo.firstName} name='firstName' value={values.firstName} onChange={handleChange('firstName')} width={6}/>
        <Form.Input label='Last Name' placeholder={userInfo.lastName} name='lastName' value={values.lastName} onChange={handleChange('lastName')} width={6}/>
      </Form.Group>
      <Form.Group>
        <Form.Input label='Username' placeholder={userInfo.username} name='username' value={values.username} onChange={handleChange('username')} width={6}/>
      </Form.Group>
      <Form.Field>
        <Form.TextArea label='Biography' placeholder={userInfo.biography ? userInfo.biography : 'Enter a brief description of yourself'} name='biography' value={values.biography} onChange={handleChange('biography')} style={{ minHeight: 250 }}/>
      </Form.Field>
      <Form.Field>
        <label>Change your profile photo</label>
        <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
        <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
      </Form.Field>
      <Image size='small' src={userInfo.profileImgUrl ? userInfo.profileImgUrl : prevUrl} circular/>
      <Divider hidden/>
      <Form.Button primary content='Update Profile' type='submit' floated='right'/>
    </Form>
  );
}

Friends.propTypes = {
  userInfo: PropTypes.any.isRequired,
  friends: PropTypes.any.isRequired,
}

function Friends(props) {
  const {userInfo, friends} = props
  return (
    <List divided relaxed size='large'>
      {friends.map(friend => (
        <List.Item>
          <List.Content floated='right'>
            <Button secondary>Delete</Button>
          </List.Content>
          <Image avatar src={friend.profileImgUrl ? friend.profileImgUrl : 'https://react.semantic-ui.com/images/avatar/small/matthew.png'}/>
          <List.Content>
            <Modal
              trigger={<List.Header as='a'>{friend.firstName} {friend.lastName}</List.Header>}
              closeIcon
            >
              <Modal.Header>Profile Information</Modal.Header>
              <Modal.Content image scrolling>
                <Image wrapped rounded size='small' src={friend.profileImgUrl ? friend.profileImgUrl : 'https://react.semantic-ui.com/images/avatar/small/matthew.png'}/>
                <Modal.Description>
                  <Header>
                    <Header.Content>{friend.firstName} {friend.lastName}</Header.Content>
                    <Header.Subheader>@{friend.username}</Header.Subheader>
                  </Header>
                  <p>This user has nothing to say..</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <List.Description>@{friend.username}</List.Description>
          </List.Content>
        </List.Item>

      ))}
    </List>
  );
}
