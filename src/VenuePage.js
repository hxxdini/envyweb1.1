import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
  Placeholder,
  Search,
  Comment,
  Label,
  Rating,
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
import './assets/cardStyles.css';
import './assets/shareStyles.css';

import Footer from './Footer';

import firebase from './components/Firebase';

import GoogleMapReact from 'google-map-react';

import ReactMapGL, {Marker, Popup, GeolocateControl, NavigationControl} from 'react-map-gl';



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
          <Menu.Item as={Link} to='/eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
          <Menu.Item as={Link} to='/registervenue'>Register a Venue</Menu.Item>
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

export default function VenuePage(props) {
  const [user, setUser] = React.useState(firebase.auth().currentUser)
  const [venue, setVenue] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [visitActive, setVisitActive] = React.useState(false);
  const [venueLikes, setVenueLikes] = React.useState(0);
  const [venueVisits, setVenueVisits] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [rating, setRating] = React.useState();
  const [venueRating, setVenueRating] = React.useState();
  const [values, setValues] = React.useState({
    review: '',
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleRating = (e, {rating}) => {
    console.log(rating);
    setRating(rating);
  }
  const handleVenueRating = (e, {rating}) => {
    setVenueRating(rating)
    db.collection('Venues').doc(uid).collection('venueRatings').doc(user.uid).set({
      rating: rating
    });
  }
  const postReview = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("Venues").doc(uid).collection("reviews").add({
      reviewComment: values.review,
      reviewRating: rating,
      reviewProfileImgUrl: user.profileImgUrl,
      reviewerID: user.uid,
      reviewerUsername: user.username,
      reviewDate: date,
    }).then(() => {
      setLoader(false);
      setValues({
        review: '',
      });
      setRating(0);
    });
  }
  const shareURL = window.location.origin;
  let {uid} = useParams();

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

  const getLikeStatus = async (user) => {
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

  const getLikesCount = async () => {
    const likeRef = await db.collection("Venues").doc(uid).collection("venueLikes").doc(uid).collection("shards").doc('0');
    likeRef.onSnapshot((doc) => {
      if (doc.exists) {
        var likeCount = doc.data().count
        setVenueLikes(likeCount);
      }
      else {
        createCounter(db.collection("Venues").doc(uid).collection("venueLikes").doc(uid), 0)
      }
    });
  }

  const getVisitsCount = async () => {
    const visitRef = await db.collection("Venues").doc(uid).collection("venueVisits").doc(uid).collection("shards").doc('0');
    visitRef.onSnapshot((doc) => {
      if (doc.exists) {
        var visitCount = doc.data().count
        setVenueVisits(visitCount);
      }
      else {
        createCounter(db.collection("Venues").doc(uid).collection("venueVisits").doc(uid), 0)
      }
    });
  }

  const getVisitStatus = async (user) => {
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


  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('Users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            var usr = doc.data();
            setUser(doc.data());
            getLikeStatus(usr);
            getVisitStatus(usr);
            getLikesCount();
            getVisitsCount();
          }
          else {
            setUser(null);
          }
        })
      }
      else {
        setUser(null);
      }
    })
    db.collection('Venues').doc(uid).get().then(doc => {
      setVenue(doc.data());
    })
    setTimeout(() => {
      setLoading(false);
    }, 5000);
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

  function getCount(ref) {
    // Sum the count of each shard in the subcollection
    return ref.collection('shards').get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });

        return total_count;
    });
}

  return (
    <ResponsiveContainer user={user}>
      <Container style={{ padding: '5em 0em' }}>
        <Segment raised padded>
          <Grid centered doubling stackable>
            <Grid.Row centered columns={2}>
              <Grid.Column textAlign='center'>
                {loading ? <Placeholder className='page_image'><Placeholder.Image rectangular/></Placeholder> : <Image src={venue.venueImgUrl} size='big' rounded className='page_image'/>}
              </Grid.Column>
              <Grid.Column textAlign='center'>
                { loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header as='h2' block size='big'>
                  <Header.Content>{venue.venueName}</Header.Content>
                  <Header.Subheader>{venue.venueCategory}</Header.Subheader>
                </Header>
                }
                {loading ? <Placeholder><Placeholder.Line length='very short'/></Placeholder> : <Rating icon='star' defaultRating={venue.rating} maxRating={5} disabled/>}
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header>
                  <Icon name='clock' color='grey'/>
                  <Header.Content>Schedule</Header.Content>
                </Header>
                }
                {loading ?
                  <Placeholder>
                    <Placeholder.Paragraph>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                    </Placeholder.Paragraph>
                  </Placeholder>
                :
                [(<p><strong>Opened Days:</strong>{venue.openDays ? (venue.openDays.map((day) => (<span> <Label color='green'>{day}<Label.Detail>{venue.openTime1} - {venue.closeTime1}</Label.Detail></Label> </span>))) : ''}</p>),
                  (<p><strong>Exceptional Days:</strong>{venue.expDays ? (venue.expDays.map((eday) => (<span> <Label color='blue'>{eday}<Label.Detail>{venue.openTime2} - {venue.closeTime2}</Label.Detail></Label></span>))) : ''}</p>)]
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns='equal'>
              <Grid.Column>
                { loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <div className='Share__container'>
                  <div className='Share__some-network'>
                    <FacebookShareButton url={shareURL} title={venue.venueName} className='Share__some-network__share-button'>
                      <FacebookIcon
                        size={32}
                      round />
                    </FacebookShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <TwitterShareButton url={shareURL} title={venue.venueName} className='Share__some-network__share-button'>
                      <TwitterIcon
                        size={32}
                      round/>
                    </TwitterShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <WhatsappShareButton url={shareURL} title={venue.venueName} className='Share__some-network__share-button'>
                      <WhatsappIcon
                        size={32}
                      round/>
                    </WhatsappShareButton>
                  </div>
                  <div className='Share__some-network'>
                    <EmailShareButton url={shareURL} title={venue.venueName} className='Share__some-network__share-button'>
                      <EmailIcon
                        size={32}
                      round/>
                    </EmailShareButton>
                  </div>
                </div>
                }
              </Grid.Column>
              <Grid.Column width={6}>
                { loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Button.Group>
                  <Button as='div' labelPosition='right'>
                    <Button toggle active={active} onClick={handleLikeClick}>
                      <Icon name='heart'/>
                    </Button>
                    <Label as='a' basic pointing='left'>
                      {venueLikes}
                    </Label>
                  </Button>
                  <Button as='div' labelPosition='right'>
                    <Button toggle active={visitActive} onClick={handleVisitClick}>
                      <Icon name='male'/>
                    </Button>
                    <Label as='a' basic pointing='left'>
                      {venueVisits}
                    </Label>
                  </Button>
                  <Modal
                    trigger={
                      <Button>
                        <Icon name='comment alternate'/>
                      </Button>
                    }
                    closeIcon
                  >
                    <Modal.Header>Reviews</Modal.Header>
                    <Modal.Content image scrolling>
                      <Modal.Description>
                        <Comment.Group>
                          <Reviews uid={uid}/>
                          <Form reply loading={loader} onSubmit={postReview}>
                            <Form.TextArea placeholder='Add a review message or comment' value={values.review} onChange={handleChange('review')} name='review' required/>
                            <Form.Field>
                              <label>Rate your comment</label>
                              <Rating icon='star' maxRating={5} onRate={handleRating} size='large' clearable/> <br/>
                            </Form.Field>
                            <Button content='Add Review' labelPosition='left' icon='edit' primary type='submit'/>
                          </Form>
                          <Divider hidden/>
                        </Comment.Group>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
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
                  </Modal>
                </Button.Group>
                }
              </Grid.Column>
              <Grid.Column>
                { loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                [(<Header>
                  <Icon name='map pin' color='grey'/>
                  <Header.Content>Address</Header.Content>
                </Header>),
                  (<p>
                    {venue.venueStreet1}, {venue.venueCity}
                    <br/>
                    {venue.venueProvince}, {venue.venueCountry}
                  </p>)]
                }
              </Grid.Column>
              <Grid.Column>
                { loading ?
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
                    {venue.venuePhone}
                    <br/>
                    {venue.venueEmail}
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
                </Header>)
                  ]
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                { loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header>
                  <Icon name='camera' color='grey'/>
                  <Header.Content>Featured Photos</Header.Content>
                </Header>
                }
                {loading ? <Placeholder><Placeholder.Image square/></Placeholder> : <FeaturedPhotos uid={uid}/>}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                {loading ?
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                  </Placeholder>
                :
                <Header>
                  <Icon name='clipboard' color='grey'/>
                  <Header.Content>Proposed Menus</Header.Content>
                </Header>
                }
                {loading ? <Placeholder><Placeholder.Image square/></Placeholder> : <Menus uid={uid}/>}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {venue.venueStreet1 ? <MapView venue={venue.venueName} address={venue.venueStreet1} city={venue.venueCity}/> : ''}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Footer/>
    </ResponsiveContainer>
  );
}

FeaturedPhotos.propTypes = {
  uid: PropTypes.string.isRequired,
}

function FeaturedPhotos(props) {
  const {uid} = props;
  const [images, setImages] = React.useState([]);
  const getPhotos = async () => {
    const photosRef = await db.collection("Venues").doc(uid).collection("Photos").orderBy("photoDate").limit(4);
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
        <Card link raised image={image.photoUrl} className='page_photo_card_image'/>
      ))}
    </Card.Group>
  );

}

Menus.propTypes = {
  uid: PropTypes.string.isRequired,
}

function Menus(props) {
  const {uid} = props;
  const [menus, setMenus] = React.useState([]);
  const getMenus = async () => {
    const menuRef = await db.collection("Venues").doc(uid).collection("Menus").orderBy("menuName").limit(4);
    menuRef.get().then((snapshot) => {
      let images = [];
      snapshot.forEach(doc => images.push({ ...doc.data()}))
      setMenus(images);
    })
  }

  React.useEffect( () => {
    getMenus();
  }, [])

  return(
    <Card.Group centered items={menus.count} itemsPerRow={4}>
      {menus.map(menu => (
        <Card link raised image={menu.menuUrl} className='page_photo_card_image'/>
      ))}
    </Card.Group>
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
        <div>{venue}</div>
      </Popup>}
    </ReactMapGL>
  );
}

Reviews.propTypes = {
  uid: PropTypes.any.isRequired,
  user: PropTypes.any,
}

function Reviews(props) {
  const {uid} = props
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    db.collection('Venues').doc(uid).collection('reviews').onSnapshot(querySnapshot => {
      let reviews = [];
      querySnapshot.forEach(doc =>
        reviews.push({ ...doc.data() })
      )
      console.log(reviews);
      setReviews(reviews);
    })
  }, [])
  return (
      reviews.map(review => (
          <Comment>
            <Comment.Avatar src={review.reviewProfileImgUrl} />
            <Comment.Content>
              <Comment.Author as='a'>{review.reviewerUsername}</Comment.Author>
              <Comment.Metadata>
                <div>{new Date(review.reviewDate.toDate()).toDateString()}</div>
                <div><Rating icon='star' defaultRating={review.reviewRating} maxRating={5} disabled/></div>
              </Comment.Metadata>
              <Comment.Text>{review.reviewComment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))
  );
}
