import React from 'react';
import ListItem from './ListItem';

// Usage: 
//<Listing listType={'decimal'} kind={'ingredient'} items={}></Listing>
// or
//<Listing listType={'none'} kind={'instruction'} items={}></Listing>

class Listing extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: this.props?.items || [] ,
      newItem: ''
    }
    console.log(props)
  }

  // needs to be fat arrow for purposes of this.
  // do not change. >.<
  removeItem = (e) => {
    console.log(this)
    // com
    this.setState((state) => {
      return { 'items': state.items.filter(x => x !== e.value) }
    })

  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({'newItem': event.target.value})
  }


  addItem = () => {
    this.setState((state) => {
      return {
         'items': [...state.items, this.state.newItem],
         'newItem': ''
     }
    });
  }

  render() {
    const listItems = this.state.items.map((item) =>
      <ListItem
        key={item}
        value={item}
        onDelete={this.removeItem}
      ></ListItem>
    );
    return (
      <ol style={{ listStyleType: this.props.listType }}>
        {listItems}
        <input type="text" value={this.state.newItem} onChange={this.handleChange} />
        <button onClick={this.addItem}>
          Add {this.props.kind}
        </button>
      </ol>
    );
  }
}

export default Listing;