import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { retrieveUsers } from "../../actions/users";
import { deleteUser } from "../../actions/users";

class UserList extends Component {
  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.props.retrieveUsers();
  };

  removeUser = (id) => {
    this.props
      .deleteUser(id)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { users } = this.props;
    let usersCont;

    if (users && users.length) {
      usersCont = users.map((user, index) => {
        return (
          <tr
            key={index}
            class={`${user.isAdmin ? "table-info" : "table-secondary"}`}
          >
            <th scope="row">{user.id}</th>
            <td>{user.username}</td>
            <td>{user.firstname ? user.firstname : "NA"}</td>
            <td>{user.lastname ? user.lastname : "NA"}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Admin" : "User"}</td>
            <td>
              <Link to={`/users/${user.id}`}>Edit</Link>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={(e) => this.removeUser(user.id)}
                disabled={user.isAdmin}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="col-md-12">
        <h4>Users List</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{usersCont}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, {
  retrieveUsers,
  deleteUser
})(UserList);
