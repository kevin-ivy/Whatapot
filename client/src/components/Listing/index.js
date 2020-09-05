import React, {useState} from 'react';
import ListItem from './ListItem';

// Usage: 
//<Listing listType={'decimal'} kind={'ingredient'} items={}></Listing>
// or
//<Listing listType={'none'} kind={'instruction'} items={}></Listing>

function Listing(props) {
  // needs to be fat arrow for purposes of this.
  // do not change. >.<
  // removeItem = (e) => {

  // }

  // handleChange = (event) => {
  //   console.log(event.target.value)
  //   this.setState({'newItem': event.target.value})
  // }


  // addItem = () => {
  //   this.setState((state) => {
  //     return {
  //        'items': [...state.items, this.state.newItem],
  //        'newItem': ''
  //    }
  //   });
  // }
  const [items, setItems] = useState(props.items);
  console.log(props.items)
  const [item, setItem] = useState(0);

  console.log(props)
  const listItems = props?.items?.map((item) =>
    <ListItem
      key={item}
      value={item}
      onDelete={this.removeItem}
    ></ListItem>
  );

  return (
    <ol style={{ listStyleType: props.listType }}>
      {listItems}
      <input type="text" onChange={e => setItem(e.target.value)} />
      <button className="btn btn-primary" onClick={e => {
        const list = [...items, e.target.value];
        setItems(list);
        console.log(list)
      }}>
        Add {props.kind}
      </button>
    </ol>
  );
}

export default Listing;