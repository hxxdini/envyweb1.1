import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import React, { Component } from 'react';
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
  Placeholder,
  Checkbox,
} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import Footer from './Footer';
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
                 <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
                 <Menu.Item as='a'>Venues</Menu.Item>
                 <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
                 <Menu.Item position='right'>
                   { user ?
                     ([(<Dropdown trigger={trigger} icon="null" pointing='top left' pointing>
                       <Dropdown.Menu>
                         <Dropdown.Item as={Link} to='profile'><Icon name='user'/>Profile</Dropdown.Item>
                         <Dropdown.Item as={Link} to='notifications'><Icon name='feed'/>Notifications</Dropdown.Item>
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
  user: PropTypes.array,
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
  user: PropTypes.array,
}

const ResponsiveContainer = ({ children, user }) => {
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
}

export default function UserProfile(props) {
  let {uid} = useParams();
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [userProfile, setUserProfile] = React.useState([]);
  const [followed, setFollowed] = React.useState();
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0)
  const [followState, setFollowState] = React.useState();
  const [date, setDate] = React.useState(new Date());

  const getUserProfile = async () => {
    const userRef = await db.collection("Users").doc(uid);
    userRef.get().then(doc => {
      if (doc.exists) {
        setUserProfile(doc.data());
      }
    });
  }

  const followClick = (e) => {
    const followRef = db.collection("Users").doc(uid).collection("followers").doc(user.uid);
    const followStatRef = db.collection("Users").doc(uid).collection("statistics").doc("followers");
    const followingRef = db.collection("Users").doc(user.uid).collection("following").doc(uid);
    const followingStatRef = db.collection("Users").doc(user.uid).collection("statistics").doc("following");
    const batch = db.batch();
    batch.set(followRef, {following: true, uid: user.uid, firstName: user.firstName, lastName: user.lastName, username: user.username, profileImgUrl: user.profileImgUrl, sentOn: date});
    batch.set(followStatRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
    batch.set(followingRef, {following: true, uid: userProfile.uid, firstName: userProfile.firstName, lastName: userProfile.lastName, username: userProfile.username, profileImgUrl: userProfile.profileImgUrl, sentOn: date});
    batch.set(followingStatRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
    batch.commit().then(() => {
      console.log('Followed');
      setFollowed(true);
    }).catch((error) => {
      console.log(error);
    });
  }

  const unfollowClick = (e) => {
    const followRef = db.collection("Users").doc(uid).collection("followers").doc(user.uid);
    const followStatRef = db.collection("Users").doc(uid).collection("statistics").doc("followers");
    const followingRef = db.collection("Users").doc(user.uid).collection("following").doc(uid);
    const followingStatRef = db.collection("Users").doc(user.uid).collection("statistics").doc("following");
    const batch = db.batch();
    batch.delete(followRef);
    batch.set(followStatRef, {count: firebase.firestore.FieldValue.increment(-1)}, {merge: true});
    batch.delete(followingRef);
    batch.set(followingStatRef, {count: firebase.firestore.FieldValue.increment(-1)}, {merge: true});
    batch.commit().then(() => {
      console.log('Unfollowed');
      setFollowed(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getFollowers = async () => {
    const followersRef = await db.collection("Users").doc(uid).collection("statistics").doc("followers");
    followersRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwrs = doc.data().count;
        setFollowers(flwrs);
      }
    });
  }

  const getFollowing = async () => {
    const followingRef = await db.collection("Users").doc(uid).collection("statistics").doc("following");
    followingRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwrs = doc.data().count;
        setFollowing(flwrs);
      }
    });
  }

  const getFollowState = async (user) => {
    const followingRef = await db.collection("Users").doc(uid).collection("following").doc(user.uid);
    console.log(user.uid);
    followingRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwState = doc.data().following;
        setFollowState(flwState);
      }
    })
  }

  const getFollowedState = async (user) => {
    const followRef = await db.collection("Users").doc(uid).collection("followers").doc(user.uid);
    followRef.onSnapshot((doc) => {
      if (doc.exists) {
        var status = doc.data().following
        setFollowed(status);
      }
    });
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("Users").doc(user.uid).get().then(doc => {
          if (doc.exists) {
            setUser(doc.data());
            var usr = doc.data();
            getFollowState(usr);
            getFollowedState(usr);
          }
          else {
            setUser(null)
          }
        })
      }
      else {
        setUser(null);
      }
    });
    getUserProfile();
    getFollowers();
    getFollowing();
  }, []);
  return (
    <ResponsiveContainer user={user}>
      <Container style={{ padding: '5em 0em' }}>
        <Segment padded raised size='small'>
          <Grid centered stackable divided='vertically'>
            <Grid.Row centered columns={6}>
              <Grid.Column textAlign='center'>
                <Image src={userProfile.profileImgUrl ? userProfile.profileImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='large' circular/>
                <Header>
                  <Header.Content>{userProfile.firstName} {userProfile.lastName}</Header.Content>
                  <Header.Subheader>{userProfile.username ? (`@${userProfile.username}`) : ''}</Header.Subheader>
                </Header>
                {followState ? (
                  <Label color='green'>
                    Follows you
                  </Label>
                ) : ('')}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={6} textAlign='center'>
              <Grid.Column textAlign='center'>
                <Header size='tiny'>
                  { userProfile.biography ? userProfile.biography : "This user hasn't said anything specific" }
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={6} divided stackable>
              <Grid.Column textAlign='center'>
                <Statistic size='small' color='blue'>
                  <Statistic.Value>{following}</Statistic.Value>
                  <Statistic.Label>Following</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='small' color='blue'>
                  <Statistic.Value>{followers}</Statistic.Value>
                  <Statistic.Label>Followers</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='small' color='blue'>
                  <Statistic.Value>0</Statistic.Value>
                  <Statistic.Label>Events Created</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={6} stackable>
              {/* {followState ? (
                <Grid.Column textAlign='center'>
                  <Label color='green'>
                Follows you
                  </Label>
                </Grid.Column>
                ) :
              ('')} */}
              {followed ? (
                <Grid.Column textAlign='center'>
                  <Button icon negative circular onClick={unfollowClick}>
                    Unfollow
                  </Button>
                </Grid.Column>
              ) :
              (<Grid.Column textAlign='center'>
                <Button secondary icon circular onClick={followClick}>
                  <Icon name='add user'/> Follow
                </Button>
              </Grid.Column>)}
              <Grid.Column textAlign='center'>
                <Modal
                  trigger={
                    <Button primary icon>
                      <Icon name='users'/> View Friends
                    </Button>
                  }
                  closeIcon
                >
                  <Modal.Header><Icon name='users'/></Modal.Header>
                  <Modal.Content image scrolling>
                    <Modal.Description><Friends userInfo={userProfile} followersCount={followers} followingCount={following}/></Modal.Description>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Modal
                  trigger={
                    <Button icon>
                      <Icon name='calendar'/> Upcoming Events
                    </Button>
                  }
                  closeIcon
                >
                  <Modal.Header><Icon name='calendar'/></Modal.Header>
                  <Modal.Content image scrolling></Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Footer/>
    </ResponsiveContainer>
  );
}

Friends.propTypes = {
  userInfo: PropTypes.array.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
}

function Friends(props) {
  const {userInfo, followersCount, followingCount} = props;
  const friendPanes = [
    {
      menuItem: (
      <Menu.Item key='messages'>
        Following<Label>{followingCount}</Label>
      </Menu.Item>
    ),
      render: () => <Tab.Pane attached={false}><Following user={userInfo}/></Tab.Pane>,
    },
    {
      menuItem: (
      <Menu.Item key='messages'>
        Followers<Label>{followersCount}</Label>
      </Menu.Item>
    ),
      render: () => <Tab.Pane attached={false}><Followers user={userInfo}/></Tab.Pane>,
    },
  ]
  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={friendPanes} />
  );
}

Following.propTypes = {
  user: PropTypes.array.isRequired,
}

function Following(props) {
  const {user} = props;
  const [following, setFollowing] = React.useState([]);
  React.useEffect(() => {
    db.collection("Users").doc(user.uid).collection("following").get().then((querySnapshot) => {
      let flwrs = [];
      querySnapshot.forEach(doc => flwrs.push({ ...doc.data() }));
      setFollowing(flwrs);
    })
  }, [])
  return (
    <List divided relaxed size='large'>
      {following.map(friend => (
        <List.Item>
          {/* <List.Content floated='right'>
            <Button negative circular>Unfollow</Button>
          </List.Content> */}
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

Followers.propTypes = {
  user: PropTypes.array.isRequired,
}

function Followers(props) {
  const {user} = props;
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(() => {
    db.collection("Users").doc(user.uid).collection("followers").get().then((querySnapshot) => {
      let flwrs = [];
      querySnapshot.forEach(doc => flwrs.push({ ...doc.data() }));
      setFollowers(flwrs);
    })
  }, [])
  return (
    <List divided relaxed size='large'>
      {followers.map(friend => (
        <List.Item>
          {/* <List.Content floated='right'>
            <Button secondary>Delete</Button>
          </List.Content> */}
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
