import React, { Component } from 'react';
import firebase from 'firebase/app';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      username: '',
      error: false
    };
    this.db = firebase.firestore();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.setState({error: false});
    const self = this;
    // firebase doesn't allow storing additional info with an auth user,
    // so we're creating a user and then creating a user document in the
    // users DB collection
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        return self.db.collection('users').doc(resp.uid).set({
          uid: resp.uid,
          displayName: this.state.displayName,
          username: this.state.username,
          favoriteCharity: this.state.favoriteCharity
        });
      })
      .catch(() => {
        self.setState({error: true});
      });
  }

  render() {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={this.handleSubmit}>
        {this.state.error ?
          <div className="error-message">
            An error has occurred. Please try again later.
          </div> : null}
          <div className="form-group">
            <label htmlFor="displayName">Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={this.state.displayName}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="favoriteCharity">Favorite charity</label>
            <input
              type="text"
              id="favoriteCharity"
              name="favoriteCharity"
              value={this.state.favoriteCharity}
              onChange={this.handleChange} />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
