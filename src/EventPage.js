import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, convertFromRaw} from 'draft-js';
import PaypalButton from "./PaypalButton";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
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
  Placeholder,
  Statistic,
} from 'semantic-ui-react';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from  'react-share';
import './assets/shareStyles.css';

import Footer from './Footer';

import firebase from './components/Firebase';

import GoogleMapReact from 'google-map-react';

import ReactMapGL, {Marker, Popup, GeolocateControl, NavigationControl} from 'react-map-gl';



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

export default function EventPage(props) {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [event, setEvent] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  let {uid} = useParams();
  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const shareURL = window.location.origin;
  const [values, setValues] = React.useState({
    comment: '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const [date, setDate] = React.useState(new Date());
  const [loader, setLoader] = React.useState(false);
  const likeRef = db.collection("Events").doc(uid).collection("eventLikes").doc(uid).collection("shards").doc('0');
  const commRef = db.collection("Events").doc(uid).collection("statistics").doc("comments");
  const ticketRef = db.collection("Events").doc(uid).collection("tickets");
  const [eventLikes, setEventLikes] = React.useState(0);
  const [comments, setComments] = React.useState(0);
  const getLikesCount = e => {
    // console.log('Breakpoint 0')
    likeRef.onSnapshot((doc) => {
      if (doc.exists) {
        var likeCount = doc.data().count
        setEventLikes(likeCount);
      }
      else {
        createCounter(db.collection("Events").doc(uid).collection("eventLikes").doc(uid), 0)
      }
    })
  }

  const getTickets = e => {
    ticketRef.get().then((querySnapshot) => {
      let tickets = [];
      querySnapshot.forEach(doc =>
        tickets.push({ ...doc.data() })
      )
      setTickets(tickets);
    })
  }

  const getCommentCount = e => {
    commRef.onSnapshot((doc) => {
      if (doc.exists) {
        let count = doc.data().count;
        setComments(count);
      }
    });
  }

  function createCounter(ref, num_shards) {
    var batch = db.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });
    console.log('Breakpoint 1');

    // Initialize each shard with count=0
    for (let i = 0; i <= num_shards; i++) {
      console.log('Breakpoint 2');
        let shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
  }
  const postComment = (e) => {
    if (user) {
      e.preventDefault();
      setLoader(true);
      const commentRef = db.collection("Events").doc(uid).collection("comments").doc();
      const commentStatRef = db.collection("Events").doc(uid).collection("statistics").doc("comments");
      const batch = db.batch();
      batch.set(commentRef, {
        message: values.comment,
        profileImgUrl: user.profileImgUrl,
        senderId: user.uid,
        username: user.username,
        timestamp: date,
      });
      batch.set(commentStatRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
      batch.commit().then(() => {
        setLoader(false);
        setValues({
          comment: '',
        });
      });
    }
  }

  const handleLikeClick = (e) => {
    console.log(event.uid);
    setActive(!active);
    const counterRef = db.collection("Events").doc(uid).collection("eventLikes").doc(uid).collection("shards").doc('0');
    const likeStateRef = db.collection("Events").doc(uid).collection("eventLikeIDs").doc(user.uid);
    const batch = db.batch();
    if (!active) {
      console.log("Liked");
      batch.set(counterRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
      batch.update(likeStateRef, {likeState: true});
      batch.commit();
      // incrementCounter(db, counterRef, 0);
      console.log("Liked");
    }
    else {
      console.log("Disliked");
      batch.set(counterRef, {count: firebase.firestore.FieldValue.increment(-1)}, {merge: true});
      batch.update(likeStateRef, {likeState: false});
      batch.commit();
      // decrementCounter(db, counterRef, 0);
      console.log("Disliked");
    }
  }

  const getLikeStatus = async (user) => {
    if (user) {
      const likeRef = await db.collection("Events").doc(uid).collection("eventLikeIDs").doc(user.uid);
      likeRef.onSnapshot((doc) => {
        if (doc.exists) {
          var like = doc.data().likeState;
          setActive(like);
        }
        else {
          db.collection("Events").doc(uid).collection("eventLikeIDs").doc(user.uid).set({
            likeState: false
          })
        }
      });
    }
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        db.collection("Users").doc(user.uid).get().then(doc => {
          if (doc.exists) {
              setUser(doc.data());
              let usr = doc.data();
              getLikeStatus(usr);
          }
          else {
            setUser(null);
          }
        });
      }
      else {
        setUser(null);
      }
    });
    db.collection('Events').doc(uid).get().then(doc => {
      setEvent(doc.data());
    })
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    getTickets();
    getLikesCount();
    getCommentCount();
  }, []);


  function createCounter(ref, num_shards) {
    var batch = db.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });
    console.log('Breakpoint 1');

    // Initialize each shard with count=0
    for (let i = 0; i <= num_shards; i++) {
      console.log('Breakpoint 2');
        let shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
  }

  function incrementCounter(db, ref, num_shards) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    return shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
  }

  function decrementCounter(db, ref, num_shards) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    return shard_ref.update("count", firebase.firestore.FieldValue.increment(-1));
  }
  return (
    <ResponsiveContainer user={user}>
      <Container style={{ padding: '5em 0em' }}>
        <Segment raised padded>
          <Grid centered doubling stackable>
            <Grid.Row centered columns={2}>
              <Grid.Column textAlign='center'>
                {loading ? <Placeholder className='page_image'><Placeholder.Image rectangular/></Placeholder> : <Image src={event.eventImgUrl} size='big' rounded className='page_image'/>}
              </Grid.Column>
              <Grid.Column>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header as='h2' block size='big' textAlign='center'>
                  <Header.Content>{event.eventName}</Header.Content>
                  <Header.Subheader>{event.eventCategory}</Header.Subheader>
                </Header>
                }
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header textAlign='center'>
                  <Icon name='calendar' color='grey'/>
                  <Header.Content>Date & Time</Header.Content>
                </Header>
                }
                {loading ? <Placeholder><Placeholder.Line length='long'/></Placeholder> : <p>{event.startDate ? `${event.startDate} @ ${event.startTime}` : ''}  {event.endDate ? `- ${event.endDate} @ ${event.endTime}` : ''}</p>}
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header>
                  <Icon name='map pin' color='grey'/>
                  <Header.Content>Address</Header.Content>
                </Header>
                }
                {loading ?
                  <Placeholder>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                :
                [(<p>{event.eventVenue}, {event.eventStreet1}</p>),
                  (<p>{event.eventStreet2}</p>),
                  (<p>{event.eventCity}, {event.eventProvince}</p>),
                  (<p>{event.eventCountry}</p>)]
                }

              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={3}>
              <Grid.Column>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <div className='Share__container'>
                  <div className='Share__some-network'>
                    <FacebookShareButton url={shareURL} title={event.eventName} className='Share__some-network__share-button'>
                      <FacebookIcon
                        size={32}
                      round />
                    </FacebookShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <TwitterShareButton url={shareURL} title={event.eventName} className='Share__some-network__share-button'>
                      <TwitterIcon
                        size={32}
                      round/>
                    </TwitterShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <WhatsappShareButton url={shareURL} title={event.eventName} className='Share__some-network__share-button'>
                      <WhatsappIcon
                        size={32}
                      round/>
                    </WhatsappShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <EmailShareButton url={shareURL} title={event.eventName} className='Share__some-network__share-button'>
                      <EmailIcon
                        size={32}
                      round/>
                    </EmailShareButton>
                  </div>
                </div>
                }
              </Grid.Column>
              <Grid.Column>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Button.Group>
                  <Button as='div' labelPosition='right'>
                    <Button toggle active={active} onClick={handleLikeClick} icon>
                      <Icon name='heart' />
                      Likes
                    </Button>
                    <Label as='a' basic pointing='left'>
                      {eventLikes}
                    </Label>
                  </Button>
                  <Modal
                    trigger={
                      <Button as='div' labelPosition='right'>
                        <Button icon>
                          <Icon name='chat' />
                          Comments
                        </Button>
                        <Label as='a' basic pointing='left'>
                          {comments}
                        </Label>
                      </Button>
                    }
                    closeIcon
                  >
                    <Modal.Header>Comments</Modal.Header>
                    <Modal.Content image scrolling>
                      <Modal.Description>
                        <Comment.Group>
                          <Chats uid={uid} user={user}/>
                          <Form reply loading={loader} onSubmit={postComment}>
                            <Form.TextArea placeholder='Add a comment or reply' value={values.comment} onChange={handleChange('comment')} name='comment' required/>
                            <Button content='Add Reply' labelPosition='left' icon='edit' primary type='submit'/>
                          </Form>
                          <Divider hidden/>
                        </Comment.Group>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </Button.Group>
                }
              </Grid.Column>

              <Grid.Column>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                [(<Header>
                  <Icon name='phone' color='grey'/>
                  <Header.Content>Contact</Header.Content>
                </Header>),
                  (<p>
                    {event.eventPhone}
                    <br/>
                    {event.eventEmail}
                  </p>)]
                }

              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                    </Placeholder.Paragraph>
                  </Placeholder>
                :
                [(<Header>
                  <Icon name='info circle' color='grey'/>
                  <Header.Content>Description</Header.Content>
                </Header>),
                  (<Description details={event.eventDetails}/>),
                  (<Organizer uid={event.createdBy}/>)]
                }

              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line/>
                    </Placeholder.Paragraph>
                  </Placeholder>
                :
                [(<Header>
                  <Icon name='money bill alternate' color='grey'/>
                  <Header.Content>Ticket Reservations</Header.Content>
                </Header>),
                  (<Tickets tickets={tickets} uid={event.uid} eventName={event.eventName} owner={event.createdBy}/>)]
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {event.eventStreet1 ? <MapView venue={event.eventVenue} address={event.eventStreet1} city={event.eventCity}/> : ''}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Footer/>
    </ResponsiveContainer>
  );
}

Description.propTypes = {
  details: PropTypes.object.isRequired,
}

function Tickets(props) {
  const {tickets, uid, owner, eventName} = props;
  const date = new Date();
  const [values, setValues] = React.useState({
    clientFullName: '',
    clientEmail: '',
    ticketQuantity: 1,
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  let isInvalid;
  const validateEmail = (email) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
  
      isInvalid = false;
  
      // errors["email"] = "Please enter valid email address.";
      return false;
    }
    return true;
  }
  return (
    tickets.map((ticket) => {
      const today = moment();
    return (
      <Modal
        trigger={
          <Label as='a' tag>
            {ticket.ticketCurrency} {ticket.ticketValue}
          </Label>
        }
      >
        <Modal.Header>{ticket.ticketName}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <Container text textAlign='center'>
              {(ticket.ticketQuantity > 0) && 
                <Grid centered stackable double>
                  {moment(today).isBefore(moment(ticket.ticketSaleEndDate)) &&
                    [
                    (<Grid.Row><Input label='Ticket Quantity' type='number' min={1} value={values.ticketQuantity} name='ticketQuantity' onChange={handleChange('ticketQuantity')}/></Grid.Row>),
                    (<Grid.Row><Input label='Full Name' type='text' value={values.clientFullName} name='clientFullName' onChange={handleChange('clientFullName')}/></Grid.Row>),
                    (<Grid.Row><Input label='Email Address' type='text' value={values.clientEmail} name='clientEmail' onChange={handleChange('clientEmail')}/></Grid.Row>),
                    (<Grid.Row>
                        {(validateEmail(values.clientEmail)) &&
                          <PaypalButton quantity={values.ticketQuantity} fullName={values.clientFullName} email={values.clientEmail} ticket={ticket} uid={uid} owner={owner} eventName={eventName}/>
                        }
                      </Grid.Row>
                    )
                    ]
                  }
                  <Grid.Row columns={12}>
                    {moment(today).isAfter(moment(ticket.ticketSaleEndDate)) && (
                      <Label>Sold out</Label>
                    )}
                  </Grid.Row>
                </Grid>
              }
              {(ticket.ticketQuantity <= 0) &&
                <Grid centered stackable double>
                  <Grid.Row columns={12}>
                    <Label>
                      Sold Out Tickets
                    </Label>
                  </Grid.Row>
                </Grid>
              }
            </Container>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
  )
  );
}

function Description(props) {
  const {details} = props;
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  React.useEffect(() => {
    if (details !== undefined) {
      console.log(details);
      // var rawData = JSON.parse(details);
      var contentState = convertFromRaw(details);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);
  return (
    <Editor readOnly={true} editorState={editorState} />
  );
}

Organizer.propTypes = {
  uid: PropTypes.string.isRequired,
}

function Organizer(props) {
  const {uid} = props;
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    if(uid !== undefined) {
      db.collection("Users").doc(uid).get().then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        }
      });
    }
  }, []);
  return (
    <p>Created by <Link to={`/user/${user.uid}`}>{user.firstName} {user.lastName}</Link></p>
  );
}

MapView.propTypes = {
  address: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
}

function MapView(props) {
  const {address, venue, city} = props;
  const [geoData, setGeoData] = React.useState([]);
  const [showPop, setShowPop] = React.useState(true);
  const [viewport, setViewport] = React.useState({});
  const [url, setUrl] = React.useState('https://api.opencagedata.com/geocode/v1/json?q=')
  const getLongLat = async () => {
    var geoUrl = url + `${address}, ${city}` + '&key=d1fa4a4fbb644417abc4d1995efff843' + '&pretty=1' + '&no_annotations=1'
    const result = await axios(geoUrl);
    console.log(result.data.results);
    setGeoData(result.data.results[0].geometry);
    setViewport({
      width: 600,
      height: 400,
      latitude: result.data.results[0].geometry.lat,
      longitude: result.data.results[0].geometry.lng,
      zoom: 15
    })
  }
  React.useEffect(() => {
    console.log(address);
    getLongLat();
  }, []);
  return(
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/hxxdini/ck5c2oc3j0tb21cqk3hhq8k9w"
      mapboxApiAccessToken='pk.eyJ1IjoiaHh4ZGluaSIsImEiOiJjazVhdzFidzgxMXNsM2RtdTF1OWlxZXpjIn0.jXYhsVDsmIDv5If9MewsWQ'
    >
      <div style={{position: 'absolute'}}>
        <NavigationControl />
      </div>
      <GeolocateControl
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
      <Marker longitude={geoData.lng} latitude={geoData.lat} offsetLeft={-20} offsetTop={-10}>
        <Icon name='map pin' color='red'/>
      </Marker>
      {showPop && <Popup
        latitude={geoData.lat}
        longitude={geoData.lng}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setShowPop(false)}
                  anchor="top">
        <div>Event taking place here</div>
      </Popup>}
    </ReactMapGL>
  );
}

Chats.propTypes = {
  uid: PropTypes.any.isRequired,
  user: PropTypes.any,
}

function Chats(props) {
  const {uid, user} = props
  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    db.collection('Events').doc(uid).collection('comments').onSnapshot(querySnapshot => {
      let messages = [];
      querySnapshot.forEach(doc =>
        messages.push({ ...doc.data() })
      )
      console.log(messages);
      setComments(messages);
    })
  }, [])
  return (
      comments.map(comment => (
          <Comment>
            <Comment.Avatar src={comment.profileImgUrl} />
            <Comment.Content>
              <Comment.Author as='a'>{comment.username}</Comment.Author>
              <Comment.Metadata>
                <div>{new Date(comment.timestamp.toDate()).toDateString()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.message}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))
  );
}

Stats.propTypes = {
  uid: PropTypes.any.isRequired,
}

function Stats(props) {
  const {uid} = props;
  const likeRef = db.collection("Events").doc(uid).collection("eventLikes").doc(uid).collection("shards").doc('0');
  const commRef = db.collection("Events").doc(uid).collection("statistics").doc("comments");
  const [eventLikes, setEventLikes] = React.useState(0);
  const [comments, setComments] = React.useState(0);
  const getLikesCount = e => {
    // console.log('Breakpoint 0')
    likeRef.onSnapshot((doc) => {
      if (doc.exists) {
        var likeCount = doc.data().count
        setEventLikes(likeCount);
      }
      else {
        createCounter(db.collection("Events").doc(uid).collection("eventLikes").doc(uid), 0)
      }
    })
  }

  const getCommentCount = e => {
    commRef.onSnapshot((doc) => {
      if (doc.exists) {
        let count = doc.data().count;
        setComments(count);
      }
    });
  }

  function createCounter(ref, num_shards) {
    var batch = db.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });
    console.log('Breakpoint 1');

    // Initialize each shard with count=0
    for (let i = 0; i <= num_shards; i++) {
      console.log('Breakpoint 2');
        let shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
  }

  React.useEffect(() => {
    getLikesCount();
    getCommentCount();
  }, []);
  return(
    <Statistic.Group size='mini'>
      <Statistic>
        <Statistic.Value>
          <Icon name='heart'/> {eventLikes}
        </Statistic.Value>
        <Statistic.Label>
          Likes
        </Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>
          <Icon name='chat'/> {comments}
        </Statistic.Value>
        <Statistic.Label>Comments</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
}
