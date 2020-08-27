import React from 'react';
import {Redirect, useParams} from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import {ADD_FRIEND} from '../utils/mutations';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {QUERY_USER, QUERY_ME} from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const {addFriend} = useMutation(ADD_FRIEND);
    const {username: userParam} = useParams();

    const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: {username: userParam}
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to ='/profile'/>
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user?.username) {
        return (
            <h4>You need to be logged in to view this page.</h4>
        );
    }

    const handleClick = async () => {
        try {
            await addFriend({
                variables: {_id: user._id}
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className='row mb-3 justify-content-center w-100'>
                <div className='col-6'>
                <h5 className='text-center'>Viewing {userParam ? `${user.username}'s` : `your`} profile.</h5>
                </div>
                <div className='col-6'>
                    { userParam && (
                        <button className='btn btn-info' onClick={handleClick}>
                            <p className='text-center'>Add Friend</p>
                        </button>
                    )}  
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <RecipeList recipes={user.recipes} title={`${user.username}'s Recipes`} />
                </div>
                <div className='col-sm-12 col-md-6'>
                    Friend List
                </div>
            </div>
        </>
    );
};

export default Profile;