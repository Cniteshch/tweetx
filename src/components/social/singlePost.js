
import React from 'react';
import moment from 'moment'

const SinglePost = ({
    posts
}) => {
  return (
    <div className='postComp'>
    {posts.length ? posts.map(post => {
        return (
            <div key={post._id} className='row'>
                <div className='col-md-2'>
                <img alt='post'  className='img-circle img-responsive' src={'pp.png'} />
                </div>
                <div className='col-md-10'>
                <p className='name'>{post.userId.local.name}</p> 
                <i>   {post.message}</i>
        <p className='timestamp'>{moment(post.createdAt).from(moment())}</p>
                </div>
                
             
            </div>
        )
    }): 'No posts yet'}
  </div>
  );
};



export default SinglePost;
