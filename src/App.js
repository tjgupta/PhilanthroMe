import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Settings from './Settings';
import './App.css';
import firebase from 'firebase/app';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    const self = this;

    this.authStateUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        self.setState({user: user});
        const firestore = firebase.firestore();
        firestore.collection('users').doc(user.uid).get()
          .then((doc) => {
            const data = doc.data();
            self.props.history.push(`/u/${data.username}`);
          });

      } else {
        self.setState({user: null});
        self.props.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    this.authStateUnsubscribe();
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
            <Route path="/u/:username" component={Profile} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
