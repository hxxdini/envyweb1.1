import React from 'react'
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

export default function Footer(props) {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Our Social Media' />
            <List link inverted>
              <List.Item as='a'>Twitter</List.Item>
              <List.Item as='a'>Facebook</List.Item>
              <List.Item as='a'>LinkedIn</List.Item>
              <List.Item as='a'>Instagram</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='More Information' />
            <List link inverted>
              <List.Item as={Link} to='/search_users'>Search Users</List.Item>
              <List.Item as='a'>About</List.Item>
              {/* <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item> */}
            </List>
          </Grid.Column>
          {/* <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 3' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column> */}
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Download Badges' />
            <p>
              Extra space for iOS or Android Download Badges obtained via licence registeration
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src='/logo.png' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
}
