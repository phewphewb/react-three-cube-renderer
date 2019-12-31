import React from 'react';
import {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Input from './components/input';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Input} />

    </Router>
  );
}

export default App;
