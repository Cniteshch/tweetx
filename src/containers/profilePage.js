import React, { Component } from "react";
import { connect } from "react-redux";
import cookie from 'react-cookie'
import App from "../components/app";
import { getMyInfo } from "../actions";
import {emptyString, loadingString} from '../actions/helper'
import UsersList from "../components/social/usersList";
import SinglePost from "../components/social/singlePost";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      showForm: false
    };
  }

  componentDidMount() {
    this.props.getMyInfo();
  }

  handleButton = () => {
    this.setState({ login: !this.state.login });
    localStorage.setItem("login", !this.state.login);
  };

  render() {
    const { loading, myPosts, followings, followers } = this.props;
    return (
      <App>
        <div className="row ">
          <div className="col-md-10 offset-md-1 mainStream">
            <div style={{ padding: "3% 10%" }}>
              <div className="row">
                <div className="col-md-3">
                  <img
                    alt="profilePage"
                    className="img-circle img-responsive"
                    src={"pp.png"}
                  />
                </div>
                <div className="col-md-9">
                  <h2 className="profileName">{cookie.load('user') ? cookie.load('user').name : emptyString}</h2>
                  <ul className="profileListing">
                    <li>Posts : {myPosts ? myPosts.length : 0}</li>
                    <li>Followers : {followers.length}</li>
                    <li>Followings : {followings.length}</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-3">
                  <Tabs>
                    <TabList>
                      <Tab>Posts</Tab>
                      <Tab>Followers</Tab>
                      <Tab>Followings</Tab>
                    </TabList>

                    <TabPanel>
                      <div>
                        {loading || !myPosts ? (
                          <h2>{loadingString}</h2>
                        ) : (
                          <SinglePost posts={myPosts} />
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <UsersList
                        users={followers}
                        followUser={this.followUser}
                        unfollowUser={this.unfollowUser}
                      />
                    </TabPanel>
                    <TabPanel>
                      <UsersList
                        users={followings}
                        initialFollow={true}
                        followUser={this.followUser}
                        unfollowUser={this.unfollowUser}
                      />
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    myPosts: state.user.myPosts,
    followings: state.user.followings,
    followers: state.user.followers,
    loading: state.user.loading,
    error: state.user.error
  };
}

export default connect(mapStateToProps, {
  getMyInfo,
})(MainPage);
