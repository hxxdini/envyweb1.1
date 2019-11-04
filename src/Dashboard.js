import PropTypes from 'prop-types';
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

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
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
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
                <Menu.Item as='a'>Venues</Menu.Item>
                <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            {/* <HomepageHeading /> */}
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
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
          <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as='a'>Venues</Menu.Item>
          <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
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
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              {/* <HomepageHeading mobile /> */}
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

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


export function Dashboard() {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [userInfo, setUserInfo] = React.useState([]);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        db.collection("Users").doc(user.uid).get().then(doc => {
          console.log(doc.data().uid);
          setUserInfo(doc.data());
        })
        console.log(user);
      }
      else {
        setUser(null);
      }
    });
  }, []);


  const panes = [
    { menuItem: { key: 'events', icon: 'calendar alternate', content: 'Events' }, render: () => <Segment raised><Event/></Segment> },
    // { menuItem: { key: 'venues', icon: 'building', content: 'Venues' }, render: () => <Segment padded raised>Tab 2 Content</Segment> },
    { menuItem: { key: 'friends', icon: 'users', content: 'Friends' }, render: () => <Segment padded raised>Tab 3 Content</Segment> },
    { menuItem: { key: 'profile', icon: 'user', content: 'Profile' }, render: () => <Segment padded raised><Profile user={userInfo}/></Segment>},
  ]

  return (
    <ResponsiveContainer>
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
                  Biography
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={6} divided textAlign='center'>
              <Grid.Column>
                <Statistic size='small'>
                  <Statistic.Value>0</Statistic.Value>
                  <Statistic.Label>Friends</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column>
                <Statistic size='small'>
                  <Statistic.Value>0</Statistic.Value>
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

const eventPanes = [
  {
    menuItem: 'Upcoming',
    render: () => <Tab.Pane attached={false}><Upcoming/></Tab.Pane>,
  },
  {
    menuItem: 'Recently Created',
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
  },
]

function Event() {
  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={eventPanes} />
  )
}

function Upcoming() {
  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [open, setModalOpen] = React.useState(false);

  const handleClick = (e) => {
    setModalOpen(true);
  }

  const handleClose = (e) => {
    setModalOpen(false);
  }

  React.useEffect(() => {
    db.collection("Events").where("createdBy", "==", "H4gd9cD538REhBtq8BwUYqeBfeK2").get()
    .then(querySnapshot => {
      let events = [];
      querySnapshot.forEach(doc =>
        events.push({ ...doc.data() })
      )
      console.log(events);
      setEvents(events);
      console.log(date);
    });
  }, []);

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
  user: PropTypes.any.isRequired,
}

function Profile(props) {
  const {user} = props
  const fileInputRef = React.createRef();
  const [profileImage, setImage] = React.useState();
  const [prevUrl, setPrevUrl] = React.useState();
  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPrevUrl(URL.createObjectURL(e.target.files[0]));
    }
  }
  return (
    <Form>
      <Form.Group>
        <Form.Input label='First Name' placeholder={user.firstName} width={6}/>
        <Form.Input label='Last Name' placeholder={user.lastName} width={6}/>
      </Form.Group>
      <Form.Field>
        <Form.Input label='Username' placeholder={user.username} width={6}/>
      </Form.Field>
      <Form.Field>
        <Form.TextArea label='Biography' placeholder={user.biography ? user.biography : 'Enter a brief description of yourself'} style={{ minHeight: 250 }}/>
      </Form.Field>
      <Form.Field>
        <label>Change your profile photo</label>
        <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
        <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
      </Form.Field>
      <Image size='small' src={user.profileImgUrl ? user.profileImgUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'} circular/>
    </Form>
  );
}
