import React from 'react';

function ListItem(props) {
  return (<li key={props.key}>
    {props.value}
    <button className="btn btn-danger"
      onClick={() => { console.log("Beans") }}>
      Remove
    </button>
  </li>);

}

export default ListItem;
