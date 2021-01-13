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
  Rating,
  Placeholder,
  Pagination
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

import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import Footer from './Footer';

import InfiniteScroll from "react-infinite-scroll-component";

import firebase from './components/Firebase';

import { countryOptions } from './assets/countries';

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
      content='Browse Venues'
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
      content='Explore & discover the different venues available in the region'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />

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
  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
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
              minHeight: 450,
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
                <Menu.Item as='a' active>Venues</Menu.Item>
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
          <Menu.Item as={Link} to='/'>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as='a' active>Venues</Menu.Item>
          <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
          {user ?
            (
              [(<Menu.Item as={Link} to='profile'>Dashboard</Menu.Item>),
              (<Menu.Item as='a'>Notifications</Menu.Item>),
              (<Menu.Item as='a' onClick={this.handleSignOut}>Logout</Menu.Item>)]
            )
          :
          ([(<Menu.Item as={Link} to='login'>Log in</Menu.Item>),
            (<Menu.Item as={Link} to='signup'>Sign Up</Menu.Item>)])
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
                      ""
                    :
                    ([<Button as={Link} to='login' inverted>
                      Log in
                    </Button>],
                      [<Button as={Link} to='signup' inverted style={{ marginLeft: '0.5em' }}>
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
  user: PropTypes.array,
}

export default function Venues(props) {
  const [venues, setVenues] = React.useState([]);
  const [venuesByCategory, setVenuesByCategory] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setResults] = React.useState([]);
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
    getVenueStats(location.country);
    console.log(location.country);
  }

  const handleCountry = (e, {value}) => {
    setCountry(value);
  }

  const [active, setActivePage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const [totalVenues, setTotalVenues] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  const handlePaginationChange = (e, {activePage}) => {
    setActivePage(activePage);
    setCurrentPage(activePage);
    console.log(activePage);
  }

  const getVenueStats = async (country) => {
    var venueStat = await db.collection('Statistics').doc('Venues').collection(country).doc('RegisteredVenues');
    venueStat.get().then(doc => {
      setTotalVenues(doc.data().count);
      var allVenues = doc.data().count;
      var pages = allVenues/itemsPerPage;
      setTotalPages(pages);
    })
  }

  const [hasMore, setHasMore] = React.useState(true);
  const [lastVisible, setLastVisible] = React.useState();

  const getVenues = async () => {
    var venuesRef = await db.collection("Venues");
    if (country){
      venuesRef.where("venueCountry", "==", country).limit(3).get().then(querySnapshot => {
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
          let venues = [];
          querySnapshot.forEach(doc =>
            venues.push({ ...doc.data() })
          )
          setVenues(venues);
          groupVenuesByCategory(venues);
      });
    }
  }

  const fetchMoreVenues = async () => {
    var venuesRef = await db.collection("Venues");
    if (country) {
      venuesRef.where("venueCountry", "==", country).startAfter(lastVisible).limit(3).get().then(querySnapshot => {
          if (querySnapshot.empty) {
            setHasMore(false);
          }
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
          // var lastItem = querySnapshot.docs[querySnapshot.docs.length-1];
          let moreVenues = [];
          querySnapshot.forEach(doc => 
            moreVenues.push({ ...doc.data() })
          );
          var newVenueArray = venues.concat(moreVenues);
          setVenues(newVenueArray);
          groupVenuesByCategory(newVenueArray);
        }

      )
    }
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
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
    });
    if (country === undefined) {
      getUserLocation();
    }
    getVenues();
    // getVenueStats();
  }, [country]);

  const groupVenuesByCategory = (venues) => {
    let venuesGroupedByCategory = {}
    venues.forEach(venue => {
      if (venuesGroupedByCategory[venue.venueCategory] == undefined) {
        venuesGroupedByCategory[venue.venueCategory] = [];
      }
      venuesGroupedByCategory[venue.venueCategory].push(venue);
    })
    const categories = Object.keys(venuesGroupedByCategory);
    console.log(categories);
    setCategories(categories);
    console.log(venuesGroupedByCategory);
    setVenuesByCategory(venuesGroupedByCategory);
    return venuesGroupedByCategory;
  }

  let trimString = function (string, length) {
      return string.length > length ?
             string.substring(0, length) + '...' :
             string;
    };


  const resultRenderer = ({ venueName, venueImgUrl, venueDetails, uid, avgRating }) =>
  // <List size='large'>
    <List.Item as={Link} to={`venue/${uid}`}>
      <Image avatar src={venueImgUrl}/>
      <List.Content>
        <List.Header as='a'>{venueName}</List.Header>
        <List.Description>
          {trimString(venueDetails.blocks[0].text, 60)}
          <Rating icon='star' defaultRating={avgRating} maxRating={5} disabled/>
        </List.Description>
      </List.Content>
    </List.Item>
  // </List>
  const handleResultSelect = (e, {result}) => {
    setSearchValue(result.venueName);
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
      const isMatch = (result) => re.test(result.venueName);
      setSearchLoader(false);
      setResults(_.filter(venues, isMatch));
    }, 300);
  }

  const categoryPanes = categories.map(category => {
    return {
      menuItem: category,
      render: () =>
      <InfiniteScroll
            dataLength={venues.length} //This is important field to render the next data
            next={fetchMoreVenues}
            hasMore={hasMore}
            loader={<h4>Scroll down to load more...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>These are all the available events in the country</b>
              </p>
            }
        > 
      <Segment padded raised>
        <VenueMedia venues={venuesByCategory[category]} user={user}/>
      </Segment>
      </InfiniteScroll>
    }
  })

  const panes = [
    {
      menuItem: 'All Venues',
      render: () =>
      <InfiniteScroll
            dataLength={venues.length} //This is important field to render the next data
            next={fetchMoreVenues}
            hasMore={hasMore}
            loader={<h4>Scroll down to load more...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>These are all the available events in the country</b>
              </p>
            }
        > 
      <Segment padded raised>
        <VenueMedia venues={venues} user={user}/>
      </Segment>
      </InfiniteScroll>
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
              placeholder='Search for a venue'
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
                    <Icon name='sort amount down'/> Sort Venues
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
          <Grid.Row>
            {/* <Pagination
              defaultActivePage={currentPage}
              activePage={active} 
              totalPages={totalPages} 
              boundaryRange={0}
              ellipsisItem={undefined}
              firstItem={null}
              lastItem={null}
              siblingRange={0}
              onPageChange={handlePaginationChange}
            /> */}
          </Grid.Row>
          {venues.length > 0 ? (<Tab menu={{ secondary: true, pointing: true }} panes={panes} />)
          :
          (
            <Segment padded>
              <Header icon>
                <Icon name='ban'/>
                There are no registered venues in this country at the moment
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

VenueMedia.propTypes = {
  venues: PropTypes.array.isRequired,
  user: PropTypes.any.isRequired,
}

function VenueMedia(props) {
  const {venues, user} = props;
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
    }, 3000);
  }, []);

  return(
    <Card.Group centered items={venues.count}>
      {venues.map(venue => (
        <Modal
          trigger={
            <Card link>
              { loading ? (<Placeholder><Placeholder.Image rectangular className='event_card_image'/></Placeholder>) : (<Image className='event_card_image' src={venue.venueImgUrl} wrapped ui={false} size='small' />) }
              <Card.Content>
                { loading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                ) :
                (
                  [(<Card.Header>{venue.venueName}</Card.Header>),
                  (<Card.Meta>
                    {venue.venueSpeciality}
                  </Card.Meta>)]
                )
                }
                <Card.Description className='event_card_description'>
                  {loading ?
                    (
                      <Placeholder>
                        <Placeholder.Paragraph>
                          <Placeholder.Line/>
                          <Placeholder.Line/>
                        </Placeholder.Paragraph>
                      </Placeholder>
                    ) :
                    (
                      [(<p>{trimString(venue.venueDetails.blocks[0].text, lengthString)}</p>),
                      (<Rating icon='star' defaultRating={venue.avgRating} maxRating={5} disabled/>)]
                    )
                  }
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                { loading ?
                  (
                    <Placeholder fluid>
                      <Placeholder.Line/>
                    </Placeholder>
                  ) :
                  (
                    <CardDetails venue={venue}/>
                  )
                }
              </Card.Content>
            </Card>
          }
          closeIcon
        >
          <Modal.Header>{venue.venueName}</Modal.Header>
          <Modal.Content image scrolling>
            <Image wrapped src={venue.venueImgUrl} rounded className='modal_venue_image'/>
            <Modal.Description>
              <Grid container double stackable>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <VenueActions uid={venue.uid} title={venue.venueName} user={user}/>
                  </Grid.Column>
                  <Grid.Column>
                    <Button primary as={Link} to={`/venue/${venue.uid}`}>
                      Venue Page
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Header>
                <Icon name='clock' color='grey'/>
                <Header.Content>Schedule</Header.Content>
                <Header.Subheader>
                </Header.Subheader>
              </Header>
              <p><strong>Opened Days:</strong>{venue.openDays ? (venue.openDays.map((day) => (<span> <Label color='green'>{day}<Label.Detail>{venue.openTime1} - {venue.closeTime1}</Label.Detail></Label> </span>))) : ''}</p>
              <p><strong>Exceptional Days:</strong>{venue.expDays ? (venue.expDays.map((eday) => (<span> <Label color='blue'>{eday}<Label.Detail>{venue.openTime2} - {venue.closeTime2}</Label.Detail></Label></span>))) : ''}</p>
              <Divider/>
              {/* <Header>
                <Icon name='camera' color='grey'/>
                <Header.Content>Featured Photos</Header.Content>
                <Header.Subheader></Header.Subheader>
                </Header>
                <FeaturedPhotos uid={venue.uid}/>
              <Divider/> */}
              <Header>
                <Icon name='phone' color='grey'/>
                <Header.Content>Contact</Header.Content>
              </Header>
              <p>
                <strong>Phone Number:</strong> {venue.venuePhone}
                <br/>
                <strong>Email:</strong> {venue.venueEmail}
              </p>
              <Divider hidden/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ))}
    </Card.Group>
  );
}

FeaturedPhotos.propTypes = {
  uid: PropTypes.string.isRequired,
}

function FeaturedPhotos(props) {
  const {uid} = props;
  const [images, setImages] = React.useState([]);
  const getPhotos = async () => {
    const photosRef = await db.collection("Venues").doc(uid).collection("Photos");
    photosRef.get().then((snapshot) => {
      let photos = [];
      snapshot.forEach(doc => photos.push({ ...doc.data()}))
      setImages(photos);
    })
  }
  React.useEffect( () => {
    getPhotos();
  }, [])

  return(
    <Card.Group centered items={images.count} itemsPerRow={4}>
      {images.map(image => (
        <Card link raised image={image.photoUrl} className='photo_card_image'/>
      ))}
    </Card.Group>
  );

}

CardDetails.propTypes = {
  venue: PropTypes.any.isRequired,
}

function CardDetails(props) {
  const {venue} = props;
  const [venueLikes, setLikes] = React.useState(0);
  const [venueVisits, setVisits] = React.useState(0);
  const getLikesCount = async () => {
    const likeRef = await db.collection("Venues").doc(venue.uid).collection("venueLikes").doc(venue.uid).collection("shards").doc('0');
    likeRef.onSnapshot((doc) => {
      if (doc.exists) {
        var likeCount = doc.data().count
        setLikes(likeCount)
      }
      else {
        createCounter(db.collection("Venues").doc(venue.uid).collection("venueLikes").doc(venue.uid), 0)
      }
    });
  }

  const getVisitsCount = async () => {
    const visitRef = await db.collection("Venues").doc(venue.uid).collection("venueVisits").doc(venue.uid).collection("shards").doc('0');
    visitRef.onSnapshot((doc) => {
      if (doc.exists) {
        var visitCount = doc.data().count
        setVisits(visitCount)
      }
      else {
        createCounter(db.collection("Venues").doc(venue.uid).collection("venueVisits").doc(venue.uid), 0)
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
    getVisitsCount();
  }, []);

  return (
    [
      (<Label>
        <Icon name='heart' color='red'/>
        {venueLikes} Likes
      </Label>),
      (<Label>
        <Icon name='male' color='blue'/>
        {venueVisits} Visited
      </Label>)
    ]
  );
}

VenueActions.propTypes = {
  uid: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
}

function VenueActions(props) {
  const {uid, title, user} = props;
  // const [user, setUser] = React.useState(firebase.auth().currentUser)
  const [active, setActive] = React.useState(false);
  const [visitActive, setVisitActive] = React.useState(false);
  const [values, setValues] = React.useState({
    review: '',
  });
  const [date, setDate] = React.useState(new Date());
  const [loader, setLoader] = React.useState(false);
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getLikeStatus = async () => {
    if (user) {
      const likeRef = await db.collection("Venues").doc(uid).collection("venueLikeIDs").doc(user.uid);
      likeRef.onSnapshot((doc) => {
        if (doc.exists) {
          var like = doc.data().likeState;
          setActive(like);
        }
        else {
          db.collection("Venues").doc(uid).collection("venueLikeIDs").doc(user.uid).set({
            likeState: false
          })
        }
      })
    }
  }

  const getVisitStatus = async () => {
    if (user) {
      const visitRef = await db.collection("Venues").doc(uid).collection("venueVisitIDs").doc(user.uid);
      visitRef.onSnapshot((doc) => {
        if (doc.exists) {
          var visit = doc.data().visitState;
          setVisitActive(visit);
        }
        else {
          db.collection("Venues").doc(uid).collection("venueVisitIDs").doc(user.uid).set({
            visitState: false
          })
        }
      })
    }
  }


  React.useEffect(() => {
    getLikeStatus();
    getVisitStatus();
  }, []);

  const handleLikeClick = (e) => {
    e.preventDefault();
    setActive(!active);
    const counterRef = db.collection("Venues").doc(uid).collection("venueLikes").doc(uid).collection("shards").doc('0');
    const likeStateRef = db.collection("Venues").doc(uid).collection("venueLikeIDs").doc(user.uid);
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

  const handleVisitClick = (e) => {
    e.preventDefault();
    setVisitActive(!visitActive);
    const counterRef = db.collection("Venues").doc(uid).collection("venueVisits").doc(uid).collection("shards").doc('0');
    const visitStateRef = db.collection("Venues").doc(uid).collection("venueVisitIDs").doc(user.uid);
    const batch = db.batch();
    if (!visitActive) {
      batch.set(counterRef, {count: firebase.firestore.FieldValue.increment(1)}, {merge: true});
      batch.update(visitStateRef, {visitState: true});
      batch.commit();
      // incrementCounter(db, ref, 0);
      console.log("Visited");
    }
    else {
      batch.set(counterRef, {count: firebase.firestore.FieldValue.increment(-1)}, {merge: true});
      batch.update(visitStateRef, {visitState: false});
      batch.commit();
      // decrementCounter(db, ref, 0);
      console.log("Not visited")
    }
  }

  const handleVenueRating = (e, {rating}) => {
    var venueRef = db.collection("Venues").doc(uid);
    var newRating = venueRef.collection("venueRatingIDs").doc();
    const batch = db.batch();
    batch.set(venueRef, {numRatings: firebase.firestore.FieldValue.increment(1)}, {merge: true});
    batch.update(venueRef, {sumRatings: firebase.firestore.FieldValue.increment(rating)});
    batch.set(newRating, {rating: rating});
    batch.commit();
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
  const shareURL = window.location.origin + '/venue/' + uid;
  return (
    [<Button.Group icon>
      <Button toggle active={active} onClick={handleLikeClick} value={uid}>
        <Icon name='heart'/>
      </Button>
      <Button toggle active={visitActive} onClick={handleVisitClick} value={uid}>
        <Icon name='male'/>
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
        <Modal.Header>Share Venue</Modal.Header>
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
            <Icon name='star'/>
          </Button>
        }
        size='mini'
        closeIcon
             >
        <Modal.Header>Rate Us</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <Rating icon='star' size='large' maxRating={5} onRate={handleVenueRating} clearable/>
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
        <Modal.Header>Reviews</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
          </Modal.Description>
        </Modal.Content>
      </Modal>)
    </Button.Group>]
  );
}
