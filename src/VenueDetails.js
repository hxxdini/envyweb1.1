import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
  Dimmer,
  Loader,
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
  Table,
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
const storage = firebase.storage().ref();

VenueDetails.propTypes = {
  venue: PropTypes.any.isRequired,
}

export function VenueDetails(props) {
  const {venue} = props
  return(
    venue.map(ven=>(<EditVenue venue={ven}/>))
  );
}

EditVenue.propTypes = {
  venue: PropTypes.any.isRequired,
}

function EditVenue(props) {
  const {venue} = props
  const docRef = firebase.firestore().collection("Venues").doc(venue.uid);
  const fileInputRef = React.createRef();
  const [values, setValues] = React.useState({
    venueName: '',
    venueStreet1: '',
    venueStreet2: '',
    venueCity: '',
    venueProvince: '',
    venueDetails: '',
  });
  const [venueCategory, setCategory] = React.useState();
  const [venueSpeciality, setSpeciality] = React.useState();
  const [venueCountry, setCountry] = React.useState();
  const [venueImage, setImage] = React.useState();
  const [prevUrl, setPrevUrl] = React.useState();
  const [openDays, setOpenDays] = React.useState('');
  const [expDays, setExpDays] = React.useState('');
  const [fromTime1, setFromTime1] = React.useState('');
  const [fromTime2, setFromTime2] = React.useState('');
  const [toTime1, setToTime1] = React.useState('');
  const [toTime2, setToTime2] = React.useState('');
  const [phoneCode, setCode] = React.useState('+237');
  const handleOpenDays = (e, {value}) => {
    setOpenDays(value);
  }
  const handleExpDays = (e, {value}) => {
    setExpDays(value);
  }
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
  const handleCode = (e, {value}) => {
    setCode(value);
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
  const country = [
    {key: 'Cameroon', text: 'Cameroon', value: 'Cameroon'},
  ]
  const phoneExt = [
    {key: '+237', text: '+237', value: '+237'}
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
  const handleCategory = (e, {value}) => {
    setCategory(value);
  }
  const handleSpeciality = (e, {value}) => {
    setSpeciality(value);
  }
  const handleCountry = (e, {value}) => {
    setCountry(value);
  }

  const [idLoader, setIdLoader] = React.useState(false);
  const [locLoader, setLocLoader] = React.useState(false);
  const [detailLoader, setDetailLoader] = React.useState(false);
  const [contactLoader, setContactLoader] = React.useState(false);

  const updateIdentity = e => {
    e.preventDefault();
    setIdLoader(true);
    docRef.update({
      'venueName': values.venueName ? values.venueName : venue.venueName,
      'venueCategory': venueCategory ? venueCategory : venue.venueCategory,
      'venueSpeciality': venueSpeciality ? venueSpeciality : venue.venueSpeciality
    }).then(function() {
      setIdLoader(false);
      setValues({
        'venueName': ''
      });
      setCategory('');
      setSpeciality('');
    })
  }
  const updateLocation = e => {
    e.preventDefault();
    setLocLoader(true);
    docRef.update({
      'venueStreet1': values.venueStreet1 ? values.venueStreet1 : venue.venueStreet1,
      'venueStreet2': values.venueStreet2 ? values.venueStreet2 : venue.venueStreet2,
      'venueCity': values.venueCity ? values.venueCity : venue.venueCity,
      'venueProvince': values.venueProvince ? values.venueProvince : venue.venueProvince,
      'venueCountry': venueCountry ? venueCountry : venue.venueCountry
    }).then(function() {
      setLocLoader(false);
      setValues({
        'venueStreet1': '',
        'venueStreet2': '',
        'venueCity': '',
        'venueProvince': '',
      });
      setCountry('');
    })
  }
  const updateDetails = e => {
    e.preventDefault();
    if (venueImage) {
      const uploadImage = storage.child(`VenueImages/${venue.venueName}`).put(venueImage);
      uploadImage.on('state_changed',
      (snapshot) => {
        setDetailLoader(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadImage.snapshot.ref.getDownloadURL().then((url) => {
          docRef.update({
            'venueDetails': values.venueDetails ? values.venueDetails : venue.venueDetails,
            'openDays': openDays ? openDays : venue.openDays,
            'expDays': expDays ? expDays : venue.expDays,
            'openTime1': fromTime1 ? fromTime1 : venue.openTime1,
            'closeTime1': toTime1 ? toTime1 : venue.closeTime1,
            'openTime2': fromTime2 ? fromTime2 : venue.openTime2,
            'closeTime2': toTime2 ? toTime2 : venue.closeTime2,
            'venueImgUrl': url
          }).then(function() {
            setDetailLoader(false);
            setValues({
              'venueDetails': ''
            });
            setPrevUrl('');
          })
        })
      }
    )
  }
    else {
      setDetailLoader(true);
      docRef.update({
        'venueDetails': values.venueDetails ? values.venueDetails : venue.venueDetails,
        'openDays': openDays ? openDays : venue.openDays,
        'expDays': expDays ? expDays : venue.expDays,
        'openTime1': fromTime1 ? fromTime1 : venue.openTime1,
        'closeTime1': toTime1 ? toTime1 : venue.closeTime1,
        'openTime2': fromTime2 ? fromTime2 : venue.openTime2,
        'closeTime2': toTime2 ? toTime2 : venue.closeTime2
      }).then(function() {
        setDetailLoader(false);
        setValues({
          'venueDetails': ''
        })
      })
    }
  }
  const updateContact = e => {
    e.preventDefault();
    setContactLoader(true);
    docRef.update({
      'venueEmail': values.venueEmail ? values.venueEmail : venue.venueEmail,
      'venuePhone': values.venuePhone ? `${phoneCode}${values.venuePhone}` : venue.venuePhone
    }).then(function() {
      setContactLoader(false);
      setValues({
        'venueEmail': '',
        'venuePhone': ''
      })
    })
  }
  const venueDetailsPane = [
    {
      menuItem: 'Identification',
      render: () =>
      <Tab.Pane>
        <Form loading={idLoader} onSubmit={updateIdentity}>
          <Form.Field width={12}>
            <label>Venue Name</label>
            <input placeholder={venue.venueName} name='venueName' value={values.venueName} onChange={handleChange('venueName')}/>
          </Form.Field>
          <Form.Group>
            <Form.Dropdown selection label='Venue Category' placeholder={venue.venueCategory} required value={venueCategory} onChange={handleCategory} options={category} clearable/>
            <Form.Dropdown selection multiple label='Venue Specialities' placeholder={venue.venueSpeciality} required value={venueSpeciality} onChange={handleSpeciality} options={speciality} clearable/>
          </Form.Group>
          <Form.Button primary content='Update Info' type='submit'/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Location',
      render: () =>
      <Tab.Pane>
        <Form loading={locLoader} onSubmit={updateLocation}>
          <Form.Group>
            <Form.Input label='Street Address 1' placeholder={venue.venueStreet1} name='venueStreet1' value={values.venueStreet1} onChange={handleChange('venueStreet1')}/>
            <Form.Input label='Street Address 2' placeholder={venue.venueStreet2 ? venue.venueStreet2 : 'Address 2'} name='venueStreet2' value={values.venueStreet2} onChange={handleChange('venueStreet2')}/>
          </Form.Group>
          <Form.Group>
            <Form.Input label='City' placeholder={venue.venueCity} name='venueCity' value={values.venueCity} onChange={handleChange('venueCity')}/>
            <Form.Input label='State/Province' placeholder={venue.venueProvince} name='venueProvince' value={values.venueProvince} onChange={handleChange('venueProvince')}/>
          </Form.Group>
          <Form.Select label='Country' placeholder={venue.venueCountry} width={6} name='venueCountry' value={venueCountry} onChange={handleCountry} options={country}/>
          <Form.Button primary content='Update Info' type='submit'/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Details',
      render: () =>
      <Tab.Pane>
        <Form loading={detailLoader} onSubmit={updateDetails}>
          <Form.TextArea label='Description' placeholder={venue.venueDetails} style={{ minHeight: 250 }} name='venueDetails' value={values.venueDetails} onChange={handleChange('venueDetails')}/>
          <Form.Field required>
            <label>Choose the Main Image for your venue</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={venue.venueImgUrl ? venue.venueImgUrl : prevUrl} size='large' rounded/>
          <Divider hidden/>
          <Form.Group>
            <Form.Dropdown selection multiple label='Opening Days' placeholder={venue.openDays} name='openDays' value={openDays} onChange={handleOpenDays} options={days}/>
            <TimeInput
              label='Opening Time'
              name='openingTime'
              placeholder={venue.openTime1}
              timeFormat="AMPM"
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={fromTime1}
              onChange={handleFromTime1}
            />
            <TimeInput
              label='Closing Time'
              name='closingTime'
              placeholder={venue.closeTime1}
              timeFormat="AMPM"
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
            <Form.Dropdown selection multiple label='Exceptional Opening Days' placeholder={venue.expDays} name='expDays' value={expDays} onChange={handleExpDays} options={days}/>
            <TimeInput
              label='Opening Time'
              name='expOpeningTime'
              placeholder={venue.openTime2}
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
              placeholder={venue.closeTime2}
              timeFormat="AMPM"
              hideMobileKeyboard={true}
              closable={true}
              iconPosition="left"
              value={toTime2}
              onChange={handleToTime2}
            />
          </Form.Group>
          <Form.Button primary content='Update Info' type='submit'/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Contact',
      render: () =>
      <Tab.Pane>
        <Form loading={contactLoader} onSubmit={updateContact}>
          <Form.Group>
            <Form.Field width={7}>
              <label>Venue Email Address</label>
              <Input placeholder={venue.venueEmail} name='venueEmail' value={values.venueEmail} onChange={handleChange('venueEmail')}/>
            </Form.Field>
            <Form.Field width={7}>
              <label>Venue Phone Number</label>
              <Input placeholder={venue.venuePhone} label={<Dropdown defaultValue={phoneCode} options={phoneExt} value={phoneCode} onChange={handleCode}/>} labelPosition='left' name='venuePhone' value={values.venuePhone} onChange={handleChange('venuePhone')}/>
            </Form.Field>
          </Form.Group>
          <Form.Button primary content='Update Info' type='submit'/>
        </Form>
      </Tab.Pane>
    },
  ]

  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={venueDetailsPane}/>
  );
}
