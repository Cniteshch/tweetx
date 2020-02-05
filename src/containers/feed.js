import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/app";
import { newPost, getPosts } from "../actions";
import {loadingString} from "../actions/helper";
import Button from "../components/shared/button";
import SinglePost from "../components/social/singlePost";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state= {
        showForm : false
    }
  }

  componentDidMount() {
    this.props.getPosts();
  }
  initiateNewPost = () => {
    this.props.newPost(this.state.message);
    this.setState({ showForm: false });
  };

  render() {
    const { showForm } = this.state;
    const { loading, posts, shouldUpdate } = this.props;

    const writeFeed = (
      <div>
        <textarea
          className="postText"
          placeholder="write your short message here"
          onChange={ev => this.setState({ message: ev.target.value })}
        />
        <Button onClickFunction={this.initiateNewPost} label="Post" />
        <Button
          onClickFunction={() => this.setState({ showForm: false })}
          label="Cancel"
        />
      </div>
    );
    return (
      <App>
        <div className="row ">
          <div className="col-md-10 offset-md-1 mainStream">
            <div style={{ padding: "3% 10%" }}>
              {showForm ? (
                writeFeed
              ) : (
                <Button
                  onClickFunction={() => this.setState({ showForm: true })}
                  label="Write"
                />
              )}
              {(loading || !posts) ? <h2>{loadingString}</h2> : <SinglePost shouldUpdate={shouldUpdate}  posts={posts} />}
            </div>
          </div>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.user.posts,
    loading: state.user.loading,
    shouldUpdate: state.user.shouldUpdate
  };
}

export default connect(mapStateToProps, {
  newPost,
  getPosts
})(Feed);
