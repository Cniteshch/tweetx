import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/app";
import { getUsers } from "../actions";
import {follow, unfollow} from '../actions/follow'
import {
  emptyString,
  loadingString
} from "../actions/helper";
import UsersList from "../components/social/usersList";

class MainPage extends Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { loading, users } = this.props;
    const showLoading = loading ? loadingString : emptyString;

    return (
      <App>
        <div className="row ">
          <div className="col-md-10 offset-md-1 mainStream">
            <div style={{ padding: "3% 10%" }}>
              {users.length ? <UsersList users={users} /> : showLoading}
            </div>
          </div>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    loading: state.user.loading,
    error: state.user.error
  };
}

export default connect(mapStateToProps, {
  getUsers,
  follow,
   unfollow
})(MainPage);
