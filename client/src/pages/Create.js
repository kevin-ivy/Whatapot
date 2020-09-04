import React, { useState } from 'react';
import Listing from '../components/Listing';
import { ADD_RECIPE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import {Redirect, useParams} from 'react-router-dom';

function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!")
  }

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
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
      <div className="row">
        <form onSubmit={handleFormSubmit}>
          <div className="col-12">
            <label>Recipe Name:<br />
              <input type="text" onChange={(e) => {
                setName(e.target.value);
              }} />
            </label>
            {/* <Listing listType={'decimal'} kind={'ingredient'} items={ingredients}  />
            <Listing listType={'none'} kind={'instruction'} items={instructions} update={setInstructions} /> */}
            <br />
            <label htmlFor="description">
              Ingredients:
            </label>
            <br />
            <textarea rows="10" cols="40" onChange={e => setDescription(e.target.value)} id="description">
            </textarea>
            <br />
            <label htmlFor="ingredients">
              Ingredients:
            </label>
            <br />
            <textarea rows="10" cols="40" onChange={e => setIngredients(e.target.value)} id="ingredients">
            </textarea>
            <br />
            <label htmlFor="instructions">Instructions:</label>
            <br />
            <textarea rows="10" cols="40" onChange={e => setInstructions(e.target.value)} id="instructions">
            </textarea>
            <br />
            <button className="btn" type='submit' value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </>)

}

export default Create;