import React, { Component } from 'react';
import firebase from 'firebase/app';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
    };
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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        self.setState({error: true});
      });
  }

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error ?
            <div className="error-message">
              We are having trouble logging you in.
              Double check your email and password and try again.
            </div> : null
          }
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
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

export default Login;
