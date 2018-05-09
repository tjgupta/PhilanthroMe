import React, { Component } from 'react';
import firebase from 'firebase/app';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      favoriteCharity: '',
      username: '',
      loading: false,
      error: false
    };
    this.db = firebase.firestore();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      this.db.collection('users').doc(this.user.uid).get()
        .then((doc) => {
          const data = doc.data();
          this.setState({
            displayName: data.displayName || '',
            favoriteCharity: data.favoriteCharity || '',
            username: data.username
          });
        });

    });
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
    this.setState({loading: true, error: false});
    const self = this;
    this.db.collection('users').doc(this.user.uid).set({
      displayName: this.state.displayName,
      favoriteCharity: this.state.favoriteCharity
    }, {merge: true})
    .then(() => {
      self.props.history.push(`/u/${self.state.username}`);
    })
    .catch((error) => {
      self.setState({error: true, loading: false});
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Settings</h2>
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
          <label htmlFor="favoriteCharity">Favorite Charity</label>
          <input
            type="text"
            id="favoriteCharity"
            name="favoriteCharity"
            value={this.state.favoriteCharity}
            onChange={this.handleChange} />
        </div>
        <button type="submit" disabled={this.state.loading}>Save changes</button>
      </form>
    )
  }
}

export default Settings;
