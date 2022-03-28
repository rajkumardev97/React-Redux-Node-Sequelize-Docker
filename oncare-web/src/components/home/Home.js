import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    const {
      auth: { isAuthenticated },
      history
    } = this.props;
    if (isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Home</h3>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
