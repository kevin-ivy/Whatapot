import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_RECIPES } from '../utils/queries';
// import Auth from '../utils/auth';

const SingleRecipe = props => {
    const { id: recipeId } = useParams();
    console.log(recipeId);

    const { loading, data } = useQuery(QUERY_RECIPES, {
        variables: { id: recipeId }
    });

    const recipe = data?.recipe || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {recipe.username}
                    </span>{' '}
          recipe on {recipe.createdAt}
                </p>
                <div className="card-body">
                    <p>{recipe.recipeText}</p>
                </div>
            </div>

            {recipe.reactionCount > 0 && <RecipeList reactions={recipe.reactions} />}
            {/* {Auth.loggedIn() && <RecipeList recipeId={recipe._id} />} */}
        </div>
    );
};

export default SingleRecipe;