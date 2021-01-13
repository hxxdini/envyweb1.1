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
  Modal,
  Form,
  Search,
  Comment,
  Label,
  Pagination,
  Placeholder,
} from 'semantic-ui-react'

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

import InfiniteScroll from "react-infinite-scroll-component";

import Footer from './Footer';

import { countryOptions } from './assets/countries';

import firebase from './components/Firebase';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const db = firebase.firestore();

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Looking for an Event ?'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Explore & make your desired events visible with the help of our platform'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary as={Link} to='/eventcreate' size='huge'>
      Create Event
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

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
              minHeight: 500,
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
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as={Link} to='/eventcreate'>Create an Event</Menu.Item>
                <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
                <Menu.Item as={Link} to='/registervenue'>Register a Venue</Menu.Item>
                <Menu.Item position='right'>
                  { user ?
                    ([(<Dropdown trigger={trigger} icon="null" pointing='top left'>
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
                  [(<Button as={Link} to='login' inverted={!fixed}>
                    Log in
                  </Button>),
                    (<Button as={Link} to='signup' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>)]
                  }
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
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

  render() {
    const { children, user } = this.props
    const { sidebarOpened } = this.state

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
                minHeight: 350,
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
                      (<span>
                        <Image avatar src={user ? user.profileImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} /> {user ? `${user.firstName} ${user.lastName}` : <Placeholder><Placeholder.Line/></Placeholder>}
                      </span>)
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
              <HomepageHeading mobile />
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



export default function Home(props) {

  const [events, setEvents] = React.useState([]);
  const [eventsByCategory, setEventsByCategory] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [date] = React.useState(new Date());
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [country, setCountry] = React.useState();
  const openAPI = 'https://api.opencagedata.com/geocode/v1/json?q=';
  const openAPIKey = '&key=d1fa4a4fbb644417abc4d1995efff843';

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var geoUrl = openAPI + `${lat}+${lng}` + openAPIKey + '&pretty=1' + '&no_annotations=1';
      getStringLocation(geoUrl);
    });
  }

  const getStringLocation = async (geoUrl) => {
    var result = await axios(geoUrl);
    console.log(result.data.results);
    var location = result.data.results[0].components;
    setCountry(location.country);
    console.log(location.country);
  }

  const handleCountry = (e, {value}) => {
    setCountry(value);
  }

  const [hasMore, setHasMore] = React.useState(true);
  const [lastVisible, setLastVisible] = React.useState();

  

  const getEvents = async () => {
    var eventsRef = await db.collection("Events");
    // var startAt = currentPage * itemsPerPage - itemsPerPage;
    if (country){
      eventsRef.where("eventCountry", "==", country).where("formattedEndDate", ">=", date).orderBy("formattedEndDate").limit(3).get().then(querySnapshot => {
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
          let events = [];
          querySnapshot.forEach(doc =>
            events.push({ ...doc.data() })
          )
          setEvents(events);
          groupEventsByCategory(events);
          console.log(date);
      });
    }
  }

  const fetchMoreEvents = async () => {
    var eventsRef = await db.collection("Events");
    if (country) {
      eventsRef.where("eventCountry", "==", country).where("formattedEndDate", ">=", date).orderBy("formattedEndDate").startAfter(lastVisible).limit(3).get().then(querySnapshot => {
          if (querySnapshot.empty) {
            setHasMore(false);
          }
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
          // var lastItem = querySnapshot.docs[querySnapshot.docs.length-1];
          let moreEvents = [];
          querySnapshot.forEach(doc => 
            moreEvents.push({ ...doc.data() })
          );
          var newEventArray = events.concat(moreEvents);
          setEvents(newEventArray);
          groupEventsByCategory(newEventArray);
        }

      )
    }
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
  if (country === undefined) {
    getUserLocation();
  }
  getEvents();
  setTimeout(() => {
    setLoading(false);
  }, 3000);
}, [country]);


  const groupEventsByCategory = (events) => {
    let eventsGroupedByCategory = {}
    events.forEach(event => {
      if (eventsGroupedByCategory[event.eventCategory] == undefined) {
        eventsGroupedByCategory[event.eventCategory] = [];
      }
      eventsGroupedByCategory[event.eventCategory].push(event);
    })
    const categories = Object.keys(eventsGroupedByCategory);
    console.log(categories);
    setCategories(categories);
    console.log(eventsGroupedByCategory);
    setEventsByCategory(eventsGroupedByCategory);
    return eventsGroupedByCategory;
  }

  const trimString = function (string, length) {
      return string.length > length ?
             string.substring(0, length) + '...' :
             string;
    };


  const resultRenderer = ({ eventName, eventImgUrl, eventDetails, uid }) =>

    <List.Item as={Link} to={`event/${uid}`}>
      <Image avatar src={eventImgUrl}/>
      <List.Content>
        <List.Header as='a'>{eventName}</List.Header>
        <List.Description>
          {trimString(eventDetails.blocks[0].text, 60)}
        </List.Description>
      </List.Content>
    </List.Item>

  const handleResultSelect = (e, {result}) => {
    setSearchValue(result.eventName);
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
      const isMatch = (result) => re.test(result.eventName);
      setSearchLoader(false);
      setResults(_.filter(events, isMatch));
    }, 300);
  }
    const categoryPanes = categories.map(category => {
      return {
        menuItem: category,
        render: () =>
        <InfiniteScroll
            dataLength={events.length} //This is important field to render the next data
            next={fetchMoreEvents}
            hasMore={hasMore}
            loader={<h4>Scroll down to load more...</h4>}
            height={500}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>These are all the available venues in the country</b>
              </p>
            }
        >
        <Segment padded raised>
          <EventMedia events={eventsByCategory[category]} user={user} loading={loading}/>
        </Segment>
        </InfiniteScroll>
      }
    })

    const panes = [
      {
        menuItem: 'All Events',
        render: () =>
        <InfiniteScroll
            dataLength={events.length} //This is important field to render the next data
            next={fetchMoreEvents}
            hasMore={hasMore}
            loader={<h4>Scroll down to load more...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>These are all the available venues in the country</b>
              </p>
            }
        > 
        <Segment id="scrollable-div" padded raised>
          <EventMedia events={events} user={user} loading={loading}/>
        </Segment>
        </InfiniteScroll>
        ,
      },
      ...categoryPanes
    ]

  return (
  <ResponsiveContainer user={user}>
    <Segment style={{ padding: '8em 0em' }} raised vertical>
      <Grid container stackable columns='equal' centered textAlign='center'>
        <Grid.Row columns={12}>
          <Search
            fluid
            placeholder='Search for nearby events'
            size='large'
            loading={searchLoader}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              trailing: true,
            })}
            results={searchResults}
            resultRenderer={resultRenderer}
            value={searchValue}
            className='search_bar'
            {...props}
          />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            {country ? (<Dropdown
              inline
              search
              placeholder={country}
              value={country}
              onChange={handleCountry}
              options={countryOptions}/>) :
              (<Dropdown
                inline
                search
                placeholder='Select country'
                value={country}
                onChange={handleCountry}
                options={countryOptions}/>)}
          </Grid.Column>
          <Grid.Column>
            <Modal
              trigger={
                <Button floated='right' secondary icon>
                  <Icon name='sort amount down'/> Sort Events
                </Button>
              }
              closeIcon
            >
              <Modal.Header>Sort Events</Modal.Header>
              {/* <Modal.Content>
                <Modal.Desription></Modal.Desription>
              </Modal.Content> */}
            </Modal>
          </Grid.Column>
        </Grid.Row>
        {events.length > 0 ? (<Tab menu={{ secondary: true, pointing: true }} panes={panes}/>)
        :
        (
          <Segment padded>
            <Header icon>
              <Icon name='calendar times outline'/>
              There are no upcoming events in this country at the moment
            </Header>
          </Segment>
        )
        }
      </Grid>
    </Segment>
    <Footer/>
  </ResponsiveContainer>
);
}

EventMedia.propTypes = {
  user: PropTypes.any.isRequired,
  events: PropTypes.array.isRequired,
}

function EventMedia(props){
  const {events, user} = props;
  const [loading, setLoading] = React.useState(true);

  var lengthString = 50;

  let trimString = function (string, length) {
      return string.length > length ?
             string.substring(0, length) + '...' :
             string;
    };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return(
      <Card.Group centered items={events.count}>
        {events.map(event => (
          (<Modal
            trigger={
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
                      [(<p>{trimString(event.eventDetails.blocks[0].text, lengthString)}</p>),
                      (<p>{trimString(`${event.eventStreet1}, ${event.eventCity}, ${event.eventCountry}`, lengthString)}</p>)]
                    ) }
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {loading ?
                    (<Placeholder fluid>
                      <Placeholder.Line/>
                    </Placeholder>)
                  :
                  (<CardDetails event={event}/>)
                  }
                </Card.Content>
              </Card>
            }
            closeIcon
           >
            <Modal.Header>{event.eventName}</Modal.Header>
            <Modal.Content image scrolling>
              <Image wrapped src={event.eventImgUrl} rounded className='modal_event_image'/>
              <Modal.Description>
                <Grid container stackable double>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <EventActions uid={event.uid} title={event.eventName} user={user}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Button primary as={Link} to={`/event/${event.uid}`}>
                        Event Page
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Header>
                  <Icon name='calendar alternate outline' color='grey'/>
                  <Header.Content>Date & Time</Header.Content>
                </Header>
                <p>{event.startDate} @ {event.startTime} - {event.endDate} @ {event.endTime}</p>
                <Divider/>
                <Header>
                  <Icon name='map pin' color='grey'/>
                  <Header.Content>Event Address</Header.Content>
                  <Header.Subheader>
                  </Header.Subheader>
                </Header>
                <p>{event.eventVenue}, {event.eventStreet1}</p>
                <p>{event.eventCity}, {event.eventProvince}</p>
                <p>{event.eventCountry}</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>)
        ))}
      </Card.Group>
  );

}

EventActions.propTypes = {
  uid: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
}

function EventActions(props) {
  const {uid, title, user} = props;
  const [active, setActive] = React.useState(false);
  const [values, setValues] = React.useState({
    comment: '',
  });
  const [date] = React.useState(new Date());
  const [loader, setLoader] = React.useState(false);
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const getLikeStatus = async () => {
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
    getLikeStatus();
  }, []);
  const handleLikeClick = () => {
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



  const shareURL = window.location.origin + '/event/' + uid;
  return (
    [<Button.Group icon>
      <Button toggle active={active} onClick={handleLikeClick} value={uid}>
        <Icon name='heart'/>
      </Button>
      (<Modal
        trigger={
          <Button>
            <Icon name='share alternate'/>
          </Button>
        }
        size='mini'
        closeIcon
       >
        <Modal.Header>Share Event</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <div className='Share__container'>
              <div className='Share__some-network'>
                <FacebookShareButton url={shareURL} title={title} className='Share__some-network__share-button'>
                  <FacebookIcon
                    size={32}
                  round />
                </FacebookShareButton>
              </div>
              <div className='Share__some-network'>
                <TwitterShareButton url={shareURL} title={title} className='Share__some-network__share-button'>
                  <TwitterIcon
                    size={32}
                  round/>
                </TwitterShareButton>
              </div>
              <div className='Share__some-network'>
                <WhatsappShareButton url={shareURL} title={title} className='Share__some-network__share-button'>
                  <WhatsappIcon
                    size={32}
                  round/>
                </WhatsappShareButton>
              </div>
              <div className='Share__some-network'>
                <EmailShareButton url={shareURL} title={title} className='Share__some-network__share-button'>
                  <EmailIcon
                    size={32}
                  round/>
                </EmailShareButton>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>),
      (<Modal
        trigger={
          <Button>
            <Icon name='chat'/>
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
      </Modal>)
    </Button.Group>]
  );
}

Chats.propTypes = {
  uid: PropTypes.any.isRequired,
  user: PropTypes.any,
}

function Chats(props) {
  const {uid} = props
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

CardDetails.propTypes = {
  event: PropTypes.any.isRequired,
}

function CardDetails(props){
  const {event} = props
  const likeRef = db.collection("Events").doc(event.uid).collection("eventLikes").doc(event.uid).collection("shards").doc('0');
  const commRef = db.collection("Events").doc(event.uid).collection("statistics").doc("comments");
  const [eventLikes, setEventLikes] = React.useState(0);
  const [comments, setComments] = React.useState(0);
  const getLikesCount = () => {
    likeRef.onSnapshot((doc) => {
      if (doc.exists) {
        var likeCount = doc.data().count
        setEventLikes(likeCount)
      }
      else {
        createCounter(db.collection("Events").doc(event.uid).collection("eventLikes").doc(event.uid), 0)
      }
    });
  }

  const getCommentCount = () => {
    commRef.onSnapshot((doc) => {
      if (doc.exists) {
        let count = doc.data().count;
        setComments(count);
      }
    })
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
  return([
    (<Label>
      <Icon name='heart' color='red'/>
      {eventLikes} Likes
    </Label>),
    (<Label>
      <Icon name='comments' color='blue'/>
      {comments} Comments
    </Label>)
  ]);
}
