import React, { Component } from "react";
import { connect } from "react-redux";

import UserList from "../manage-users/UserList";

class Dashboard extends Component {
  render() {
    const {
      auth: { user }
    } = this.props;

    return (
      <div className="container">
        {user.isAdmin ? (
          <UserList />
        ) : (
          <header className="jumbotron">
            <h3>
              Hello, <strong>{user.username}</strong>
            </h3>
          </header>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
