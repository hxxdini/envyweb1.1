import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {
  DateInput,
} from 'semantic-ui-calendar-react';
import firebase from './components/Firebase';

const usersRef = firebase.firestore().collection("Users");

export function SignUp() {

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  React.useEffect(()=>{
    usersRef.get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
      setUsers(data);
    })
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateOfBirth = (event, {name, value}) => {
      setDateOfBirth(value);
  }

  const returnOut = () => {
    console.log('Username already exists');
    setLoading(false);
    return;
  }

  const onSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      users.map(user => (
        user.username == values.username ? returnOut() : ""
      ));
      firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(
        function(userCredential) {
      usersRef
        .doc(`${userCredential.user.uid}`)
        .set({
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: dateOfBirth,
          username: values.username,
          email: values.email,
          uid: userCredential.user.uid
        }).then((docRef) => {
          // setRedirect(true);
          setValues({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
          });
          setDateOfBirth('');
          setLoading(false);
        });
      }
    ).catch(function(error){
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          // NotificationManager.error(errorMessage);
          // alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    })
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 600 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Create your account
        </Header>
        <Form size='large' onSubmit={onSubmit} loading={loading}>
          <Segment stacked>
            <Form.Group widths='equal'>
              <Form.Input icon='address card' iconPosition='left' placeholder='First Name' name='firstName' value={values.firstName} onChange={handleChange('firstName')} required/>
              <Form.Input icon='address card' iconPosition='left' placeholder='Last Name' name='lastName' value={values.lastName} onChange={handleChange('lastName')} required/>
            </Form.Group>
            <DateInput
              clearable
              name="dateOfBirth"
              startMode='year'
              placeholder="Date of Birth"
              dateFormat="ddd Do MMM YYYY"
              value={dateOfBirth}
              iconPosition="left"
              onChange={handleDateOfBirth}
              required
              hideMobileKeyboard={true}
              closable={true}
            />
            <Form.Input fluid icon='at' iconPosition='left' placeholder='E-mail address' name='email' value={values.email} onChange={handleChange('email')} required/>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' value={values.username} onChange={handleChange('username')} required/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={values.password}
              onChange={handleChange('password')}
              required
            />

            <Button color='teal' type='submit' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='/login'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
