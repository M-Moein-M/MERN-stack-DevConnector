import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <Landing></Landing>
      </Fragment>
    </Router>
  );
};

export default App;
