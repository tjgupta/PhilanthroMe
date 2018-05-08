import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';

class Header extends Component {
  constructor(props) {
    super(props);
  }

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
      <header className="App-header">
        <h1 className="App-title">
          <Link to="/">PhilanthroMe</Link>
        </h1>
        <ul className="App-nav">
          {appNav}
        </ul>
      </header>
    );
  }
}

export default Header;
