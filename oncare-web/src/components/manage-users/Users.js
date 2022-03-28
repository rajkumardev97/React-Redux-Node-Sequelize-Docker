import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { updateUser } from "../../actions/users";
import UserDataService from "../../services/users.service";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: null,
        username: "",
        firstname: "",
        lastname: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          [name]: value
        }
      };
    });
  }

  getUser(id) {
    UserDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateDetails() {
    this.props
      .updateUser(this.state.currentUser.id, this.state.currentUser)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your user detail has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Users
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {currentUser.id}
            </li>
          </ol>
        </nav>
        {currentUser && currentUser.id ? (
          <div className="edit-form">
            <form>
              <div className="form-group row">
                <label class="col-sm-1 col-form-label">User ID</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="userid"
                    name="id"
                    value={currentUser.id}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label class="col-sm-1 col-form-label">Username</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={currentUser.username}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group row">
                <label class="col-sm-1 col-form-label">Firstname</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={currentUser.firstname}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label class="col-sm-1 col-form-label">Lastname</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={currentUser.lastname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </form>
            <div className="form-group row">
              <div class="col-sm-7 text-center">
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={this.updateDetails}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>No User Found</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { updateUser })(Users);
