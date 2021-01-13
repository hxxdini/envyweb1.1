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
  Message,
  Popup,
  Dropdown,
  Checkbox,
  Placeholder,
} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';

import Footer from './Footer';

import firebase from './components/Firebase';
import { EditEvent } from './EditEvent';
import './assets/cardStyles.css';

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
                 <Menu.Item as={Link} to='/eventcreate'>Create an Event</Menu.Item>
                 <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
                 <Menu.Item as={Link} to='/registervenue'>Register a Venue</Menu.Item>
                 <Menu.Item position='right'>
                   { user ?
                     ([(<Dropdown trigger={trigger} icon="null" pointing='top left' pointing>
                       <Dropdown.Menu>
                         <Dropdown.Item active><Icon name='user'/>Profile</Dropdown.Item>
                         <Dropdown.Item as={Link} to='/notifications'><Icon name='feed'/>Notifications</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>),
                       (<Button as='a' inverted={!fixed} onClick={this.handleSignOut} secondary icon labelPosition='left'>
                         <Icon name='power off'/>
                         Logout
                       </Button>)])
                   :
                   [(<Button as={Link} to='/login' inverted={!fixed}>
                     Log in
                   </Button>),
                     (<Button as={Link} to='/signup' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
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
          <Menu.Item as='a' active>
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


export default function Profile() {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [userInfo, setUserInfo] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [eventsCount, setEventCount] = React.useState(0);
  const [followersCount, setFollowersCount] = React.useState(0);
  const [followingCount, setFollowingCount] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [active, setActive] = React.useState(true);

  const getFollowersCount = async (user) => {
    const followersRef = await db.collection("Users").doc(user.uid).collection("statistics").doc("followers");
    followersRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwrs = doc.data().count;
        setFollowersCount(flwrs);
      }
    });
  }

  const getFollowingCount = async (user) => {
    const followingRef = await db.collection("Users").doc(user.uid).collection("statistics").doc("following");
    followingRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwrs = doc.data().count;
        setFollowingCount(flwrs);
      }
    });
  }

  const getEventsCount = async (user) => {
    const eventStatRef = await db.collection("Users").doc(user.uid).collection("statistics").doc("events");
    eventStatRef.get().then((doc) => {
      if (doc.exists) {
        let events = doc.data().count;
        setEventCount(events);
      }
    });
  }

  const getUserEvents = async (user) => {
    const eventsRef = await db.collection("Events").where("createdBy", "==", user.uid).where("formattedEndDate", ">=", date);
    eventsRef.get().then(querySnapshot => {
      let events = [];
      querySnapshot.forEach(doc =>
        events.push({ ...doc.data() })
      )
      console.log(events);
      setEvents(events);
    });
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        db.collection("Users").doc(user.uid).get().then(doc => {
          if(doc.exists){
            setUserInfo(doc.data());
            setUser(doc.data());
            var usr = doc.data();
            getFollowersCount(usr);
            getFollowingCount(usr);
            getEventsCount(usr)
            getUserEvents(usr);
            setActive(false);
        }
        else {
          setRedirect(true);
          setActive(false);
        }
      });
        console.log(user);
      }
      else {
        setRedirect(true);
        setUser(null);
        setActive(false);
      }
    });
  }, []);


  const panes = [
    { menuItem: { key: 'events', icon: 'calendar', content: 'Events' }, render: () => <Segment raised><Event events={events}/></Segment> },
    { menuItem: { key: 'friends', icon: 'users', content: 'Friends' }, render: () => <Segment raised><Friends userInfo={userInfo} followersCount={followersCount} followingCount={followingCount}/></Segment> },
    { menuItem: { key: 'profile', icon: 'user', content: 'Profile' }, render: () => <Segment raised><ProfileInfo userInfo={userInfo}/></Segment>},
    { menuItem: { key: 'orders', icon: 'money', content: 'Monitor Orders'}, render: () => <Segment raised><ManageOrders events={events}/></Segment> },
  ]

  const mobilePanes = [
    { menuItem: { key: 'events', icon: 'calendar'}, render: () => <Segment raised><Event events={events}/></Segment> },
    { menuItem: { key: 'friends', icon: 'users'}, render: () => <Segment raised><Friends userInfo={userInfo} followersCount={followersCount} followingCount={followingCount}/></Segment> },
    { menuItem: { key: 'profile', icon: 'user'}, render: () => <Segment raised><ProfileInfo userInfo={userInfo}/></Segment>},
    { menuItem: { key: 'orders', icon: 'money', content: 'Monitor Orders'}, render: () => <Segment raised><ManageOrders events={events}/></Segment> },
  ]

  return (
      <ResponsiveContainer user={user}>
        {redirect ? (<Redirect to='/'/>) : ""}
        <Dimmer active={active} page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Container style={{ padding: '5em 0em' }}>
          <Header size='huge' textAlign='center'>
            <Icon name='user' color='grey'/>
            <Header.Content>Profile</Header.Content>
          </Header>
          <Segment padded raised size='small'>
            <Grid centered stackable divided='vertically'>
              <Grid.Row centered columns={6}>
                <Grid.Column textAlign='center'>
                  <Image src={userInfo.profileImgUrl ? userInfo.profileImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='large' circular/>
                  <Header>
                    <Header.Content>{userInfo.firstName} {userInfo.lastName}</Header.Content>
                    <Header.Subheader>{userInfo.username ? (`@${userInfo.username}`) : ''}</Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row centered columns={6} textAlign='center'>
                <Grid.Column textAlign='center'>
                  <Header size='tiny'>
                    { userInfo.biography ? userInfo.biography : "Briefly describe your profile" }
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row centered columns={6} divided stackable>
                <Grid.Column  textAlign='center'>
                  <Statistic size='small'>
                    <Statistic.Value>{followingCount}</Statistic.Value>
                    <Statistic.Label>Following</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                  <Statistic size='small'>
                    <Statistic.Value>{followersCount}</Statistic.Value>
                    <Statistic.Label>Followers</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column  textAlign='center'>
                  <Statistic size='small'>
                    <Statistic.Value>{eventsCount}</Statistic.Value>
                    <Statistic.Label>Events Created</Statistic.Label>
                  </Statistic>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Responsive {...Responsive.onlyComputer}>
            <Tab menu={{ fluid: true, vertical: true, pointing: true }} panes={panes}/>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
            <Tab menu={{ fluid: true, pointing: true, icon: true }} panes={mobilePanes}/>
          </Responsive>
        </Container>
        <Footer/>
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
  const [loading, setLoading] =  React.useState(true);
  var lengthString = 75;
  const trimString = function (string, length) {
      return string.length > length ?
             string.substring(0, length) + '...' :
             string;
    };
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (
<Card.Group centered items={events.count}>
  {events.map(event => (
    (<Modal
      trigger=
      {
        <Card link>
          {loading ?
            (
              <Placeholder className='event_card_image'>
                <Placeholder.Image rectangular className='event_card_image'/>
              </Placeholder> )
          :
          (<Image className='event_card_image' src={event.eventImgUrl} wrapped ui={false} size='small' />)
          }
          <Card.Content>
            {loading ?
              (<Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length='very short' />
                  <Placeholder.Line length='medium' />
                </Placeholder.Header>
              </Placeholder>)
            :
            (
              [(<Card.Header>{trimString(event.eventName, 30)}</Card.Header>),
              (<Card.Meta>
                <span className='date'>{event.startDate}</span>
              </Card.Meta>)]
            )
            }
            <Card.Description className='event_card_description'>
              {loading ?
                (<Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                  </Placeholder.Paragraph>
                </Placeholder>)
              :
              (
                [(<p>{event.eventDetails.blocks ? trimString(event.eventDetails.blocks[0].text, lengthString) : trimString(event.eventDetails, lengthString)}</p>),
                (<p>{trimString(`${event.eventStreet1}, ${event.eventCity}, ${event.eventCountry}`, lengthString)}</p>)]
              ) }
            </Card.Description>
          </Card.Content>
        </Card>
      }
      size='large'
      closeIcon
     >
      <Modal.Header>Edit Event</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <EditEvent event={event}/>
        </Modal.Description>
      </Modal.Content>
      {/* <Modal.Actions>
      </Modal.Actions> */}
    </Modal>)
  ))}
</Card.Group>
  );
}

ManageOrders.propTypes = {
  events: PropTypes.array.isRequired,
}

function ManageOrders(props) {
  const {events} = props;
  return (
    <List divided relaxed>
      {events.map(event => (
        <List.Item>
          <List.Icon name='calendar' size='large' verticalAlign='middle'/>
          <List.Content>
            <Modal trigger={
              <List.Header as='a'>{event.eventName}</List.Header>
            }>
              <Modal.Header>Sales Statistics</Modal.Header>
              <Modal.Content>
                  <Modal.Description>
                    <TicketSales eventUID={event.uid}/>
                  </Modal.Description>
              </Modal.Content> 
            </Modal>
            <List.Description>{event.startDate}</List.Description>
          </List.Content>
        </List.Item>  
      ))}
    </List>
  );
}

TicketSales.propTypes = {
  eventUID: PropTypes.string.isRequired,
}

function TicketSales(props) {
  const {eventUID} = props;
  const [tickets, setTickets] = React.useState([]);
  // const ticketRef = db.collection("Events").doc(event.uid).collection("tickets");
  const getTickets = async (event) => {
    const ticketRef = await db.collection("Events").doc(event).collection("tickets");
    ticketRef.get().then((querySnapshot) => {
      let tickets = [];
      querySnapshot.forEach(doc =>
        tickets.push({ ...doc.data() })
      )
      setTickets(tickets);
    })
  }
  React.useEffect(()=> {
    getTickets(eventUID);
  }, []);

  function calculateQtySold(initialQty, actualQty) {
    let qtySold = initialQty - actualQty;
    return qtySold;
  }

  function calculateGrossProfit(initialQty, actualQty, tcktValue) {
    let qtySold = initialQty - actualQty;
    let profit = qtySold * tcktValue;
    return profit;
  }

  return (
    <Grid>
        <Grid.Row>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ticket Name</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity Sold</Table.HeaderCell>
            <Table.HeaderCell>Gross Profit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map(ticket => (
            <Table.Row>
              <Table.Cell>{ticket.ticketName}</Table.Cell>
              <Table.Cell>{ticket.ticketValue}{ticket.ticketCurrency}</Table.Cell>
              <Table.Cell>{calculateQtySold(ticket.initialTicketQty, ticket.ticketQuantity)}/{ticket.initialTicketQty}</Table.Cell>
              <Table.Cell>${calculateGrossProfit(ticket.initialTicketQty, ticket.ticketQuantity, ticket.ticketValue)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        </Table>
        </Grid.Row>
        <Grid.Row centered>
        <Message info icon>
          <Icon name='info circle'/>
          <Message.Content>
          <p>
            The Gross Profit value allocated does not deduct the platform fees for payment handling.
            The fees will be deduced upon wiring the funds to the organizer
          </p>
          </Message.Content>
        </Message>
        </Grid.Row>
    </Grid>
  );
}

ProfileInfo.propTypes = {
  userInfo: PropTypes.array.isRequired,
}

function ProfileInfo(props) {
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

  // const followClick = (e) => {
  //   const followRef = db.collection("Users").doc(uid).collection("followers").doc(user.uid);
  //   const followStatRef = db.collection("Users").doc(uid).collection("statistics").doc("followers");
  //   const followingRef = db.collection("Users").doc(user.uid).collection("following").doc(uid);
  //   const followingStatRef = db.collection("Users").doc(user.uid).collection("statistics").doc("following");
  //   const batch = db.batch();
  //   batch.set(followRef, {following: true, uid: user.uid, firstName: user.firstName, lastName: user.lastName, username: user.username, profileImgUrl: user.profileImgUrl, sentOn: date});
  //   batch.set(followStatRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
  //   batch.set(followingRef, {following: true, uid: userProfile.uid, firstName: userProfile.firstName, lastName: userProfile.lastName, username: userProfile.username, profileImgUrl: userProfile.profileImgUrl, sentOn: date});
  //   batch.set(followingStatRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
  //   batch.commit().then(() => {
  //     console.log('Followed');
  //     setFollowed(true);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  const unfollowClick = (e) => {
    console.log(e.target.value);
    const uid = e.target.value;
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
    }).catch((error) => {
      console.log(error);
    });
  }



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
          <List.Content floated='right'>
            <Button negative circular value={friend.uid} onClick={unfollowClick}>Unfollow</Button>
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
                  <FollowState user={user} friend={friend}/>
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

function FollowState(props) {
  const {user, friend} = props;
  const [followState, setFollowState] = React.useState();
  const getFollowState = async () => {
    const followingRef = await db.collection("Users").doc(friend.uid).collection("following").doc(user.uid);
    console.log(user.uid);
    followingRef.onSnapshot((doc) => {
      if (doc.exists) {
        var flwState = doc.data().following;
        setFollowState(flwState);
      }
    })
  }
  React.useEffect(() => {
    getFollowState();
  }, [])
  return (
    followState ? (
      <Label color='green'>
        Follows you
      </Label>
    ) : ('')
  );
}
