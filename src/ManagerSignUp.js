import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {
  DateInput,
} from 'semantic-ui-calendar-react';
import firebase from './components/Firebase';

const managersRef = firebase.firestore().collection("Managers");

export function ManagerSignUp() {
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [values, setValues] = React.useState({
    venueName: '',
    email: '',
    password: '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(
      function (userCredential) {
        managersRef.doc(`${userCredential.user.uid}`).set({
          venueName: values.venueName,
          email: values.email,
          uid: userCredential.user.uid
        }).then((docRef) => {
          setRedirect(true);
          setLoading(false);
          setValues({
            venueName: '',
            email: '',
            password: '',
          });
        })
      }
    ).catch({
      function (error){
        console.log(error.code)
        console.log(error.message)
      }
    })
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      {redirect ? (<Redirect to='/manager_dashboard'/>) : ""}
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Register as a Manager
        </Header>
        <Form size='large' loading={loading} onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Group widths='equal'>
              <Form.Input icon='address card' iconPosition='left' placeholder='Venue Name' name='venueName' value={values.venueName} onChange={handleChange('venueName')} required/>
            </Form.Group>
            <Form.Input fluid icon='at' iconPosition='left' placeholder='E-mail address' name='email' value={values.email} onChange={handleChange('email')} required/>
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
          Already have a manager account? <a href='/manager_login'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
