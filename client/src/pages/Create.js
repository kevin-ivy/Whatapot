import React, { useState } from 'react';
import Listing from '../components/Listing';
import { ADD_RECIPE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!")
  }

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');
  const [createRecipe, { error }] = useMutation(ADD_RECIPE);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await createRecipe({
        variables: {
          name,
          'ingredients': ingredients.split('\n'),
          steps: instructions.split('\n'),
          description
        }
      });
      window.location.pathname = '/profile'
    } catch (e) {
      console.error(e);
    }
  };
  return (<>
    <div className="container">
      <div className="row" >
        <form onSubmit={handleFormSubmit}
          style={{ width: '100%' }}>
          <div class="form-group">
            <label>Recipe Name:<br />
              <input type="text" style={{ width: '100%' }}
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }} />
            </label>
          </div>
          <br />
          <label htmlFor="description">
            Description:
                </label>
          <br />
          <textarea className="form-control" onChange={e => setDescription(e.target.value)} id="description">
          </textarea>
          <br />
          <label htmlFor="ingredients">
            Ingredients:
                </label>
          <br />
          <textarea className="form-control"
          rows="10" cols="40"
          onChange={e => setIngredients(e.target.value)}
          id="ingredients">
          </textarea>
          <br />
          <label htmlFor="instructions">
            Instructions:
          </label>
          <br />
          <textarea className="form-control"
          rows="10" cols="40"
          onChange={e => setInstructions(e.target.value)}
          id="instructions">
          </textarea>
          <br />
          <button className="btn btn-info w-100"
          type="submit" value="Submit">
            Submit
            </button>
        </form>
      </div>
    </div>
  </>)
}

export default Create;