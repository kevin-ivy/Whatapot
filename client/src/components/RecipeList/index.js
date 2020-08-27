import React from 'react';
import {Link} from 'react-router-dom';

const RecipeList = ({recipes, title}) => {
    if (!recipes.length) {
        return <h3 className='mb-3 col-12 text-center'>No recipes submitted yet.</h3>
    }

    return (
        <div className='row justify-content-center'>
            <h3 className='mb-3 col-12 text-center'>{title}</h3>
            {recipes && recipes.map(recipe => (
                <div key={recipe._id} className='card m-2 col-sm-12 col-md-3'>
                    <p className='card-header'>
                        <Link
                            to={`/recipe/${recipe._id}`}
                            style={{fontWeight: 700}}
                            className='text-dark'>
                                {recipe.name}
                        </Link>
                            <p>Created by {recipe.username} on {recipe.createdAt}</p>
                    </p>
                    <div className='card-body'> 
                        <p>{recipe.description}</p>
                        <p className='mb-0'>Reviews: {recipe.reviewCount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;