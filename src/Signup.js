import React, { Component } from 'react';
import firebase from 'firebase/app';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((resp) => {
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleEmailChange} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />
          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

export default Signup;
