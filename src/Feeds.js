import PropTypes from 'prop-types';
import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
Container,
Responsive,
Visibility,
Header,
Image,
Menu,
Button,
Placeholder,
Icon,
Dropdown,
Sidebar,
Segment,
Feed,
} from 'semantic-ui-react';
import Footer from './Footer';
import firebase from './components/Firebase';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const db = firebase.firestore()
const storage = firebase.storage().ref();


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
              minHeight: 450,
              Zindex: 0,
            padding: '1em 0em' }}
            vertical
          >
            {/* <Container fluid style={{ 	backgroundColor: "#333333",
            	opacity: 0.6,
            	position: 'absolute',
            	top: 0,
            	bottom: 0,
            	left: 0,
              right: 0,
              Zindex: 0
            }}/> */}
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
                <Menu.Item as={Link} to='/'>Home</Menu.Item>
                <Menu.Item as='a'>Create an Event</Menu.Item>
                <Menu.Item as={Link} to='venues'>Venues</Menu.Item>
                <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
                <Menu.Item position='right'>
                  { user ?
                    ([(<Dropdown trigger={trigger} icon="null" pointing='top left'>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='profile'><Icon name='user'/>Profile</Dropdown.Item>
                        <Dropdown.Item active><Icon name='feed'/>Notifications</Dropdown.Item>
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
          <Menu.Item as={Link} to='/'>Home</Menu.Item>
          <Menu.Item as='a' active>Create an Event</Menu.Item>
          <Menu.Item as={Link} to='venues'>Venues</Menu.Item>
          <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
          {user ?
            (
              [(<Menu.Item as='a'>Dashboard</Menu.Item>),
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

const ResponsiveContainer = ({ children, user }) => (
  <div>
    <DesktopContainer user={user}>{children}</DesktopContainer>
    <MobileContainer user={user}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.array,
}

export default function Feeds(props) {
  const [feedEvents, setFeedEvents] = React.useState([]);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const getFeeds = async (user) => {
    const feedRef = await db.collection('Users').doc(user.uid).collection("feed").orderBy("date", "desc");
    feedRef.get().then((querySnapshot) => {
        let feeds = [];
        querySnapshot.forEach(doc => feeds.push({ ...doc.data()}));
        setFeedEvents(feeds);
        console.log(feeds);
    });
  }
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        db.collection('Users').doc(user.uid).get().then(doc => {
          let usr = doc.data();
          console.log(usr);
          setUser(usr);
          getFeeds(usr);
        });
      }
    });
  }, []);
  return (
    <ResponsiveContainer user={user}>
      <Container style={{ padding: '5em 0em' }} text>
        {feedEvents !== undefined ?
          (<Feed events={feedEvents}/>) :
          (<Segment>You don't have any notification feed yet.</Segment>)
        }
      </Container>
      <Footer/>
    </ResponsiveContainer>
  )
}
