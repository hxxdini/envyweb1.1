import PropTypes from 'prop-types';
import _ from 'lodash'
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
  Dropdown,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Tab,
  Input,
  Search,
  Label,
} from 'semantic-ui-react'
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
      content='Imagine-a-Company'
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
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
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
              minHeight: 700,
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
  user: PropTypes.any,
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
  user: PropTypes.any,
}

const ResponsiveContainer = ({ children }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        console.log(user);
        setUser(user);
      }
      else {
        setUser(null);
      }
  })
}, []);
  return(
  <div>
    <DesktopContainer user={user}>{children}</DesktopContainer>
    <MobileContainer user={user}>{children}</MobileContainer>
  </div>
);
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const panes = [
  {
    menuItem: 'All Events',
    render: () => <Segment padded raised><Media/></Segment>,
  },
  {
    menuItem: 'Party',
    render: () => <Segment padded raised><CategoryMedia loading category="Party"/></Segment>,
  },
  {
    menuItem: 'Tab 3',
    render: () => <Segment padded raised>Tab 3 Content</Segment>,
  },
]

export function Home(props) {

  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setResults] = React.useState([]);
  const handleResultSelect = (e, {result}) => {
    setSearchValue(result.eventName);
  }

  const handleSearchChange = (e, {value}) => {
    setSearchLoader(true);
    setSearchValue(value);
    setTimeout(() => {
      if (searchValue.length < 1) return (setSearchLoader(false));
      const re = new RegExp(_.escapeRegExp(searchValue), 'i');
      const isMatch = (result) => re.test(result.eventName);
      setSearchLoader(false);
      setResults(_.filter(events, isMatch));
    }, 300);
  }

  React.useEffect(() => {
    db.collection("Events").get()
    .then(querySnapshot => {
      // const data = querySnapshot.docs.map(doc => doc.data());
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
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} raised vertical>
      <Menu secondary style={{ marginLeft: '10px' }}>
        <Menu.Menu position='left'>
          <Menu.Item>
            {/* <Input size='large' icon='map marker' iconPosition='left' placeholder='Search for events...' style={{ left: '10px' }}/> */}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Grid container stackable columns='equal' verticalAlign='middle' centered>
        <Grid.Column width={6}>
          <Search
            fluid
            loading={searchLoader}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={searchResults}
            value={searchValue}
            {...props}
          />
        </Grid.Column>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Grid>
    </Segment>
  </ResponsiveContainer>
);
}

function Media(props){
  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  }

  React.useEffect(() => {
    db.collection("Events").get()
    .then(querySnapshot => {
      // const data = querySnapshot.docs.map(doc => doc.data());
      let events = [];
      querySnapshot.forEach(doc =>
        events.push({ ...doc.data() })
      )
      console.log(events);
      setEvents(events);
      console.log(date);
    });
  }, []);

  return(
      <Card.Group centered items={events.count}>
        {events.map(event => (
          <Card link>
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
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon toggle active={active} onClick={handleClick}>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic pointing='left'>
                  0
                </Label>
              </Button>
              <a>
                <Icon name='share alternate'/>
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
  );

}

function CategoryMedia(props){
  const { loading = false, category } = props;
  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  }

  React.useEffect(() => {
    db.collection("Events").where("eventCategory", "==", category).get()
    .then(querySnapshot => {
      // const data = querySnapshot.docs.map(doc => doc.data());
      let events = [];
      querySnapshot.forEach(doc =>
        events.push({ ...doc.data() })
      )
      console.log(events);
      setEvents(events);
      console.log(date);
    });
  }, []);

  return(

      <Card.Group centered items={events.count}>
        {events.map(event => (
          <Card link>
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
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon toggle active={active} onClick={handleClick}>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic pointing='left'>
                  0
                </Label>
              </Button>
              <a>
                <Icon name='share alternate'/>
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
  );

}

CategoryMedia.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.any.isRequired,
};
