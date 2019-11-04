import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
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
  Form,
  Label,
  TextArea,
  Dropdown,
  Checkbox,
  Popup,
  Message,
} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import firebase from './components/Firebase';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const dbref= firebase.firestore().collection('Venues');
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
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              style={{ borderWidth: 0 }}
            >
              <Container>
                <Menu.Item header>Our Company</Menu.Item>
                <Menu.Item as={Link} to='/'>Home</Menu.Item>
                <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
                <Menu.Item as='a'>Venues</Menu.Item>
                <Menu.Item as='a' active>Register a Venue</Menu.Item>
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
          <Menu.Item as={Link} to='/'>Home</Menu.Item>
          <Menu.Item as={Link} to='eventcreate'>Create an Event</Menu.Item>
          <Menu.Item as='a'>Venues</Menu.Item>
          <Menu.Item as='a' active>Register a Venue</Menu.Item>
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
                  {/* <Menu.Item position='right'>
                      <Button as='a' inverted>
                      Log in
                      </Button>
                      <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                      </Button>
                  </Menu.Item> */}
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

export function RegisterVenue() {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [values, setValues] = React.useState({
    venueName: '',
    venueStreet1: '',
    venueStreet2: '',
    venueProvince: '',
    venueCity: '',
    venueDetails: '',
    venuePhone: '',
    venueEmail: '',
  });

  const [venueImage, setImage] = React.useState();
  const [prevUrl, setPrevUrl] = React.useState();
  const [venueCategory, setCategory] = React.useState();
  const [venueSpeciality, setSpeciality] = React.useState();
  const [venueCountry, setCountry] = React.useState();

  const [phoneCode, setCode] = React.useState('+237');

  const [fromTime1, setFromTime1] = React.useState('');
  const [fromTime2, setFromTime2] = React.useState('');
  const [toTime1, setToTime1] = React.useState('');
  const [toTime2, setToTime2] = React.useState('');
  const [openDays, setOpenDays] = React.useState('');
  const [expDays, setExpDays] = React.useState('');

  const handleFromTime1 = (event, {name, value}) => {
      setFromTime1(value);
  }
  const handleFromTime2 = (event, {name, value}) => {
      setFromTime2(value);
  }
  const handleToTime1 = (event, {name, value}) => {
      setToTime1(value);
  }
  const handleToTime2 = (event, {name, value}) => {
      setToTime2(value);
  }

  const handleCategory = (e, {value}) => {
    setCategory(value);
  }
  const handleSpeciality = (e, {value}) => {
    setSpeciality(value);
  }
  const handleCountry = (e, {value}) => {
    setCountry(value);
  }
  const handleOpenDays = (e, {value}) => {
    setOpenDays(value);
  }
  const handleExpDays = (e, {value}) => {
    setExpDays(value);
  }

  const handleCode = (e, {value}) => {
    setCode(value);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDismiss = () => {
    setVisible(false);
  }

  const fileInputRef = React.createRef();

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPrevUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  const onSubmit = (e) => {
      e.preventDefault();
      if(venueImage) {
        const uploadImage = storage.child(`VenueImages/${values.venueName}`).put(venueImage);
        uploadImage.on('state_changed',
            (snapshot) => {
                    // progrss function ....
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setLoading(true);
                  },
            (error) => {
                console.log(error);
            },
            () => {
                uploadImage.snapshot.ref.getDownloadURL().then((url) =>{
                    dbref.add({
                        venueName: values.venueName,
                        venueCategory: venueCategory,
                        venueSpeciality: venueSpeciality,
                        venueStreet1: values.venueStreet1,
                        venueStreet2: values.venueStreet2,
                        venueProvince: values.venueProvince,
                        venueCity: values.venueCity,
                        venueCountry: venueCountry,
                        venuePhone: `${phoneCode}${values.venuePhone}`,
                        venueEmail: values.venueEmail,
                        venueDetails: values.venueDetails,
                        openDays: openDays,
                        expDays: expDays,
                        openTime1: fromTime1,
                        closeTime1: toTime1,
                        openTime2: fromTime2,
                        closeTime2: toTime2,
                        venueImgUrl: url
                    }).then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        dbref.doc(docRef.id).update({
                          'uid': docRef.id
                        })
                        setValues(
                          {
                            venueName: '',
                            venueStreet1: '',
                            venueStreet2: '',
                            venueProvince: '',
                            venueCity: '',
                            venueDetails: '',
                            venuePhone: '',
                            venueEmail: '',
                          }
                        );
                        setFromTime1('');
                        setFromTime2('');
                        setToTime1('');
                        setToTime2('');
                        setCategory('');
                        setSpeciality('');
                        setCountry('');
                        setOpenDays('');
                        setExpDays('');
                        setImage("");
                        setPrevUrl("");
                        setLoading(false);
                    }).catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                })

            }
        );
      }
      else {
        setVisible(true);
      }
  }

  const category = [
    {key: 'Snackbar', text: 'Snackbar', value: 'Snackbar'},
    {key: 'Restaurant', text: 'Restaurant', value: 'Restaurant'},
    {key: 'Cinema', text: 'Cinema', value: 'Cinema'},
    {key: 'Snackbar', text: 'Snackbar', value: 'Snackbar'},
  ]

  const speciality = [
    {key: '#Grill', text: '#Grill', value: '#Grill'},
    {key: '#Barbecue', text: '#Barbecue', value: '#Barbecue'},
    {key: '#Cocktails', text: '#Cocktails', value: '#Cocktails'},
    {key: '#Discoclub', text: '#Discoclub', value: '#Discoclub'},
    {key: '#Movies', text: '#Movies', value: '#Movies'},
  ]

  const days = [
    {key: 'Mondays', text: 'Mondays', value: 'Mondays'},
    {key: 'Tuesdays', text: 'Tuesdays', value: 'Tuesdays'},
    {key: 'Wednesdays', text: 'Wednesdays', value: 'Wednesdays'},
    {key: 'Thursdays', text: 'Thursdays', value: 'Thursdays'},
    {key: 'Fridays', text: 'Fridays', value: 'Fridays'},
    {key: 'Saturdays', text: 'Saturdays', value: 'Saturdays'},
    {key: 'Sundays', text: 'Sundays', value: 'Sundays'},
  ]

  const country = [
    {key: 'Cameroon', text: 'Cameroon', value: 'Cameroon'},
  ]

  const phoneExt = [
    {key: '+237', text: '+237', value: '+237'}
  ]

  return (
    <ResponsiveContainer>
      <NotificationContainer/>
      <Container style={{ padding: '5em 0em' }} text>
        <Form size='large' error key='large' loading={loading} onSubmit={onSubmit}>
          {visible ? (<Message
            error
            header='Image Missing'
            content='Please insert a main image for your venue'
            onDismiss={handleDismiss}
                      />) : ""}
          <Header size='huge'>
            <Icon name='clipboard' color='grey'/>
            <Header.Content>Venue Identification</Header.Content>
            <Header.Subheader>Identify your venue &amp; set its category to ease its access by potential customers.</Header.Subheader>
          </Header>
          <Form.Field required>
            <label>Venue Name</label>
            <input placeholder='Name' name='venueName' value={values.venueName} onChange={handleChange('venueName')} required/>
          </Form.Field>
          <Form.Group>
            <Form.Dropdown selection label='Venue Category' placeholder='Category' required value={venueCategory} onChange={handleCategory} options={category}/>
            <Form.Dropdown selection multiple label='Venue Specialities' placeholder='Specialities' required value={venueSpeciality} onChange={handleSpeciality} options={speciality}/>
          </Form.Group>
          <Divider/>
          <Header size='huge'>
            <Icon name='map marker alternate' color='grey'/>
            <Header.Content>Venue Location</Header.Content>
            <Header.Subheader>Fill in precise information about the location of your venue in order to help users find you.</Header.Subheader>
          </Header>
          <Form.Group>
            <Form.Input label='Street Address 1' placeholder='Address 1' required name='venueStreet1' value={values.venueStreet1} onChange={handleChange('venueStreet1')}/>
            <Form.Input label='Street Address 2' placeholder='Address 2' name='venueStreet2' value={values.venueStreet2} onChange={handleChange('venueStreet2')}/>
          </Form.Group>
          <Form.Group>
            <Form.Input label='City' placeholder='City' required name='venueCity' value={values.venueCity} onChange={handleChange('venueCity')}/>
            <Form.Input label='State/Province' placeholder='State/Province' required name='venueProvince' value={values.venueProvince} onChange={handleChange('venueProvince')}/>
          </Form.Group>
          <Form.Select label='Country' placeholder='Country' required width={6} name='venueCountry' value={venueCountry} onChange={handleCountry} options={country}/>
          <Divider/>
          <Header size='huge'>
            <Icon name='info circle' color='grey'/>
            <Header.Content>Venue Details</Header.Content>
            <Header.Subheader>Give some highlighted descriptions about your venue so the customers can picture what kind of atmosphere awaits them</Header.Subheader>
          </Header>
          <Form.TextArea label='Description' placeholder='Description' style={{ minHeight: 250 }} required name='venueDetails' value={values.venueDetails} onChange={handleChange('venueDetails')}/>
          <Form.Field required>
            <label>Choose the Main Image for your venue</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={prevUrl} size='large' rounded/>
          <Form.Group>
            <Form.Dropdown selection multiple label='Opening Days' placeholder='Days' required name='openDays' value={openDays} onChange={handleOpenDays} options={days}/>
            <TimeInput
              label='Opening Time'
              name='openingTime'
              placeholder="From"
              timeFormat="AMPM"
              required
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={fromTime1}
              onChange={handleFromTime1}
            />
            <TimeInput
              label='Closing Time'
              name='closingTime'
              placeholder="To"
              timeFormat="AMPM"
              required
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={toTime1}
              onChange={handleToTime1}
            />
          </Form.Group>
          <Header size='small'>
            <Header.Content>Exceptions</Header.Content>
            <Header.Subheader>Do you have days with different opening/closing hours</Header.Subheader>
          </Header>
          <Form.Group>
            <Form.Dropdown selection multiple label='Exceptional Opening Days' placeholder='Days' name='expDays' value={expDays} onChange={handleExpDays} options={days}/>
            <TimeInput
              label='Opening Time'
              name='expOpeningTime'
              placeholder="From"
              timeFormat="AMPM"
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={fromTime2}
              onChange={handleFromTime2}
            />
            <TimeInput
              label='Closing Time'
              name='expClosingTime'
              placeholder="To"
              timeFormat="AMPM"
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={toTime2}
              onChange={handleToTime2}
            />
          </Form.Group>
          <Divider/>
          <Header size='huge'>
            <Icon name='phone' color='grey'/>
            <Header.Content>Contact Information</Header.Content>
            <Header.Subheader>Set your venue's contact details so as to have a direct link with customers.</Header.Subheader>
          </Header>
          <Form.Group>
            <Form.Field width={7} required>
              <label>Venue Email Address</label>
              <Input placeholder='Email' name='venueEmail' required value={values.venueEmail} onChange={handleChange('venueEmail')}/>
            </Form.Field>
            <Form.Field width={7} required>
              <label>Venue Phone Number</label>
              <Input label={<Dropdown defaultValue={phoneCode} options={phoneExt} value={phoneCode} onChange={handleCode}/>} labelPosition='left' name='venuePhone' value={values.venuePhone} onChange={handleChange('venuePhone')}/>
            </Form.Field>
          </Form.Group>
          <Divider/>
          <Form.Button primary content='Register Venue' type='submit' floated='right'/>
          {visible ? (<Message
            error
            header='Image Missing'
            content='Please insert a main image for your venue'
            onDismiss={handleDismiss}
                      />) : ""}
        </Form>
      </Container>
    </ResponsiveContainer>
  );
}
