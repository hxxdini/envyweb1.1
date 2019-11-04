import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import firebase from './components/Firebase';

 export function Login() {
   const [loading, setLoading] = React.useState(false);
   const [values, setValues] = React.useState({
     'email': '',
     'password': ''
   });
   const handleChange = name => event => {
     setValues({ ...values, [name]: event.target.value });
   };
   const onSubmit = e => {
     e.preventDefault();
     setLoading(true);
     firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((user) => {
       setLoading(false);
       console.log('Login successful');
     }).catch(
       (error) => {
         console.log(error.code);
         console.log(error.message);
       }
     )
   }
   return (
     <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
       <Grid.Column style={{ maxWidth: 450 }}>
         <Header as='h2' color='teal' textAlign='center'>
           <Image src='/logo.png' /> Login to your account
         </Header>
         <Form size='large' loading={loading} onSubmit={onSubmit}>
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
           New to us? <a href='/signup'>Sign Up</a>
         </Message>
       </Grid.Column>
     </Grid>
   )
 }
