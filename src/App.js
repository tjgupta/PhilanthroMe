import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Me from './Me';
import './App.css';
import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/firestore');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    const self = this;

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "philanthrome-8bcf4.firebaseapp.com",
      databaseURL: "https://philanthrome-8bcf4.firebaseio.com",
      projectId: "philanthrome-8bcf4",
      storageBucket: "philanthrome-8bcf4.appspot.com",
      messagingSenderId: "634623017252"
    };
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        self.setState({user: user});
        self.props.history.push('/me');
      } else {
        self.setState({user: null});
        self.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/me" render={() => (
              this.state.user ? <Me /> : <Redirect to="/" />
            )} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
