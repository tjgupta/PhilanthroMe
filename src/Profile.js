import React, { Component } from 'react';
import firebase from 'firebase/app';
import './profile.css';
import avatar from './avatar.png';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      favoriteCharity: '',
      uid: '',
      isLoggedInUser: false
    };
    this.goToEdit = this.goToEdit.bind(this);
    this.db = firebase.firestore();
  }

  componentDidMount() {
    const self = this;
    this.db.collection('users')
      .where('username', '==', this.props.match.params.username)
      .get()
      .then((results) => {
        const data = results.docs[0].data();
        self.setState({
          displayName: data.displayName || 'Anonymous',
          favoriteCharity: data.favoriteCharity || 'Unknown',
          uid: data.uid
        });

        self.authStateUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          self.user = user;
          self.setState({isLoggedInUser: this.isLoggedInUser()});
        });
      });
  }

  componentWillUnmount() {
    // check if the subscription is set, in case it gets unmounted
    // before the DB call comes back
    if (this.authStateUnsubscribe) {
      this.authStateUnsubscribe();
    }
  }

  isLoggedInUser() {
    if (!this.user) {
      return false;
    }
    return this.user.uid === this.state.uid;
  }

  goToEdit() {
    this.props.history.push('/settings');
  }

  render() {
    return (
      <div className="Profile">
        <img src={avatar} alt={this.state.displayName} className="avatar" />
        <h2>{this.state.displayName}</h2>
        <p>Favorite charity: {this.state.favoriteCharity}</p>
        {this.state.isLoggedInUser ? <button onClick={this.goToEdit}>Edit profile</button> : null}
      </div>
    )
  }
}

export default Profile;
