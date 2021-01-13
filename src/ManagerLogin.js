import React from 'react'
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import firebase from './components/Firebase';

export default function ManagerLogin() {
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const [values, setValues] = React.useState({
    'email': '',
    'password': '',
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDismiss = () => {
    setErrorVisible(false);
  }

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((user) => {
      setLoading(false);
      setRedirect(true);
      console.log('Login successful');
    }).catch((error) => {
      setLoading(false);
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage)
      setErrorVisible(true);
    })
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      {redirect ? (<Redirect to='/manager_dashboard'/>) : ""}
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Login to your manager account
        </Header>
        <Form size='large' loading={loading} onSubmit={onSubmit} error>
          {errorVisible ?
            (<Message
              error
              header='Signup Error'
              content={error}
              onDismiss={handleDismiss}
             />)
          :
          ('')
          }
          <Segment stacked>
            <Form.Input fluid icon='at' iconPosition='left' placeholder='E-mail address' value={values.email} onChange={handleChange('email')} required/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={values.password}
              onChange={handleChange('password')}
              type='password'
              required
            />

            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/manager_signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
