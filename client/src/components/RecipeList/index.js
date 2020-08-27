import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipe, title }) => {
    if (!recipe.length) {
        return <h3>No Thoughts Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {recipe &&
                recipe.map(recipe => (
                    <div key={recipe.id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${recipe.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {recipe.username}
                            </Link>{' '}
                            recipe on {recipe.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/thought/${recipe._id}`}>
                                <p>{recipe.thoughtText}</p>
                                <p className="mb-0">
                                    Reactions: {recipe.reactionCount} || Click to{' '} {recipe.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RecipeList;