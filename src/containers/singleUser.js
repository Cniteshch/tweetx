import React, { useState } from "react";
import {follow, unfollow} from '../actions/follow'
import { connect } from "react-redux";

const User = ({ user, follow, unfollow, initialFollow }) => {
  const initialFollowing = initialFollow ? initialFollow : user.following  
  const [following, setFollowing] = useState(initialFollowing);
  const handleFollowing = (id) => {
    if(following){
        unfollow(id)
      setFollowing(false)
    } else {
        follow(id)
      setFollowing(true)
    }
  }

  return (
    <div className="row">
      <div className="col-md-2">
        <img alt='profile' className="img-circle img-responsive" src={"pp.png"} />
      </div>
      <div className="col-md-7">
        <p className="name">{user.local.name}</p> 
      </div>
      <div className="col-md-2">
         <button className={following ? 'followingButton' : 'btn-info'} onClick={() => handleFollowing(user._id)}>
           {following ? 'Following' : 'Follow'} 
          </button>

      </div>
    </div>
  );
};


function mapStateToProps(state) {
    return {
      myPosts: state.user.myPosts,
      followings : state.user.followings,
      followers : state.user.followers,
      loading: state.user.loading,
      error: state.user.error
    };
  }
  
  export default connect(mapStateToProps, {
    follow,
    unfollow
  })(User);
