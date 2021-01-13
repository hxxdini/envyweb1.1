import PropTypes from 'prop-types';
import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './assets/cardStyles.css';
import './assets/shareStyles.css';
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
  Menu,
  Dropdown,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Tab,
  Input,
  Modal,
  Form,
  TextArea,
  Search,
  Comment,
  Label,
  Transition,
  Placeholder,
} from 'semantic-ui-react'

import Footer from './Footer';

import firebase from './components/Firebase';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

// Geocode.setApiKey("AIzaSyBvCH83KKqHY9uyUBxL6poQ8E5R-q8M8Y0");

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
    const trigger = (
      <span>
        <Image avatar src={user ? user.profileImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} /> {user ? `${user.firstName} ${user.lastName}` : <Placeholder><Placeholder.Line/></Placeholder>}
      </span>
    );

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
               inverted={true}
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
                 <Menu.Item as={Link} to='/eventcreate'>Create an Event</Menu.Item>
                 <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
                 <Menu.Item as={Link} to='/registervenue'>Register a Venue</Menu.Item>
                 <Menu.Item position='right'>
                   { user ?
                     ([(<Dropdown trigger={trigger} icon="null" pointing='top left' pointing>
                       <Dropdown.Menu>
                         <Dropdown.Item as={Link} to='/profile'><Icon name='user'/>Profile</Dropdown.Item>
                         <Dropdown.Item as={Link} to='/notifications'><Icon name='feed'/>Notifications</Dropdown.Item>
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
    const { children, user } = this.props;
    const { sidebarOpened } = this.state;

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
          <Menu.Item as={Link} to='/'>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='/eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
          <Menu.Item as={Link} to='/registervenue'>Register a Venue</Menu.Item>
          {user ?
            (
              [(<Menu.Item as={Link} to='/profile'>Profile</Menu.Item>),
              (<Menu.Item as={Link} to='/notifications'>Notifications</Menu.Item>),
              (<Menu.Item as='a' onClick={this.handleSignOut}>Logout</Menu.Item>)]
            )
          :
          ([(<Menu.Item as={Link} to='/login'>Log in</Menu.Item>),
            (<Menu.Item as={Link} to='/signup'>Sign Up</Menu.Item>)])
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
                    ([<Button as={Link} to='/login' inverted>
                      Log in
                    </Button>],
                      [<Button as={Link} to='/signup' inverted style={{ marginLeft: '0.5em' }}>
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
  user: PropTypes.array,
}

const ResponsiveContainer = ({ children, user, imgUrl }) => {
  return(
  <div>
    <DesktopContainer user={user}>{children}</DesktopContainer>
    <MobileContainer user={user}>{children}</MobileContainer>
  </div>
);
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
  imgUrl: PropTypes.string,
}

export default function SearchUsers(props) {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [users, setUsers] = React.useState();
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setResults] = React.useState([]);

  const getUsers = async () => {
    var usersRef = await db.collection("Users");
    usersRef.get().then((querySnapshot) => {
      let usr = [];
      querySnapshot.forEach(doc => usr.push({ ...doc.data()}));
      setUsers(usr);
    })
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        db.collection("Users").doc(user.uid).get().then(doc => {
          if (doc.exists){
            setUser(doc.data());
          }
          else {
            setUser(null);
          }
        })
      }
      else {
        setUser(null);
      }
    });
    getUsers();
  }, []);

  const resultRenderer = ({ firstName, lastName, profileImgUrl, uid }) =>

    <List.Item as={Link} to={`user/${uid}`}>
      <Image avatar src={profileImgUrl} className='search_user_bar_result_image'/>
      <List.Content>
        <List.Header as='a'>{firstName} {lastName}</List.Header>
        {/* <List.Description>
          {trimString(eventDetails, 60)}
        </List.Description> */}
      </List.Content>
    </List.Item>

  const handleResultSelect = (e, {result}) => {
    setSearchValue(result.firstName);
  }

  function setInitialValues() {
    // setSearchValue('');
    setSearchLoader(false);
    setResults([]);
  }

  const handleSearchChange = (e, {value}) => {
    setSearchLoader(true);
    setSearchValue(value);
    setTimeout(() => {
      if (searchValue.length < 0) return setInitialValues();
      const re = new RegExp(_.escapeRegExp(searchValue), 'i');
      const isMatch = (result) => re.test(result.firstName);
      setSearchLoader(false);
      setResults(_.filter(users, isMatch));
    }, 300);
  }

  return (
    <ResponsiveContainer user={user}>
      <Segment style={{ padding: '8em 0em' }} raised vertical>
        <Grid container stackable columns='equal' centered textAlign='center'>
          <Grid.Row columns={12}>
            <Search
              fluid
              placeholder='Search for users'
              size='large'
              loading={searchLoader}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                trailing: true,
              })}
              results={searchResults}
              resultRenderer={resultRenderer}
              value={searchValue}
              className='search_user_bar'
              {...props}
            />
          </Grid.Row>
        </Grid>
      </Segment>
      <Footer/>
    </ResponsiveContainer>
  );
}
