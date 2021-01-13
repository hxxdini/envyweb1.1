import React from 'react'
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Input } from 'semantic-ui-react'
import firebase from './components/Firebase';

 export default function Login() {
   const [loading, setLoading] = React.useState(false);
   const [redirect, setRedirect] = React.useState(false);
   const [errorVisible, setErrorVisible] = React.useState(false);
   const [error, setError] = React.useState('');
   const [forgotError, setForgotError] = React.useState();
   const [hidden, setHidden] = React.useState(true);
   const [hidden1, setHidden1] = React.useState(true);
   const [loader, setLoader] = React.useState(false);
   const [values, setValues] = React.useState({
     'email': '',
     'password': '',
     'forgotEmail': ''
   });

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
     }).catch(
       (error) => {
         setLoading(false);
         var errorCode = error.code;
         var errorMessage = error.message;
         setError(errorMessage)
         setErrorVisible(true);
         console.log(error.code);
         console.log(error.message);
       }
     )
   }

   const forgotPasswordClick = e => {
     e.preventDefault();
     setLoader(true)
     var auth = firebase.auth();
     var emailAdd = values.forgotEmail;
     auth.sendPasswordResetEmail(emailAdd).then(function() {
       // Email sent.
       setHidden(false);
       setLoader(false);
     }).catch(function(error) {
       // An error happened.
       var errorMessage = error.message;
       setForgotError(errorMessage);
       setHidden1(false);
       setLoader(false);
     });
   }

   return (
     <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
       {redirect ? (<Redirect to='/profile'/>) : ""}
       <Grid.Column style={{ maxWidth: 450 }}>
         <Header as='h2' color='teal' textAlign='center'>
           <Image src='/logo.png' /> Login to your account
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

             <Button color='teal' type='submit' fluid size='large'>
               Login
             </Button>
             <br/>
             <Modal
               trigger={<Button primary type='button' fluid size='large'>
                 Forgot Password
               </Button>}
               closeIcon
             >
               <Modal.Header>Forgot Password</Modal.Header>
               <Modal.Content image>
                 <Modal.Description>
                   <Grid container stackable double>
                     <Grid.Row columns={2}>
                       <Grid.Column><Input placeholder='Enter email address' value={values.forgotEmail} onChange={handleChange('forgotEmail')} required fluid/></Grid.Column>
                       <Grid.Column><Button loading={loader} onClick={forgotPasswordClick} secondary>Send Password Reset Email</Button></Grid.Column>
                     </Grid.Row>
                     <Grid.Row columns={1}>
                       <Message hidden={hidden} positive header='Password Reset' content='An email containing password reset information has been sent to you'/>
                       <Message hidden={hidden1} error header='Error Sending Mail' content={forgotError}/>
                     </Grid.Row>
                   </Grid>
                 </Modal.Description>
               </Modal.Content>
             </Modal>
           </Segment>
         </Form>
         <Message>
           New to us? <a href='/signup'>Sign Up</a>
         </Message>
       </Grid.Column>
     </Grid>
   )
 }
