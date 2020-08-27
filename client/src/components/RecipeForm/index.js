import React, { useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPE, QUERY_ME } from '../../utils/queries';



const RecipeForm = () => {
    const [recipeText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {
            try {
                // could potentially not exist yet, so wrap in a try...catch
                const { recipe } = cache.readQuery({ query: QUERY_RECIPE });
                cache.writeQuery({
                    query: QUERY_RECIPE,
                    data: { recipe: [addRecipe, ...recipe] }
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache, appending new thought to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, recipe: [...me.recipe, addRecipe] } }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            //add thought to DB
            await addRecipe({
                variables: { recipeText }
            });
            //clear frm value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">...Something Went Wrong!!!</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Here's a new thought..."
                    value={recipeText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
        </button>
            </form>
        </div>
    );
};

export default RecipeForm;