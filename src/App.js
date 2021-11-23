import Survey from './components/Survey';
import Home from './components/Home';

import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './css/App.css';

function App() {

  //Routing traffic to different components

  return (

    <div className="App" style={{ marginTop: 100 }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/survey:surveyId" component={Survey} />
          <Route render={() => <h1 style={{ color: 'black' }}>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
