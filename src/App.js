import React from 'react';
import { BrowserRouter as Router, Route, Switch,  useParams, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import ManagerSignUp from './ManagerSignUp';
import ManagerLogin from './ManagerLogin';
import CreateEvent from './CreateEvent';
import RegisterVenue from './RegisterVenue';
import Profile from './Profile';
import ManagerDashboard from './ManagerDashboard';
import EventPage from './EventPage';
import Venues from './Venues';
import VenuePage from './VenuePage';
import UserProfile from './UserProfile';
import Feeds from './Feeds';
import MobileEditor from './MobileEditor';
import EditorViewer from './EditorViewer';
import SearchUsers from './SearchUsers';
import PageAnimation from './components/PageAnimation';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

const routes = [
  {path: '/', name: 'Home', Component: Home },
  {path: '/login', name: 'Login', Component: Login },
  {path: '/signup', name: 'Signup', Component: SignUp },
  {path: '/manager_signup', name: 'Manager Signup', Component: ManagerSignUp },
  {path: '/manager_login', name: 'Manager Login', Component: ManagerLogin },
  {path: '/eventcreate', name: 'Event Create', Component: CreateEvent },
  {path: '/registervenue', name: 'Register Venue', Component: RegisterVenue },
  {path: '/profile', name: 'Profile', Component: Profile },
  {path: '/manager_dashboard', name: 'Manager Dashboard', Component: ManagerDashboard },
  {path: '/event/:uid', name: 'Event Page', Component: EventPage },
  {path: '/venues', name: 'Venues', Component: Venues},
  {path: '/venue/:uid', name: 'Venue Page', Component: VenuePage},
  {path: '/user/:uid', name: 'User Profile', Component: UserProfile},
  {path: '/mobile_editor', name: 'Mobile Editor', Component: MobileEditor},
  {path: '/editor_viewer/:uid', name: 'Editor Viewer', Component: EditorViewer},
  {path: '/notifications', name: 'Notifications', Component: Feeds},
  {path: '/search_users', name: 'Search Users', Component: SearchUsers},
]


export default function App() {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {/* <Route> */}
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path} component={PageAnimation(Component)}>
            </Route>
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}
