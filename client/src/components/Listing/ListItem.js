import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super();
    console.log(props)
  }

  render() {
    return (<li key={this.props.key}>
      {this.props.value}
      <button onClick={() => { this.props.onDelete(this.props) }}>
        Remove
      </button>
    </li>);
  }
}

export default ListItem;
