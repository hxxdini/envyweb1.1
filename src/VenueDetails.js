import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import styled from 'styled-components';
import Toolbar from "./containers/EditorToolbar";
import { customStyleFn } from "./containers/EditorToolbar/customStyles";
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
  venue: PropTypes.array.isRequired,
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

export function VenueDetails(props) {
  const {venue} = props;
  return(
    // venue.map(ven=>(<EditVenue venue={ven}/>))
    <EditVenue venue={venue}/>
  );
}

EditVenue.propTypes = {
  venue: PropTypes.array.isRequired,
}

function EditVenue(props) {
  const {venue} = props
  // const docRef = db.collection("Venues").doc(venue.uid);
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

  const getEditorState = async () => {
    console.log(venue.venueDetails);
    // console.log(convertFromRaw(venue.venueDetails));
    // const contentState = await convertFromRaw(venue.venueDetails);
    // setEditorState(EditorState.createWithContent(contentState))
  }

  React.useEffect(() => {
    if (venue !== undefined) {
      getEditorState();
    }
    // console.log(venue.venueDetails);
  }, [venue])

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
    {key: 'Snackbar/Pub', text: 'Snackbar/Pub', value: 'Snackbar/Pub'},
    {key: 'Brewery/Winery', text: 'Brewery/Winery', value: 'Brewery/Winery'},
    {key: 'Restaurant', text: 'Restaurant', value: 'Restaurant'},
    {key: 'Cinema', text: 'Cinema', value: 'Cinema'},
    {key: 'Theater', text: 'Theater', value: 'Theater'},
    {key: 'Nightclub', text: 'Nightclub', value: 'Nightclub'},
    {key: 'Art Gallery', text: 'Art Gallery', value: 'Art Gallery'},
    {key: 'Stadium/Arena', text: 'Stadium/Arena', value: 'Stadium/Arena'},
    {key: 'Business Center', text: 'Business Center', value: 'Business Center'},
  ]

  const speciality = [
    {key: '#Grill', text: '#Grill', value: '#Grill'},
    {key: '#Liquor', text: '#Liquor', value: '#Liquor'},
    {key: '#Brew', text: '#Brew', value: '#Brew'},
    {key: '#Barbecue', text: '#Barbecue', value: '#Barbecue'},
    {key: '#Cocktails', text: '#Cocktails', value: '#Cocktails'},
    {key: '#Discoclub', text: '#Discoclub', value: '#Discoclub'},
    {key: '#Afrobeats', text: '#Afrobeats', value: '#Afrobeats'},
    {key: '#HipHopRap', text: '#HipHopRap', value: '#HipHopRap'},
    {key: '#Naija', text: '#Naija', value: '#Naija'},
    {key: '#Movies', text: '#Movies', value: '#Movies'},
    {key: '#SketchDrama', text: '#SketchDrama', value: '#SketchDrama'},
    {key: '#AfricanMeals', text: '#AfricanMeals', value: '#AfricanMeals'},
    {key: '#EuropeanMeals', text: '#EuropeanMeals', value: '#EuropeanMeals'},
    {key: '#AsianMeals', text: '#AsianMeals', value: '#AsianMeals'},
  ]
  const country = [
    { key: 'af', value: 'Afghanistan', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'Aland Islands', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'Albania', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'Algeria', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'American Samoa', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'Andorra', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'Angola', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'Anguilla', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'Antigua', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'Argentina', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'Armenia', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'Aruba', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'Australia', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'Austria', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'Azerbaijan', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'Bahamas', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'Bahrain', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'Bangladesh', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'Barbados', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'Belarus', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'Belgium', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'Belize', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'Benin', flag: 'bj', text: 'Benin' },
    { key: 'bm', value: 'Bermuda', flag: 'bm', text: 'Bermuda' },
    { key: 'bt', value: 'Bhutan', flag: 'bt', text: 'Bhutan' },
    { key: 'bo', value: 'Bolivia', flag: 'bo', text: 'Bolivia' },
    { key: 'ba', value: 'Bosnia', flag: 'ba', text: 'Bosnia' },
    { key: 'bw', value: 'Botswana', flag: 'bw', text: 'Botswana' },
    { key: 'br', value: 'Brazil', flag: 'br', text: 'Brazil' },
    { key: 'bg', value: 'Bulgaria', flag: 'bg', text: 'Bulgaria' },
    { key: 'bf', value: 'Burkina Faso', flag: 'bf', text: 'Burkina Faso' },
    { key: 'bi', value: 'Burundi', flag: 'bi', text: 'Burundi' },
    { key: 'tc', value: 'Caicos Islands', flag: 'tc', text: 'Caicos Islands' },
    { key: 'kh', value: 'Cambodia', flag: 'kh', text: 'Cambodia' },
    { key: 'cm', value: 'Cameroon', flag: 'cm', text: 'Cameroon' },
    { key: 'ca', value: 'Canada', flag: 'ca', text: 'Canada' },
    { key: 'cv', value: 'Cape Verde', flag: 'cv', text: 'Cape Verde' },
    { key: 'ky', value: 'Cayman Islands', flag: 'ky', text: 'Cayman Islands' },
    { key: 'cf', value: 'Central African Republic', flag: 'cf', text: 'Central African Republic' },
    { key: 'td', value: 'Chad', flag: 'td', text: 'Chad' },
    { key: 'cl', value: 'Chile', flag: 'cl', text: 'Chile' },
    { key: 'cn', value: 'China', flag: 'cn', text: 'China' },
    { key: 'co', value: 'Colombia', flag: 'co', text: 'Colombia' },
    { key: 'km', value: 'Comoros', flag: 'km', text: 'Comoros' },
    { key: 'cd', value: 'Congo', flag: 'cd', text: 'Congo' },
    { key: 'cg', value: 'Congo Brazzaville', flag: 'cg', text: 'Congo Brazzaville' },
    { key: 'cr', value: 'Costa Rica', flag: 'cr', text: 'Costa Rica' },
    { key: 'ci', value: "Cote D'Ivoire", flag: 'ci', text: "Cote D'Ivoire" },
    { key: 'hr', value: 'Croatia', flag: 'hr', text: 'Croatia' },
    { key: 'cu', value: 'Cuba', flag: 'cu', text: 'Cuba' },
    { key: 'cy', value: 'Cyprus', flag: 'cy', text: 'Cyprus' },
    { key: 'cz', value: 'Czech Republic', flag: 'cz', text: 'Czech Republic' },
    { key: 'dk', value: 'Denmark', flag: 'dk', text: 'Denmark' },
    { key: 'dj', value: 'Djibouti', flag: 'dj', text: 'Djibouti' },
    { key: 'do', value: 'Dominican Republic', flag: 'do', text: 'Dominican Republic' },
    { key: 'eu', value: 'Ecuador', flag: 'ec', text: 'Ecuador' },
    { key: 'eg', value: 'Egypt', flag: 'eg', text: 'Egypt' },
    { key: 'sv', value: 'El Salvador', flag: 'sv', text: 'El Salvador' },
    { key: 'gq', value: 'Equatorial Guinea', flag: 'gq', text: 'Equatorial Guinea' },
    { key: 'ee', value: 'Estonia', flag: 'ee', text: 'Estonia' },
    { key: 'er', value: 'Eritrea', flag: 'er', text: 'Eritrea' },
    { key: 'et', value: 'Ethiopia', flag: 'et', text: 'Ethiopia' },
    { key: 'fo', value: 'Faroe Islands', flag: 'fo', text: 'Faroe Islands' },
    { key: 'fj', value: 'Fiji', flag: 'fj', text: 'Fiji' },
    { key: 'fi', value: 'Finland', flag: 'fi', text: 'Finland' },
    { key: 'fr', value: 'France', flag: 'fr', text: 'France' },
    { key: 'gf', value: 'French Guiana', flag: 'gf', text: 'French Guiana' },
    { key: 'pf', value: 'French Polynesia', flag: 'pf', text: 'French Polynesia' },
    { key: 'tf', value: 'French Territories', flag: 'tf', text: 'French Territories' },
    { key: 'ga', value: 'Gabon', flag: 'ga', text: 'Gabon' },
    { key: 'gm', value: 'Gambia', flag: 'gm', text: 'Gambia' },
    { key: 'ge', value: 'Georgia', flag: 'ge', text: 'Georgia' },
    { key: 'de', value: 'Germany', flag: 'de', text: 'Germany' },
    { key: 'gh', value: 'Ghana', flag: 'gh', text: 'Ghana' },
    { key: 'gr', value: 'Greece', flag: 'gr', text: 'Greece' },
    { key: 'gl', value: 'Greenland', flag: 'gl', text: 'Greenland' },
    { key: 'gd', value: 'Grenada', flag: 'gd', text: 'Grenada' },
    { key: 'gp', value: 'Guadeloupe', flag: 'gp', text: 'Guadeloupe' },
    { key: 'gt', value: 'Guatemala', flag: 'gt', text: 'Guatemala' },
    { key: 'gn', value: 'Guinea', flag: 'gn', text: 'Guinea' },
    { key: 'gw', value: 'Guinea-Bissau', flag: 'gw', text: 'Guinea-Bissau' },
    { key: 'gy', value: 'Guyana', flag: 'gy', text: 'Guyana' },
    { key: 'ht', value: 'Haiti', flag: 'ht', text: 'Haiti' },
    { key: 'hn', value: 'Honduras', flag: 'hn', text: 'Honduras' },
    { key: 'hk', value: 'Hong Kong', flag: 'hk', text: 'Hong Kong' },
    { key: 'hu', value: 'Hungary', flag: 'hu', text: 'Hungary' },
    { key: 'is', value: 'Iceland', flag: 'is', text: 'Iceland' },
    { key: 'in', value: 'India', flag: 'in', text: 'India' },
    { key: 'id', value: 'Indonesia', flag: 'id', text: 'Indonesia' },
    { key: 'ir', value: 'Iran', flag: 'ir', text: 'Iran' },
    { key: 'iq', value: 'Iraq', flag: 'iq', text: 'Iraq' },
    { key: 'ie', value: 'Ireland', flag: 'ie', text: 'Ireland' },
    { key: 'il', value: 'Israel', flag: 'il', text: 'Israel' },
    { key: 'il', value: 'Italy', flag: 'it', text: 'Italy' },
    { key: 'jm', value: 'Jamaica', flag: 'jm', text: 'Jamaica' },
    { key: 'jp', value: 'Japan', flag: 'jp', text: 'Japan' },
    { key: 'jo', value: 'Jordan', flag: 'jo', text: 'Jordan' },
    { key: 'kz', value: 'Kazakhstan', flag: 'kz', text: 'Kazakhstan' },
    { key: 'ke', value: 'Kenya', flag: 'ke', text: 'Kenya' },
    { key: 'kw', value: 'Kuwait', flag: 'kw', text: 'Kuwait' },
    { key: 'lv', value: 'Latvia', flag: 'lv', text: 'Latvia' },
    { key: 'lb', value: 'Lebanon', flag: 'lb', text: 'Lebanon' },
    { key: 'ls', value: 'Lesotho', flag: 'ls', text: 'Lesotho' },
    { key: 'lr', value: 'Liberia', flag: 'lr', text: 'Liberia' },
    { key: 'ly', value: 'Libya', flag: 'ly', text: 'Libya' },
    { key: 'li', value: 'Liechtenstein', flag: 'li', text: 'Liechtenstein' },
    { key: 'lt', value: 'Lithuania', flag: 'lt', text: 'Lithuania' },
    { key: 'lu', value: 'Luxembourg', flag: 'lu', text: 'Luxembourg' },
    { key: 'mk', value: 'Macedonia', flag: 'mk', text: 'Macedonia' },
    { key: 'mg', value: 'Madagascar', flag: 'mg', text: 'Madagascar' },
    { key: 'mw', value: 'Malawi', flag: 'mw', text: 'Malawi' },
    { key: 'my', value: 'Malaysia', flag: 'my', text: 'Malaysia' },
    { key: 'mv', value: 'Maldives', flag: 'mv', text: 'Maldives' },
    { key: 'ml', value: 'Mali', flag: 'ml', text: 'Mali' },
    { key: 'mt', value: 'Malta', flag: 'mt', text: 'Malta' },
    { key: 'mq', value: 'Martinique', flag: 'mq', text: 'Martinique' },
    { key: 'mr', value: 'Mauritania', flag: 'mr', text: 'Mauritania' },
    { key: 'mu', value: 'Mauritius', flag: 'mu', text: 'Mauritius' },
    { key: 'mx', value: 'Mexico', flag: 'mx', text: 'Mexico' },
    { key: 'md', value: 'Moldova', flag: 'md', text: 'Moldova' },
    { key: 'mc', value: 'Monaco', flag: 'mc', text: 'Monaco' },
    { key: 'mn', value: 'Mongolia', flag: 'mn', text: 'Mongolia' },
    { key: 'me', value: 'Montenegro', flag: 'me', text: 'Montenegro' },
    { key: 'ma', value: 'Morocco', flag: 'ma', text: 'Morocco' },
    { key: 'mz', value: 'Mozambique', flag: 'mz', text: 'Mozambique' },
    { key: 'na', value: 'Namibia', flag: 'na', text: 'Namibia' },
    { key: 'np', value: 'Nepal', flag: 'np', text: 'Nepal' },
    { key: 'nl', value: 'Netherlands', flag: 'nl', text: 'Netherlands' },
    { key: 'pg', value: 'New Guinea', flag: 'pg', text: 'New Guinea' },
    { key: 'nz', value: 'New Zealand', flag: 'nz', text: 'New Zealand' },
    { key: 'ni', value: 'Nicaragua', flag: 'ni', text: 'Nicaragua' },
    { key: 'ne', value: 'Niger', flag: 'ne', text: 'Niger' },
    { key: 'ng', value: 'Nigeria', flag: 'ng', text: 'Nigeria' },
    { key: 'kp', value: 'North Korea', flag: 'kp', text: 'North Korea' },
    { key: 'no', value: 'Norway', flag: 'no', text: 'Norway' },
    { key: 'pk', value: 'Pakistan', flag: 'pk', text: 'Pakistan' },
    { key: 'ps', value: 'Palestine', flag: 'ps', text: 'Palestine' },
    { key: 'pa', value: 'Panama', flag: 'pa', text: 'Panama' },
    { key: 'py', value: 'Paraguay', flag: 'py', text: 'Paraguay' },
    { key: 'py', value: 'Paraguay', flag: 'py', text: 'Paraguay' },
    { key: 'pe', value: 'Peru', flag: 'pe', text: 'Peru' },
    { key: 'ph', value: 'Philippines', flag: 'ph', text: 'Philippines' },
    { key: 'pl', value: 'Poland', flag: 'pl', text: 'Poland' },
    { key: 'pt', value: 'Portugal', flag: 'pt', text: 'Portugal' },
    { key: 'pr', value: 'Puerto Rico', flag: 'pr', text: 'Puerto Rico' },
    { key: 'qa', value: 'Qatar', flag: 'qa', text: 'Qatar' },
    { key: 'ro', value: 'Romania', flag: 'ro', text: 'Romania' },
    { key: 'ru', value: 'Russia', flag: 'ru', text: 'Russia' },
    { key: 'rw', value: 'Rwanda', flag: 'rw', text: 'Rwanda' },
    { key: 'ws', value: 'Samoa', flag: 'ws', text: 'Samoa' },
    { key: 'st', value: 'Sao Tome', flag: 'st', text: 'Sao Tome' },
    { key: 'sa', value: 'Saudi Arabia', flag: 'sa', text: 'Saudi Arabia' },
    { key: 'gb sct', value: 'Scotland', flag: 'gb sct', text: 'Scotland' },
    { key: 'sn', value: 'Senegal', flag: 'sn', text: 'Senegal' },
    { key: 'cs', value: 'Serbia', flag: 'cs', text: 'Serbia' },
    { key: 'sc', value: 'Seychelles', flag: 'sc', text: 'Seychelles' },
    { key: 'sl', value: 'Sierra Leone', flag: 'sl', text: 'Sierra Leone' },
    { key: 'sg', value: 'Singapore', flag: 'sg', text: 'Singapore' },
    { key: 'sk', value: 'Slovakia', flag: 'sk', text: 'Slovakia' },
    { key: 'si', value: 'Slovenia', flag: 'si', text: 'Slovenia' },
    { key: 'so', value: 'Somalia', flag: 'so', text: 'Somalia' },
    { key: 'za', value: 'South Africa', flag: 'za', text: 'South Africa' },
    { key: 'kr', value: 'South Korea', flag: 'kr', text: 'South Korea' },
    { key: 'es', value: 'Spain', flag: 'es', text: 'Spain' },
    { key: 'lk', value: 'Sri Lanka', flag: 'lk', text: 'Sri Lanka' },
    { key: 'sd', value: 'Sudan', flag: 'sd', text: 'Sudan' },
    { key: 'sr', value: 'Suriname', flag: 'sr', text: 'Suriname' },
    { key: 'sz', value: 'Swaziland', flag: 'sz', text: 'Swaziland' },
    { key: 'se', value: 'Sweden', flag: 'se', text: 'Sweden' },
    { key: 'ch', value: 'Switzerland', flag: 'ch', text: 'Switzerland' },
    { key: 'sy', value: 'Syria', flag: 'sy', text: 'Syria' },
    { key: 'tw', value: 'Taiwan', flag: 'tw', text: 'Taiwan' },
    { key: 'tz', value: 'Tanzania', flag: 'tz', text: 'Tanzania' },
    { key: 'th', value: 'Thailand', flag: 'th', text: 'Thailand' },
    { key: 'tg', value: 'Togo', flag: 'tg', text: 'Togo' },
    { key: 'tt', value: 'Trinidad', flag: 'tt', text: 'Trinidad' },
    { key: 'tn', value: 'Tunisia', flag: 'tn', text: 'Tunisia' },
    { key: 'tr', value: 'Turkey', flag: 'tr', text: 'Turkey' },
    { key: 'ae', value: 'U.A.E', flag: 'ae', text: 'U.A.E' },
    { key: 'ug', value: 'Uganda', flag: 'ug', text: 'Uganda' },
    { key: 'ua', value: 'Ukraine', flag: 'ua', text: 'Ukraine' },
    { key: 'uk', value: 'United Kingdom', flag: 'uk', text: 'United Kingdom' },
    { key: 'us', value: 'United States', flag: 'us', text: 'United States' },
    { key: 'uy', value: 'Uruguay', flag: 'uy', text: 'Uruguay' },
    { key: 'uz', value: 'Uzbekistan', flag: 'uz', text: 'Uzbekistan' },
    { key: 've', value: 'Venezuela', flag: 've', text: 'Venezuela' },
    { key: 'vn', value: 'Vietnam', flag: 'vn', text: 'Vietnam' },
    { key: 'gb wls', value: 'Wales', flag: 'gb wls', text: 'Wales' },
    { key: 'ye', value: 'Yemen', flag: 'ye', text: 'Yemen' },
    { key: 'zm', value: 'Zambia', flag: 'zm', text: 'Zambia' },
    { key: 'zw', value: 'Zimbabwe', flag: 'zw', text: 'Zimbabwe' },
  ]
  const phoneExt = [
    {key: '+93', text: '+93', value: '+93'},
    {key: '+355', text: '+355', value: '+355'},
    {key: '+213', text: '+213', value: '+213'},
    {key: '+1-684', text: '+1-684', value: '+1-684'},
    {key: '+376', text: '+376', value: '+376'},
    {key: '+244', text: '+244', value: '+244'},
    {key: '+1-264', text: '+1-264', value: '+1-264'},
    {key: '+1-268', text: '+1-268', value: '+1-268'},
    {key: '+54', text: '+54', value: '+54'},
    {key: '+374', text: '+374', value: '+374'},
    {key: '+297', text: '+297', value: '+297'},
    {key: '+61', text: '+61', value: '+61'},
    {key: '+43', text: '+43', value: '+43'},
    {key: '+994', text: '+994', value: '+994'},
    {key: '+1-242', text: '+1-242', value: '+1-242'},
    {key: '+973', text: '+973', value: '+973'},
    {key: '+880', text: '+880', value: '+880'},
    {key: '+1-246', text: '+1-246', value: '+1-246'},
    {key: '+375', text: '+375', value: '+375'},
    {key: '+32', text: '+32', value: '+32'},
    {key: '+501', text: '+501', value: '+501'},
    {key: '+229', text: '+229', value: '+229'},
    {key: '+1-441', text: '+1-441', value: '+1-441'},
    {key: '+975', text: '+975', value: '+975'},
    {key: '+591', text: '+591', value: '+591'},
    {key: '+387', text: '+387', value: '+387'},
    {key: '+267', text: '+267', value: '+267'},
    {key: '+55', text: '+55', value: '+55'},
    {key: '+359', text: '+359', value: '+359'},
    {key: '+226', text: '+226', value: '+226'},
    {key: '+257', text: '+257', value: '+257'},
    {key: '+855', text: '+855', value: '+855'},
    {key: '+237', text: '+237', value: '+237'},
    {key: '+1', text: '+1', value: '+1'},
    {key: '+238', text: '+238', value: '+238'},
    {key: '+1-345', text: '+1-345', value: '+1-345'},
    {key: '+236', text: '+236', value: '+236'},
    {key: '+235', text: '+235', value: '+235'},
    {key: '+56', text: '+56', value: '+56'},
    {key: '+86', text: '+86', value: '+86'},
    {key: '+57', text: '+57', value: '+57'},
    {key: '+269', text: '+269', value: '+269'},
    {key: '+506', text: '+506', value: '+506'},
    {key: '+385', text: '+385', value: '+385'},
    {key: '+53', text: '+53', value: '+53'},
    {key: '+357', text: '+357', value: '+357'},
    {key: '+420', text: '+420', value: '+420'},
    {key: '+243', text: '+243', value: '+243'},
    {key: '+45', text: '+45', value: '+45'},
    {key: '+253', text: '+253', value: '+253'},
    {key: '+1-809', text: '+1-809', value: '+1-809'},
    {key: '+1-829', text: '+1-829', value: '+1-829'},
    {key: '+1-849', text: '+1-849', value: '+1-849'},
    {key: '+593', text: '+593', value: '+593'},
    {key: '+20', text: '+20', value: '+20'},
    {key: '+503', text: '+503', value: '+503'},
    {key: '+240', text: '+240', value: '+240'},
    {key: '+291', text: '+291', value: '+291'},
    {key: '+372', text: '+372', value: '+372'},
    {key: '+251', text: '+251', value: '+251'},
    {key: '+679', text: '+679', value: '+679'},
    {key: '+358', text: '+358', value: '+358'},
    {key: '+33', text: '+33', value: '+33'},
    {key: '+689', text: '+689', value: '+689'},
    {key: '+241', text: '+241', value: '+241'},
    {key: '+220', text: '+220', value: '+220'},
    {key: '+995', text: '+995', value: '+995'},
    {key: '+49', text: '+49', value: '+49'},
    {key: '+233', text: '+233', value: '+233'},
    {key: '+30', text: '+30', value: '+30'},
    {key: '+229', text: '+229', value: '+229'},
    {key: '+1-473', text: '+1-473', value: '+1-473'},
    {key: '+502', text: '+502', value: '+502'},
    {key: '+224', text: '+224', value: '+224'},
    {key: '+245', text: '+245', value: '+245'},
    {key: '+592', text: '+592', value: '+592'},
    {key: '+509', text: '+509', value: '+509'},
    {key: '+504', text: '+504', value: '+504'},
    {key: '+852', text: '+852', value: '+852'},
    {key: '+36', text: '+36', value: '+36'},
    {key: '+354', text: '+354', value: '+354'},
    {key: '+91', text: '+91', value: '+91'},
    {key: '+62', text: '+62', value: '+62'},
    {key: '+98', text: '+98', value: '+98'},
    {key: '+964', text: '+964', value: '+964'},
    {key: '+353', text: '+353', value: '+353'},
    {key: '+972', text: '+972', value: '+972'},
    {key: '+39', text: '+39', value: '+39'},
    {key: '+225', text: '+225', value: '+225'},
    {key: '+1-876', text: '+1-876', value: '+1-876'},
    {key: '+81', text: '+81', value: '+81'},
    {key: '+962', text: '+962', value: '+962'},
    {key: '+7', text: '+7', value: '+7'},
    {key: '+254', text: '+254', value: '+254'},
    {key: '+965', text: '+965', value: '+965'},
    {key: '+371', text: '+371', value: '+371'},
    {key: '+961', text: '+961', value: '+961'},
    {key: '+266', text: '+266', value: '+266'},
    {key: '+231', text: '+231', value: '+231'},
    {key: '+218', text: '+218', value: '+218'},
    {key: '+423', text: '+423', value: '+423'},
    {key: '+370', text: '+370', value: '+370'},
    {key: '+352', text: '+352', value: '+352'},
    {key: '+389', text: '+389', value: '+389'},
    {key: '+261', text: '+261', value: '+261'},
    {key: '+265', text: '+265', value: '+265'},
    {key: '+60', text: '+60', value: '+60'},
    {key: '+960', text: '+960', value: '+960'},
    {key: '+223', text: '+223', value: '+223'},
    {key: '+356', text: '+356', value: '+356'},
    {key: '+222', text: '+222', value: '+222'},
    {key: '+230', text: '+230', value: '+230'},
    {key: '+52', text: '+52', value: '+52'},
    {key: '+373', text: '+373', value: '+373'},
    {key: '+77', text: '+77', value: '+77'},
    {key: '+976', text: '+976', value: '+976'},
    {key: '+382', text: '+382', value: '+382'},
    {key: '+212', text: '+212', value: '+212'},
    {key: '+258', text: '+258', value: '+258'},
    {key: '+264', text: '+264', value: '+264'},
    {key: '+977', text: '+977', value: '+977'},
    {key: '+31', text: '+31', value: '+31'},
    {key: '+64', text: '+64', value: '+64'},
    {key: '+505', text: '+505', value: '+505'},
    {key: '+227', text: '+227', value: '+227'},
    {key: '+234', text: '+234', value: '+234'},
    {key: '+850', text: '+850', value: '+850'},
    {key: '+47', text: '+47', value: '+47'},
    {key: '+92', text: '+92', value: '+92'},
    {key: '+970', text: '+970', value: '+970'},
    {key: '+507', text: '+507', value: '+507'},
    {key: '+595', text: '+595', value: '+595'},
    {key: '+51', text: '+51', value: '+51'},
    {key: '+63', text: '+63', value: '+63'},
    {key: '+48', text: '+48', value: '+48'},
    {key: '+351', text: '+351', value: '+351'},
    {key: '+1-787', text: '+1-787', value: '+1-787'},
    {key: '+1-939', text: '+1-939', value: '+1-939'},
    {key: '+974', text: '+974', value: '+974'},
    {key: '+242', text: '+242', value: '+242'},
    {key: '+40', text: '+40', value: '+40'},
    {key: '+7', text: '+7', value: '+7'},
    {key: '+250', text: '+250', value: '+250'},
    {key: '+685', text: '+685', value: '+685'},
    {key: '+239', text: '+239', value: '+239'},
    {key: '+966', text: '+966', value: '+966'},
    {key: '+221', text: '+221', value: '+221'},
    {key: '+381', text: '+381', value: '+381'},
    {key: '+248', text: '+248', value: '+248'},
    {key: '+232', text: '+232', value: '+232'},
    {key: '+65', text: '+65', value: '+65'},
    {key: '+421', text: '+421', value: '+421'},
    {key: '+386', text: '+386', value: '+386'},
    {key: '+252', text: '+252', value: '+252'},
    {key: '+27', text: '+27', value: '+27'},
    {key: '+82', text: '+82', value: '+82'},
    {key: '+34', text: '+34', value: '+34'},
    {key: '+94', text: '+94', value: '+94'},
    {key: '+249', text: '+249', value: '+249'},
    {key: '+597', text: '+597', value: '+597'},
    {key: '+268', text: '+268', value: '+268'},
    {key: '+46', text: '+46', value: '+46'},
    {key: '+41', text: '+41', value: '+41'},
    {key: '+963', text: '+963', value: '+963'},
    {key: '+886', text: '+886', value: '+886'},
    {key: '+255', text: '+255', value: '+255'},
    {key: '+66', text: '+66', value: '+66'},
    {key: '+228', text: '+228', value: '+228'},
    {key: '+1-868', text: '+1-868', value: '+1-868'},
    {key: '+216', text: '+216', value: '+216'},
    {key: '+90', text: '+90', value: '+90'},
    {key: '+1-649', text: '+1-649', value: '+1-649'},
    {key: '+256', text: '+256', value: '+256'},
    {key: '+380', text: '+380', value: '+380'},
    {key: '+971', text: '+971', value: '+971'},
    {key: '+44', text: '+44', value: '+44'},
    {key: '+598', text: '+598', value: '+598'},
    {key: '+998', text: '+998', value: '+998'},
    {key: '+58', text: '+58', value: '+58'},
    {key: '+84', text: '+84', value: '+84'},
    {key: '+967', text: '+967', value: '+967'},
    {key: '+260', text: '+260', value: '+260'},
    {key: '+263', text: '+263', value: '+263'},
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

  const [loading, setLoader] = React.useState(false);

  const updateIdentity = e => {
    const docRef = db.collection("Venues").doc(venue.uid);
    e.preventDefault();
    setLoader(true);
    docRef.update({
      'venueName': values.venueName ? values.venueName : venue.venueName,
      'venueCategory': venueCategory ? venueCategory : venue.venueCategory,
      'venueSpeciality': venueSpeciality ? venueSpeciality : venue.venueSpeciality
    }).then(function() {
      setLoader(false);
      setValues({
        'venueName': ''
      });
      setCategory('');
      setSpeciality('');
    })
  }
  const updateLocation = e => {
    const docRef = db.collection("Venues").doc(venue.uid);
    e.preventDefault();
    setLoader(true);
    docRef.update({
      'venueStreet1': values.venueStreet1 ? values.venueStreet1 : venue.venueStreet1,
      'venueStreet2': values.venueStreet2 ? values.venueStreet2 : venue.venueStreet2,
      'venueCity': values.venueCity ? values.venueCity : venue.venueCity,
      'venueProvince': values.venueProvince ? values.venueProvince : venue.venueProvince,
      'venueCountry': venueCountry ? venueCountry : venue.venueCountry
    }).then(function() {
      setLoader(false);
      setValues({
        'venueStreet1': '',
        'venueStreet2': '',
        'venueCity': '',
        'venueProvince': '',
      });
      setCountry('');
    })
  }
  const updateImage = e => {
    const docRef = db.collection("Venues").doc(venue.uid);
    e.preventDefault();
    setLoader(true);
    if (venueImage) {
      const uploadImage = storage.child(`VenueImages/${venue.venueName}`).put(venueImage);
      uploadImage.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadImage.snapshot.ref.getDownloadURL().then((url) => {
          docRef.update({
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
  const updateDetails = e => {
    const docRef = db.collection("Venues").doc(venue.uid);
    e.preventDefault();
  //   if (venueImage) {
  //     const uploadImage = storage.child(`VenueImages/${venue.venueName}`).put(venueImage);
  //     uploadImage.on('state_changed',
  //     (snapshot) => {
  //       setDetailLoader(true);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       uploadImage.snapshot.ref.getDownloadURL().then((url) => {
  //         docRef.update({
  //           'venueDetails': values.venueDetails ? values.venueDetails : venue.venueDetails,
  //           'openDays': openDays ? openDays : venue.openDays,
  //           'expDays': expDays ? expDays : venue.expDays,
  //           'openTime1': fromTime1 ? fromTime1 : venue.openTime1,
  //           'closeTime1': toTime1 ? toTime1 : venue.closeTime1,
  //           'openTime2': fromTime2 ? fromTime2 : venue.openTime2,
  //           'closeTime2': toTime2 ? toTime2 : venue.closeTime2,
  //           'venueImgUrl': url
  //         }).then(function() {
  //           setDetailLoader(false);
  //           setValues({
  //             'venueDetails': ''
  //           });
  //           setPrevUrl('');
  //         })
  //       })
  //     }
  //   )
  // }
    // else {
      setLoader(true);
      docRef.update({
        'venueDetails': convertToRaw(editorState.getCurrentContent()),
        'openDays': openDays ? openDays : venue.openDays,
        'expDays': expDays ? expDays : venue.expDays,
        'openTime1': fromTime1 ? fromTime1 : venue.openTime1,
        'closeTime1': toTime1 ? toTime1 : venue.closeTime1,
        'openTime2': fromTime2 ? fromTime2 : venue.openTime2,
        'closeTime2': toTime2 ? toTime2 : venue.closeTime2
      }).then(function() {
        setLoader(false);
        setValues({
          'venueDetails': ''
        })
      })
    // }
  }
  const updateContact = e => {
    const docRef = db.collection("Venues").doc(venue.uid);
    e.preventDefault();
    setLoader(true);
    docRef.update({
      'venueEmail': values.venueEmail ? values.venueEmail : venue.venueEmail,
      'venuePhone': values.venuePhone ? `${phoneCode}${values.venuePhone}` : venue.venuePhone
    }).then(function() {
      setLoader(false);
      setValues({
        'venueEmail': '',
        'venuePhone': ''
      })
    })
  }

  var lengthString = 20;

  let trimString = function (string, length) {
      return string.length > length ?
             string.substring(0, length) + '...' :
             string;
    };

  const venueDetailsPane = [
    {
      menuItem: 'Identification',
      render: () =>
      <Tab.Pane>
        <Form loading={loading} onSubmit={updateIdentity}>
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
        <Form loading={loading} onSubmit={updateLocation}>
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
      menuItem: 'Venue Image',
      render: () =>
      <Tab.Pane>
        <Form loading={loading} onSubmit={updateImage}>
          <Form.Field>
            <label>Choose the Main Image for your venue</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
          </Form.Field>
          <Image src={venue.venueImgUrl ? venue.venueImgUrl : prevUrl} size='large' rounded/>
          <Divider hidden/>
          <Form.Button primary content='Update Image' type='submit'/>
          <Divider hidden/>
        </Form>
      </Tab.Pane>
    },
    {
      menuItem: 'Details',
      render: () =>
      <Tab.Pane>
        <Form loading={loading} onSubmit={updateDetails}>
          {/* <Form.TextArea label='Description' placeholder={venue.venueDetails} style={{ minHeight: 250 }} name='venueDetails' value={values.venueDetails} onChange={handleChange('venueDetails')}/> */}
          {/* <Form.Field>
            <label>Choose the Main Image for your venue</label>
            <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()}/>
            <input ref={fileInputRef} type='file' hidden onChange={handleImageChange}/>
            </Form.Field>
          <Image src={venue.venueImgUrl ? venue.venueImgUrl : prevUrl} size='large' rounded/> */}
          <EditorWrapper>
            <Toolbar editorState={editorState} updateEditorState={updateEditorState}/>

            <EditorContainer>
              <Editor placeholder='' editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} customStyleFn={customStyleFn}/>
            </EditorContainer>
          </EditorWrapper>

          <Divider hidden/>
          <Form.Group>
            <Form.Dropdown selection multiple label='Opening Days' placeholder={trimString(venue.openDays, lengthString)} name='openDays' value={openDays} onChange={handleOpenDays} options={days}/>
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
        <Form loading={loading} onSubmit={updateContact}>
          <Form.Group>
            <Form.Field width={7}>
              <label>Venue Email Address</label>
              <Input placeholder={venue.venueEmail} name='venueEmail' value={values.venueEmail} onChange={handleChange('venueEmail')}/>
            </Form.Field>
            <Form.Field width={7}>
              <label>Venue Phone Number</label>
              <Input placeholder={venue.venuePhone} label={<Dropdown inline search defaultValue={phoneCode} options={phoneExt} value={phoneCode} onChange={handleCode}/>} labelPosition='left' name='venuePhone' value={values.venuePhone} onChange={handleChange('venuePhone')}/>
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
