import './App.css';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Landing></Landing>
    </Fragment>
  );
};

export default App;
