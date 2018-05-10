import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import './home.css';
import avatar from './avatar.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestUsers: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('users')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((user) => {
          data.push(user.data());
        });
        this.setState({latestUsers: data});
      });

    this.querySnapshotUnsubscribe = db.collection('users')
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((user) => {
          data.push(user.data());
        })
        this.setState({latestUsers: data});
      });
  }

  componentWillUnmount() {
    this.querySnapshotUnsubscribe();
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <p className="Home-intro">
          PhilanthroMe is your giving profile on the web.
        </p>
        <h3>Welcome to the newest givers on PhilanthroMe</h3>
        <ul className="Home-feed clearfix">
          {this.state.latestUsers.map((user) => {
            const userName = user.displayName ? user.displayName : 'Anonymous'
            return (
              <li key={user.uid}>
                <Link to={`/u/${user.username}`}>
                  <img src={avatar} className="avatar" alt={userName} />
                  <span className="Home-feed-name">
                    {userName}
                  </span>
                  <span className="Home-feed-favorite-charity">
                    Favorite charity:<br />
                    {user.favoriteCharity ? user.favoriteCharity : 'Unknown'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
