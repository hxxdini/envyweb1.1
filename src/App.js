import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CreateEvent } from './CreateEvent';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route>
            <Route exact path="/" component={ Home }/>
            <Route path="/eventcreate" component={ CreateEvent }/>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
