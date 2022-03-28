import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Navbar extends Component {
  logoutUser = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand">
        <Link to={"/"} className="navbar-brand">
          USER PORTAL
        </Link>

        {user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                Hello, {user.username}
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/login"
                className="btn btn-info btn-sm"
                onClick={this.logoutUser}
              >
                <span className="glyphicon glyphicon-log-out"></span> Log out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
