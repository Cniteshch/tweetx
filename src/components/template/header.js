import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cookie from 'react-cookie'
import {logoutUser} from '../../actions'

const HeaderTemplate = ({logoutUser, authenticated}) => {
    const loggedInHeader = (
      <div className="topnav-right">
        <Link className="navbar-brand " to="/feeds">
          Feed
        </Link>
        <Link className="navbar-brand " to="/users">
          User
        </Link>
        <Link className="navbar-brand " to="/profile">
          Profile
        </Link>
        <p className="navbar-brand " onClick={() => logoutUser()}>
          Log out
        </p>
      </div>
    );
    return (
      <div>
        <nav className="navbar ">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand logo" to={cookie.load('token') ? '/feeds' : '/'}>
                TWEETX
              </Link>
            </div>
            {authenticated || cookie.load('user') ? loggedInHeader : null}
          </div>
        </nav>
      </div>
    );
  }


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, {logoutUser})(HeaderTemplate);
