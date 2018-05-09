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
    this.db.collection('users')
      .where('username', '==', this.props.match.params.username)
      .get()
      .then((results) => {
        const data = results.docs[0].data();
        this.setState({
          displayName: data.displayName || 'Anonymous',
          favoriteCharity: data.favoriteCharity || 'Unknown',
          uid: data.uid
        });

        firebase.auth().onAuthStateChanged((user) => {
          this.user = user;
          this.setState({isLoggedInUser: this.isLoggedInUser()});
        });
      });
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
