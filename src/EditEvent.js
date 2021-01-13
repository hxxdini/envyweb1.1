import PropTypes from 'prop-types';
import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import styled from 'styled-components';
import Toolbar from "./containers/EditorToolbar";
import { customStyleFn } from "./containers/EditorToolbar/customStyles";
import {
  Button,
  Divider,
  Image,
  Tab,
  Input,
  Label,
  Form,
  Dropdown,
} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import firebase from './components/Firebase';

import { countryOptions } from './assets/countries';

import { phoneExt } from './assets/phoneExtensions';

const db = firebase.firestore();

EditEvent.propTypes = {
  event: PropTypes.any.isRequired,
}

const EditorWrapper = styled.div`
min-width: 350px;
height: fit-content;
margin-top: 2em;
margin-bottom: 1em;
`;

const EditorContainer = styled.div`
min-height: 15em;
border-radius: 0 0 3px 3px;
background-color: #fff;
padding: 10px;
font-size: 17px;
font-weight: 300;
box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

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
    ticketName: '',
    ticketDetails: '',
    ticketQuantity: 0,
    ticketValue: 0.0,
    });
  const [eventCategory, setCategory] = React.useState();
  const [eventType, setType] = React.useState();
  const [eventCountry, setCountry] = React.useState();
  const [phoneCode, setCode] = React.useState('+237');
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const updateEditorState = (editorState) => {
    setEditorState(editorState);
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  React.useEffect(() => {
    var contentState = convertFromRaw(event.eventDetails);
    setEditorState(EditorState.createWithContent(contentState));
  }, [])

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



  const fileInputRef = React.createRef();

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [salesStartDate, setSalesStartDate] = React.useState('');
  const [salesStartTime, setSalesStartTime] = React.useState('');
  const [salesEndDate, setSalesEndDate] = React.useState('');
  const [salesEndTime, setSalesEndTime] = React.useState('');

  const handleSalesStartDateChange = (event, {value}) => {
    setSalesStartDate(value);
  }

  const handleSalesEndDateChange = (event, {value}) => {
    setSalesEndDate(value);
  }

  const handleSalesStartTimeChange = (event, {value}) => {
    setSalesStartTime(value);
  }

  const handleSalesEndTimeChange = (event, {value}) => {
    setSalesEndTime(value);
  }

  const handleStartDateChange = (event, {value}) => {
      setStartDate(value);
  }
  const handleEndDateChange = (event, {value}) => {
      setEndDate(value);
  }
  const handleStartTimeChange = (event, {value}) => {
      setStartTime(value);
  }
  const handleEndTimeChange = (event, {value}) => {
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

  const [currencyCode, setCurrencyCode] = React.useState('USD');

  const handleCurrency = (e, {value}) => {
    setCurrencyCode(value);
  }

  const currency = [
    {key: 'XAF', text: 'XAF', value: 'XAF'},
    {key: 'USD', text: '$', value: 'USD'},
  ]

  const categories = [
    {key: 'Sports', text: 'Sports', value: 'Sports'},
    {key: 'Music', text: 'Music', value: 'Music'},
    {key: 'Visual Arts', text: 'Visual Arts', value: 'Visual Arts'},
    {key: 'Performing Arts', text: 'Performing Arts', value: 'Performing Arts'},
    {key: 'Movie', text: 'Movie', value: 'Movie'},
    {key: 'Fashion', text: 'Fashion', value: 'Fashion'},
    {key: 'Festivals & Fairs', text: 'Festivals & Fairs', value: 'Festivals & Fairs'},
    {key: 'Charities', text: 'Charities', value: 'Charities'},
    {key: 'Kids & Family', text: 'Kids & Family', value: 'Kids & Family'},
    {key: 'Party', text: 'Party', value: 'Party'},
    {key: 'Business', text: 'Business', value: 'Business'},
    {key: 'Education', text: 'Education', value: 'Education'},
  ]

  const types = [
    {key: 'Indoors', text: 'Indoors', value: 'Indoors'},
    {key: 'Chillout', text: 'Chillout', value: 'Chillout'},
    {key: 'Nightlife', text: 'Nightlife', value: 'Nightlife'},
    {key: 'Reunion', text: 'Reunion', value: 'Reunion'},
    {key: 'Workshops', text: 'Workshops', value: 'Workshops'},
    {key: 'Casual', text: 'Casual', value: 'Casual'},
    {key: 'Conference', text: 'Conference', value: 'Conference'},
  ]

  const [loading, setLoader] = React.useState(false);

  const updateBasicInfo = e => {
    e.preventDefault();
    setLoader(true);
    docref.update({
      'eventName': values.eventTitle ? values.eventTitle : event.eventName,
      'eventCategory': eventCategory ? eventCategory : event.eventCategory,
      'eventType': eventType ? eventType : event.eventType,
      'eventOrganizer': values.eventOrganizer ? values.eventOrganizer : event.eventOrganizer
    })
    .then(function() {
      setLoader(false);
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

  const updateLocationInfo = e => {
    e.preventDefault();
    setLoader(true);
    docref.update({
      'eventVenue': values.eventVenue ? values.eventVenue : event.eventVenue,
      'eventStreet1': values.eventStreet1 ? values.eventStreet1 : event.eventStreet1,
      'eventStreet2': values.eventStreet2 ? values.eventStreet2 : event.eventStreet2,
      'eventCity': values.eventCity ? values.eventCity : event.eventCity,
      'eventProvince': values.eventProvince ? values.eventProvince : event.eventProvince,
      'eventCountry': eventCountry ? eventCountry : event.eventCountry
    }).then(function() {
          setLoader(false);
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


  const updateDateTime = e => {
    e.preventDefault();
    setLoader(true);
    docref.update({
       'startDate': startDate ? startDate : event.startDate,
       'formattedStartDate': new Date(`${startDate} ${startTime}`),
       'startTime': startTime ? startTime : event.startTime,
       'endDate': endDate ? endDate : event.endDate,
       'formattedEndDate': new Date(`${endDate} ${endTime}`),
       'endTime': endTime ? endTime : event.endTime
    }).then(function() {
          setLoader(false);
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

  const updateDetails = e => {
    e.preventDefault();
    setLoader(true);
      docref.update({
        'eventDetails': convertToRaw(editorState.getCurrentContent())
      }).then(function() {
            setLoader(false);
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

  const updateImage = e => {
    e.preventDefault();
    setLoader(true);
    if (eventImage) {
      const uploadImage = storage.child(`EventImages/${event.eventName}`).put(eventImage);
      uploadImage.on('state_changed',
      () => {

      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadImage.snapshot.ref.getDownloadURL().then((url) => {
          docref.update({
            eventImgUrl: url
          }).then(() => {
            setLoader(false);
            setPrevUrl('');
          })
        })
      }
    )
    }
  }

  const updateOrganizerInfo = e => {
    e.preventDefault();
    setLoader(true);
    docref.update({
      'eventEmail': values.eventEmail ? values.eventEmail : event.eventEmail,
      'eventPhone': values.eventPhone ? `${phoneCode}${values.eventPhone}` : event.eventPhone
    }).then(function() {
          setLoader(false);
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

  const createTicket = e => {
    e.preventDefault();
    const ticketRef = docref.collection('tickets').doc();
    const batch = db.batch();
    setLoader(true);
    batch.set(ticketRef, {
      ticketName: values.ticketName,
      ticketQuantity: parseInt(values.ticketQuantity),
      initialTicketQty: parseInt(values.ticketQuantity),
      ticketValue: parseInt(values.ticketValue),
      ticketCurrency: currencyCode,
      ticketDetails: values.ticketDetails,
      ticketSaleStartDate: salesStartDate,
      ticketSaleEndDate: salesEndDate,
      ticketSaleStartTime: salesStartTime,
      ticketSaleEndTime: salesEndTime,
      formattedticketSaleStartDate: new Date(`${salesStartDate} ${salesStartTime}`),
      formattedticketSaleEndDate: new Date(`${salesEndDate} ${salesEndTime}`),
      ticketUID: ticketRef.id
    });
    batch.commit().then(() => {
      setLoader(false);
        setValues({
          ticketName: '',
          ticketQuantity: 0,
          ticketValue: 0,
          ticketDetails: '',
        });
        setSalesStartDate('');
        setSalesEndDate('');
        setSalesStartTime('');
        setSalesEndTime('');
    })
  }

  const eventDetailsPane = [
    {
      menuItem: 'Basic Info',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={loading} onSubmit={updateBasicInfo}>
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
        <Form loading={loading} onSubmit={updateLocationInfo}>
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
          <Form.Select label='Country' placeholder={event.eventCountry} width={6} value={eventCountry} name='eventCountry' onChange={handleCountry} options={countryOptions}/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>,
    },
    {
      menuItem: 'Date & Time',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={loading} onSubmit={updateDateTime}>
          <Form.Group>
            <DateInput
              label='Start Date'
              clearable
              name="startDate"
              minDate={"2070-01-31"}
              placeholder={event.startDate}
              dateFormat="dddd, DD MMMM YYYY"
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
              dateFormat="dddd, DD MMMM YYYY"
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
        <Form loading={loading} onSubmit={updateDetails}>
          <EditorWrapper>
            <Toolbar editorState={editorState} updateEditorState={updateEditorState}/>

            <EditorContainer>
              <Editor placeholder='' editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} customStyleFn={customStyleFn}/>
            </EditorContainer>
          </EditorWrapper>
          <Divider hidden/>
          <Form.Button primary content='Update Info' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Event Image',
      render: () =>
      <Tab.Pane>
        <Form loading={loading} onSubmit={updateImage}>
          <Form.Field>
            <label>Change the Main Image for your event</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={prevUrl ? prevUrl : event.eventImgUrl} size='large' rounded/>
          <Divider hidden/>
          <Form.Button primary content='Update Image' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Organizer Info',
      render: () =>
      <Tab.Pane attached={false}>
        <Form loading={loading} onSubmit={updateOrganizerInfo}>
          <Form.Group>
            <Form.Field width={7}>
              <label>Organizer Email Address</label>
              <Input placeholder={event.eventEmail} value={values.eventEmail} name='eventEmail' onChange={handleChange('eventEmail')}/>
            </Form.Field>
            <Form.Field width={7}>
              <label>Organizer Phone Number</label>
              <Input label={<Dropdown search inline defaultValue={phoneCode} options={phoneExt} value={phoneCode} onChange={handleCode}/>} labelPosition='left' value={values.eventPhone} placeholder={event.eventPhone} name='eventPhone' onChange={handleChange('eventPhone')}/>
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
        <Form loading={loading} onSubmit={createTicket}>
          <Form.Group>
            <Form.Field>
              <label>Ticket Name</label>
              <Input placeholder='Enter Ticket Name' value={values.ticketName} name='ticketName' onChange={handleChange('ticketName')}/>
            </Form.Field>
            <Form.Field>
              <label>Ticket Quantity</label>
              <Input placeholder='Enter Quantity available' type='number' min='0' value={values.ticketQuantity} name='ticketQuantity' onChange={handleChange('ticketQuantity')}/>
            </Form.Field>
          </Form.Group>
          <Form.Field width={6}>
            <label>Price</label>
            <Input labelPosition='left' value={values.ticketValue} name='ticketValue' min='0' onChange={handleChange('ticketValue')}><Label><Dropdown options={currency} value={currencyCode} onChange={handleCurrency}/></Label><input/><Label>.00</Label></Input>
          </Form.Field>
          <Form.Group>
            <Form.Field>
              <DateInput
                label='Sales Start Date'
                clearable
                name="startDate"
                minDate={"2070-01-31"}
                // placeholder={event.startDate}
                dateFormat="dddd, DD MMMM YYYY"
                value={salesStartDate}
                iconPosition="left"
                onChange={handleSalesStartDateChange}
                hideMobileKeyboard={true}
                closable={true}
              />
            </Form.Field>
            <Form.Field>
              <TimeInput
                label='Sales Start Time'
                clearable
                name="endTime"
                // placeholder={event.endTime}
                timeFormat="AMPM"
                value={salesStartTime}
                iconPosition="left"
                onChange={handleSalesStartTimeChange}
                hideMobileKeyboard={true}
                closable={true}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <DateInput
                label='Sales End Date'
                clearable
                name="startDate"
                minDate={"2070-01-31"}
                // placeholder={event.startDate}
                dateFormat="dddd, DD MMMM YYYY"
                value={salesEndDate}
                iconPosition="left"
                onChange={handleSalesEndDateChange}
                hideMobileKeyboard={true}
                closable={true}
              />
            </Form.Field>
            <Form.Field>
              <TimeInput
                label='Sales End Time'
                clearable
                name="endTime"
                // placeholder={event.endTime}
                timeFormat="AMPM"
                value={salesEndTime}
                iconPosition="left"
                onChange={handleSalesEndTimeChange}
                hideMobileKeyboard={true}
                closable={true}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <Form.TextArea label='Ticket Details' placeholder='Describe what this ticket entails to a potential client' name='ticketDetails' value={values.ticketDetails} onChange={handleChange('ticketDetails')} style={{ minHeight: 250 }}/>
          </Form.Field>
          <Form.Button primary content='Create Ticket' type='submit'/>
        </Form>
      </Tab.Pane>
    },
  ]

  return (
    <Tab menu={{ fluid: true, borderless: true, secondary: true }} style={{ borderWidth: 0 }} grid={{ tabWidth: 12 }} panes={eventDetailsPane}/>
  );
}
