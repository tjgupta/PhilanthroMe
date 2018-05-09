import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import './header.css';

class Header extends Component {
  logout(event) {
    event.preventDefault();
    firebase.auth().signOut()
      .then(function() {
      })
      .catch(function(error) {
      });
  }

  render() {
    const appNav = this.props.user ? (
      <ul className="App-nav">
        <li><Link to="/me">My Profile</Link></li>
        <li><a href="#" onClick={this.logout}>Log out</a></li>
      </ul>
    ) : (
      <ul className="App-nav">
        <Switch>
          <Route path="/login" render={() => null} />
          <Route render={() => <li><Link to="/login">Log in</Link></li>} />
        </Switch>
        <Switch>
          <Route path="/signup" render={() => null} />
          <Route render={() => <li><Link to="/signup">Sign up</Link></li>} />
        </Switch>
      </ul>
    );

    return (
      <header className="Header-header">
        <h1 className="Header-title">
          <Link to="/">PhilanthroMe</Link>
        </h1>
        <ul className="Header-nav">
          {appNav}
        </ul>
      </header>
    );
  }
}

export default Header;
