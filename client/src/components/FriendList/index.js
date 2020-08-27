import React from 'react';
import {Link} from 'react-router-dom';

const FriendList = ({friendCount, username, friends}) => {
    if (!friends || !friends.length) {
        return <h3 className='mb-3 col-12 text-center'>No Friends Added</h3>
    }

    return (
        <div className='row justify-content-center'>
            <h3 className='mb-3 col-12 text-center'>{username}'s {friendCount === 1 ? 'friend' : 'friends'}
            </h3>
            {friends.map(friend => (
                <button className='btn w-100 display-block mb-2' key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    )
}

export default FriendList;