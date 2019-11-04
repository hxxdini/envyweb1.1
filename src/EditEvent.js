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

const db = firebase.firestore();

EditEvent.propTypes = {
  event: PropTypes.any.isRequired,
}

export function EditEvent(props) {
  const storage = firebase.storage().ref();
  const {event} = props
  const docref= firebase.firestore().collection('Events').doc(event.uid);
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

  const categories = [
    {key: 'Sports', text: 'Sports', value: 'Sports'},
    {key: 'Music', text: 'Music', value: 'Music'},
    {key: 'Party', text: 'Party', value: 'Party'},
    {key: 'Business', text: 'Business', value: 'Business'},
    {key: 'Education', text: 'Education', value: 'Education'},
  ]

  const types = [
    {key: 'Indoors', text: 'Indoors', value: 'Indoors'},
    {key: 'Chillout', text: 'Chillout', value: 'Chillout'},
    {key: 'Casual', text: 'Casual', value: 'Casual'},
    {key: 'Conference', text: 'Conference', value: 'Conference'},
  ]

  const countries = [
    {key: 'Cameroon', text: 'Cameroon', value: 'Cameroon'},
  ]

 const phoneExts = [
   {key: '+237', text: '+237', value: '+237'}
 ]

  const [basicLoading, setBasicLoader] = React.useState(false);

  const updateBasicInfo = e => {
    e.preventDefault();
    setBasicLoader(true);
    docref.update({
      'eventName': values.eventTitle ? values.eventTitle : event.eventName,
      'eventCategory': eventCategory ? eventCategory : event.eventCategory,
      'eventType': eventType ? eventType : event.eventType,
      'eventOrganizer': values.eventOrganizer ? values.eventOrganizer : event.eventOrganizer
    })
    .then(function() {
      setBasicLoader(false);
      setValues({
        'eventTitle': '',
        'eventType': '',
        'eventOrganizer': ''
      })
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
}
  const [locLoading, setLocLoader] = React.useState(false);

  const updateLocationInfo = e => {
    e.preventDefault();
    setLocLoader(true);
    docref.update({
      'eventVenue': values.eventVenue ? values.eventVenue : event.eventVenue,
      'eventStreet1': values.eventStreet1 ? values.eventStreet1 : event.eventStreet1,
      'eventStreet2': values.eventStreet2 ? values.eventStreet2 : event.eventStreet2,
      'eventCity': values.eventCity ? values.eventCity : event.eventCity,
      'eventProvince': values.eventProvince ? values.eventProvince : event.eventProvince,
      'eventCountry': eventCountry ? eventCountry : event.eventCountry
    }).then(function() {
          setLocLoader(false);
          setValues({
            'eventVenue': '',
            'eventStreet1': '',
            'eventStreet2': '',
            'eventCity': '',
            'eventProvince': '',
          });
          setCountry('');
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      })
  }

  const [timeLoading, setTimeLoader] = React.useState(false);

  const updateDateTime = e => {
    e.preventDefault();
    setTimeLoader(true);
    docref.update({
       'startDate': startDate ? startDate : event.startDate,
       'startTime': startTime ? startTime : event.startTime,
       'endDate': endDate ? endDate : event.endDate,
       'endTime': endTime ? endTime : event.endTime
    }).then(function() {
          setTimeLoader(false);
          setStartDate('');
          setEndDate('');
          setStartTime('');
          setEndTime('');
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      })
  }

  const [detailLoading, setDetailLoader] = React.useState(false);

  const updateDetails = e => {
    e.preventDefault();
    setDetailLoader(true);
    if (eventImage) {
      const uploadImage = storage.child(`EventImages/${values.eventTitle}`).put(eventImage);
          uploadImage.on('state_changed',
          (snapshot) => {
                  setLoading(true);
                },
          (error) => {
              console.log(error);
            },
            () => {
                console.log(eventCategory);
                uploadImage.snapshot.ref.getDownloadURL().then((url) => {
                  docref.update({
                    'eventDetails': values.eventDetails ? values.eventDetails : event.eventDetails,
                    'eventImgUrl': url
                  }).then(function() {
                        setDetailLoader(false);
                        setValues({
                          'eventDetails': ''
                        })
                        setPrevUrl("");
                        console.log("Document successfully updated!");
                      })
                      .catch(function(error) {
                      // The document probably doesn't exist.
                      console.error("Error updating document: ", error);
                    });
                });
              }
            );
    }
    else {
      docref.update({
        'eventDetails': values.eventDetails ? values.eventDetails : event.eventDetails
      }).then(function() {
            setDetailLoader(false);
            setValues({
              'eventDetails': ''
            })
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }

  const [organizerLoading, setOrganizerLoader] = React.useState(false);

  const updateOrganizerInfo = e => {
    e.preventDefault();
    setOrganizerLoader(true);
    docref.update({
      'eventEmail': values.eventEmail ? values.eventEmail : event.eventEmail,
      'eventPhone': values.eventPhone ? `${phoneCode}${values.eventPhone}` : event.eventPhone
    }).then(function() {
          setOrganizerLoader(false);
          setValues({
            'eventPhone': '',
            'eventEmail': '',
          })
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  const eventDetailsPane = [
    {
      menuItem: 'Basic Info',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={basicLoading} onSubmit={updateBasicInfo}>
          <Form.Field>
            <label>Event Title</label>
            <input placeholder={event.eventName} name='eventTitle' value={values.eventTitle} onChange={handleChange('eventTitle')}/>
          </Form.Field>
          <Form.Group>
            <Form.Dropdown selection label='Event Category' placeholder={event.eventCategory} value={eventCategory} name='eventCategory' onChange={handleCategory} options={categories}/>
            <Form.Dropdown selection multiple label='Event Type' placeholder={event.eventType} value={eventType} name='eventType' onChange={handleType} options={types}/>
          </Form.Group>
          <Form.Field width={10}>
            <label>Event Organizer</label>
            <input placeholder={event.eventOrganizer} name='eventOrganizer' value={values.eventOrganizer} onChange={handleChange('eventOrganizer')}/>
          </Form.Field>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>,
    },
    {
      menuItem: 'Location',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={locLoading} onSubmit={updateLocationInfo}>
          <Form.Field width={10}>
            <label>Event Venue</label>
            <input placeholder={event.eventVenue} value={values.eventVenue} onChange={handleChange('eventVenue')} name='eventVenue'/>
          </Form.Field>
          <Form.Group>
            <Form.Input label='Street Address 1' placeholder={event.eventStreet1} value={values.eventStreet1} name='eventStreet1' onChange={handleChange('eventStreet1')}/>
            <Form.Input label='Street Address 2' placeholder={event.eventStreet2} value={values.eventStreet2} name='eventStreet2' onChange={handleChange('eventStreet2')}/>
          </Form.Group>
          <Form.Group>
            <Form.Input label='City' placeholder={event.eventCity} value={values.eventCity} name='eventCity' onChange={handleChange('eventCity')}/>
            <Form.Input label='State/Province' placeholder={event.eventProvince} value={values.eventProvince} name='eventProvince' onChange={handleChange('eventProvince')}/>
          </Form.Group>
          <Form.Select label='Country' placeholder={event.eventCountry} width={6} value={eventCountry} name='eventCountry' onChange={handleCountry} options={countries}/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>,
    },
    {
      menuItem: 'Date & Time',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={timeLoading} onSubmit={updateDateTime}>
          <Form.Group>
            <DateInput
              label='Start Date'
              clearable
              name="startDate"
              minDate={"2070-01-31"}
              placeholder={event.startDate}
              dateFormat="ddd Do MMM YYYY"
              value={startDate}
              iconPosition="left"
              onChange={handleStartDateChange}
              hideMobileKeyboard={true}
              closable={true}
            />
            <TimeInput
              label='Start Time'
              clearable
              name="startTime"
              placeholder={event.startTime}
              timeFormat="AMPM"
              value={startTime}
              iconPosition="left"
              onChange={handleStartTimeChange}
              hideMobileKeyboard={true}
              closable={true}
            />
          </Form.Group>
          <Form.Group>
            <DateInput
              label='End Date'
              clearable
              name="endDate"
              placeholder={event.endDate}
              dateFormat="ddd Do MMM YYYY"
              value={endDate}
              iconPosition="left"
              onChange={handleEndDateChange}
              hideMobileKeyboard={true}
              closable={true}
            />
            <TimeInput
              label='End Time'
              clearable
              name="endTime"
              placeholder={event.endTime}
              timeFormat="AMPM"
              value={endTime}
              iconPosition="left"
              onChange={handleEndTimeChange}
              hideMobileKeyboard={true}
              closable={true}
            />
          </Form.Group>
          <Divider hidden/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>,
    },
    {
      menuItem: 'Details',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={detailLoading} onSubmit={updateDetails}>
          <Form.TextArea label='Event Description' placeholder={event.eventDetails} style={{ minHeight: 250 }} value={values.eventDetails} name='eventDetails' onChange={handleChange('eventDetails')}/>
          <Form.Field>
            <label>Change the Main Image for your event</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={prevUrl ? prevUrl : event.eventImgUrl} size='large' rounded/>
          <Divider hidden/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Organizer Info',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={organizerLoading} onSubmit={updateOrganizerInfo}>
          <Form.Group>
            <Form.Field width={7}>
              <label>Organizer Email Address</label>
              <Input placeholder={event.eventEmail} value={values.eventEmail} name='eventEmail' onChange={handleChange('eventEmail')}/>
            </Form.Field>
            <Form.Field width={7}>
              <label>Organizer Phone Number</label>
              <Input label={<Dropdown defaultValue={phoneCode} options={phoneExts} value={phoneCode} onChange={handleCode}/>} labelPosition='left' value={values.eventPhone} placeholder={event.eventPhone} name='eventPhone' onChange={handleChange('eventPhone')}/>
            </Form.Field>
          </Form.Group>
          <Divider hidden/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Tickets',
      render: () =>
      <Tab.Pane attached={false}>

      </Tab.Pane>
    },
  ]

  return (
    <Tab menu={{ fluid: true, borderless: true, secondary: true }} style={{ borderWidth: 0 }} grid={{ tabWidth: 12 }} panes={eventDetailsPane}/>
  );
}
