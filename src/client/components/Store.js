import React from 'react';

class Store extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      editing: false,
    };
  }
  
  toggleEditing() {
    this.setState( { editing: true } );
  }

  handleEditItem() {
    let id = this.state.id;
    let name = this.refs[ `name_${ id }` ].value;
    let store = this;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
	store.setState( { editing: false, name: name } );
      }
    };
    xhttp.open("PUT", "/api/stores/" + id + "?name=" + name, true);
    xhttp.send();
  }

  render() {
    if( this.state.editing ) {
      return (
	  <li key={this.state.id}
	  >
	  <input
	type="text"
	name="title"
       	ref={ `name_${this.state.id}` }
	defaultValue={ this.state.name }
	  />
	  <button onClick={ this.handleEditItem.bind(this) } label="Update Item">Update Item</button>
	  </li>
      );
    } 
    return (
      <li
        key={this.state.id}
        onClick={this.toggleEditing.bind(this)}
        >
        {this.state.name}</li>
    );
  }
}

export default Store;
