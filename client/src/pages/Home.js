import React from 'react';
//dependenceies to Integrate ApolloHooks
import { useQuery } from '@apollo/react-hooks';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';
//import to see logged in users friends list 
import { QUERY_RECIPES, QUERY_ME_BASIC } from '../utils/queries';
import FriendList from '../components/FriendsList';
import Auth from '../utils/auth';




const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipe = data?.recipe || [];
    const loggedIn = Auth.loggedIn();

    // use object destructuing to extract 'data' from the 'useQuery' hook's response and rename it 'userdata' to be more descriptive
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    return (
        <main>
            <div className='flex-row justify-space-between'>
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <RecipeForm />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div> Loading...</div>
                    ) : (
                            <RecipeList thoughts={recipe} title="Some Recipes for Food..." />
                        )}
                </div>
                {loggedIn && userData ? (
                    <div className="col-12 col-lg-3 mb-3">
                        <FriendList
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                        />
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default Home;