
import React from 'react';
import User from '../../containers/singleUser'

const UsersList = ({
    users,
    initialFollow
}) => {
  return (
    <div className='postComp'>
    {users.length ? users.map(user => {
        return (
           <User key={user._id} user={user} initialFollow={initialFollow}  />
        )
    }): 'No users found'}
  </div>
  );
};



export default  UsersList ;