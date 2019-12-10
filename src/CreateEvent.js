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

const dbref= firebase.firestore().collection('Events');
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
                <Menu.Item as='a' active>Create an Event</Menu.Item>
                <Menu.Item as='a'>Venues</Menu.Item>
                <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
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
          <Menu.Item as='a' active>Create an Event</Menu.Item>
          <Menu.Item as='a'>Venues</Menu.Item>
          <Menu.Item as={Link} to='registervenue'>Register a Venue</Menu.Item>
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



export function CreateEvent() {
  const [values, setValues] = React.useState({
    eventTitle: '',
    eventOrganizer: '',
    eventEmail: '',
    eventPhone: '',
    eventVenue: '',
    eventStreet1: '',
    eventStreet2: '',
    eventCity: '',
    eventProvince: '',
    eventDetails: '',
    });
  const [eventCategory, setCategory] = React.useState();
  const [eventType, setType] = React.useState();
  const [eventCountry, setCountry] = React.useState();
  const [phoneCode, setCode] = React.useState('+237');

  const handleCategory = (e, {value}) => {
    setCategory(value);
  }
  const handleType = (e, {value}) => {
    setType(value);
  }
  const handleCountry = (e, {value}) => {
    setCountry(value);
  }

  const handleCode = (e, {value}) => {
    setCode(value);
  }

  const [eventImage, setImage] = React.useState();
  const [prevUrl, setPrevUrl] = React.useState();
  const [eventPublic, setPublic] = React.useState(false);
  const [eventTickets, setTickets] = React.useState(false);

  const handlePublic = (e) => {
    setPublic(!eventPublic);
  }

  const handleTickets = (e) => {
    setTickets(!eventTickets);
  }

  const fileInputRef = React.createRef();

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleStartDateChange = (event, {name, value}) => {
      setStartDate(value);
  }
  const handleEndDateChange = (event, {name, value}) => {
      setEndDate(value);
  }
  const handleStartTimeChange = (event, {name, value}) => {
      setStartTime(value);
  }
  const handleEndTimeChange = (event, {name, value}) => {
      setEndTime(value);
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPrevUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  const onSubmit = (e) => {
			e.preventDefault();
      if(eventImage) {
        const uploadImage = storage.child(`EventImages/${values.eventTitle}`).put(eventImage);
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
                                    console.log(eventCategory);
                uploadImage.snapshot.ref.getDownloadURL().then((url) =>{
                    dbref.add({
                        eventName: values.eventTitle,
                        eventCategory: eventCategory,
                        eventType: eventType,
                        eventOrganizer: values.eventOrganizer,
                        eventVenue: values.eventVenue,
                        eventStreet1: values.eventStreet1,
                        eventStreet2: values.eventStreet2,
                        eventProvince: values.eventProvince,
                        eventCity: values.eventCity,
                        eventCountry: eventCountry,
                        eventPhone: `${phoneCode}${values.eventPhone}`,
                        eventEmail: values.eventEmail,
                        eventDetails: values.eventDetails,
                        startDate: startDate,
                        startTime: startTime,
                        endDate: endDate,
                        endTime: endTime,
                        eventImgUrl: url,
                        public: eventPublic,
                        tickets: eventTickets
                    }).then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        dbref.doc(docRef.id).update({
                          'uid': docRef.id
                        })
                        setValues(
                          {
                            eventTitle: '',
                            eventOrganizer: '',
                            eventEmail: '',
                            eventPhone: '',
                            eventVenue: '',
                            eventStreet1: '',
                            eventStreet2: '',
                            eventCity: '',
                            eventProvince: '',
                            eventDetails: '',
                          }
                        );
                        setStartDate('');
                        setEndDate('');
                        setStartTime('');
                        setEndTime('');
                        setCategory('');
                        setType('');
                        setCountry('');
                        setImage("");
                        setPrevUrl("");
                        setPublic(false);
                        setTickets(false);
                        setLoading(false);
                    }).catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                })

            }
        );
      }
			else {
			}
	}

  const category = [
    {key: 'Sports', text: 'Sports', value: 'Sports'},
    {key: 'Music', text: 'Music', value: 'Music'},
    {key: 'Party', text: 'Party', value: 'Party'},
    {key: 'Business', text: 'Business', value: 'Business'},
    {key: 'Education', text: 'Education', value: 'Education'},
  ]

  const type = [
    {key: 'Indoors', text: 'Indoors', value: 'Indoors'},
    {key: 'Chillout', text: 'Chillout', value: 'Chillout'},
    {key: 'Casual', text: 'Casual', value: 'Casual'},
    {key: 'Conference', text: 'Conference', value: 'Conference'},
  ]

  const country = [
    {key: 'Cameroon', text: 'Cameroon', value: 'Cameroon'},
  ]

 const phoneExt = [
   {key: '+237', text: '+237', value: '+237'}
 ]

  React.useEffect(()=>{
  });
  return (
    <ResponsiveContainer>
      <Container style={{ padding: '5em 0em' }} text>
        <Form size='large' key='large' loading={loading} onSubmit={onSubmit}>
          <Header size='huge'>
            <Icon name='text cursor' color='grey'/>
            <Header.Content>Basic Information</Header.Content>
            <Header.Subheader>Give your event live by attracting your event-goers with suitable inspiring title, tags & featured details that make your event unique.</Header.Subheader>
          </Header>
          <Form.Field required>
            <label>Event Title</label>
            <input placeholder='Title' value={values.eventTitle} name='eventTitle' onChange={handleChange('eventTitle')} required/>
          </Form.Field>
          <Form.Group>
            <Form.Dropdown selection label='Event Category' placeholder='Category' required value={eventCategory} name='eventCategory' onChange={handleCategory} options={category}/>
            <Form.Dropdown selection multiple label='Event Type' placeholder='Type' required value={eventType} name='eventType' onChange={handleType} options={type}/>
          </Form.Group>
          <Form.Field required width={10}>
            <label>Event Organizer</label>
            <input placeholder='Organizer' value={values.eventOrganizer} name='eventOrganizer' onChange={handleChange('eventOrganizer')} required/>
          </Form.Field>
          <Divider/>
          <Header size='huge'>
            <Icon name='map marker alternate' color='grey'/>
            <Header.Content>Location Information</Header.Content>
            <Header.Subheader>Make your event's location know to the attendees &amp; the surrounding community</Header.Subheader>
          </Header>
          <Form.Field required width={10}>
            <label>Event Venue</label>
            <input placeholder="Venue" value={values.eventVenue} name='eventVenue' onChange={handleChange('eventVenue')} required/>
          </Form.Field>
          <Form.Group>
            <Form.Input label='Street Address 1' placeholder='Address 1' required value={values.eventStreet1} name='eventStreet1' onChange={handleChange('eventStreet1')}/>
            <Form.Input label='Street Address 2' placeholder='Address 2' value={values.eventStreet2} name='eventStreet2' onChange={handleChange('eventStreet2')}/>
          </Form.Group>
          <Form.Group>
            <Form.Input label='City' placeholder='City' required value={values.eventCity} name='eventCity' onChange={handleChange('eventCity')}/>
            <Form.Input label='State/Province' placeholder='State/Province' required value={values.eventProvince} name='eventProvince' onChange={handleChange('eventProvince')}/>
          </Form.Group>
          <Form.Select label='Country' placeholder='Country' required width={6} value={eventCountry} name='eventCountry' onChange={handleCountry} options={country}/>
          <Divider/>
          <Header size='huge'>
            <Icon name='calendar alternate outline' color='grey'/>
            <Header.Content>Date and Time</Header.Content>
            <Header.Subheader>Tell your event-goers when your event starts &amp; ends with precise times to help them plan for your event ahead of time.</Header.Subheader>
          </Header>
          <Form.Group>
            <DateInput
              label='Start Date'
              clearable
              name="startDate"
              minDate={"2070-01-31"}
              placeholder="Start Date"
              dateFormat="ddd Do MMM YYYY"
              value={startDate}
              iconPosition="left"
              onChange={handleStartDateChange}
              required
              hideMobileKeyboard={true}
              closable={true}
            />
            <TimeInput
              label='Start Time'
              clearable
              name="startTime"
              placeholder="Start Time"
              timeFormat="AMPM"
              value={startTime}
              iconPosition="left"
              onChange={handleStartTimeChange}
              required
              hideMobileKeyboard={true}
              closable={true}
            />
          </Form.Group>
          <Form.Group>
            <DateInput
              label='End Date'
              clearable
              name="endDate"
              placeholder="End Date"
              dateFormat="ddd Do MMM YYYY"
              value={endDate}
              iconPosition="left"
              onChange={handleEndDateChange}
              required
              hideMobileKeyboard={true}
              closable={true}
            />
            <TimeInput
              label='End Time'
              clearable
              name="endTime"
              placeholder="End Time"
              timeFormat="AMPM"
              value={endTime}
              iconPosition="left"
              onChange={handleEndTimeChange}
              required
              hideMobileKeyboard={true}
              closable={true}
            />
          </Form.Group>
          <Divider/>
          <Header size='huge'>
            <Icon name='info circle' color='grey'/>
            <Header.Content>Event Details</Header.Content>
            <Header.Subheader>Throw more light by briefly telling your invitees what to expect as they choose to attend your event.</Header.Subheader>
          </Header>
          <Form.TextArea label='Event Description' placeholder='Description' style={{ minHeight: 250 }} required value={values.eventDetails} name='eventDetails' onChange={handleChange('eventDetails')}/>
          <Form.Field required>
            <label>Choose the Main Image for your event</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={prevUrl} size='large' rounded/>
          <Divider/>
          <Header size='huge'>
            <Icon name='user' color='grey'/>
            <Header.Content>Organizer Information</Header.Content>
            <Header.Subheader>Let your potential event-goers know how to contact you for more information or personal requests about your event.</Header.Subheader>
          </Header>
          <Form.Group>
            <Form.Field width={7} required>
              <label>Organizer Email Address</label>
              <Input placeholder='Email' value={values.eventEmail} name='eventEmail' onChange={handleChange('eventEmail')} required/>
            </Form.Field>
            <Form.Field width={7} required>
              <label>Organizer Phone Number</label>
              <Input label={<Dropdown defaultValue={phoneCode} options={phoneExt} value={phoneCode} onChange={handleCode}/>} labelPosition='left' value={values.eventPhone} name='eventPhone' onChange={handleChange('eventPhone')}/>
            </Form.Field>
          </Form.Group>
          <Divider/>
          <Popup content='Event will be made public to all app users if turned on' trigger={<Button icon='question circle outline' type='button' size='mini'/>}/>
          <Form.Group inline>
            <Form.Field>
              <label>Public ?</label>
              <Checkbox toggle checked={eventPublic} onChange={handlePublic}/>
              <Popup/>
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Form.Field>
              <label>Tickets ?</label>
              <Checkbox toggle checked={eventTickets} onChange={handleTickets}/>
            </Form.Field>
          </Form.Group>
          <Form.Button primary content='Create Event' type='submit' floated='right'/>
        </Form>
      </Container>
    </ResponsiveContainer>
  );
}
