/**
 * OBJECTIVES
 * There are only two requirements:
 * 1) List all the stores (from the API).
 * 2) Edit a store name (via the API).
 */

import React from 'react';
import Store from './Store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	brands: [],
	stores: []
    };
  }
  componentDidMount() {
      window.fetch('/api/brands')
	  .then(res => res.json())
	  .then(brands => this.setState({ brands: brands }));
      window.fetch('/api/stores')
      	  .then(res => res.json())
      	  .then(stores => this.setState({ stores: stores }));
  }
  render() {
    return (
      <div>
        <h2>Brands</h2>
        <ul>
          {this.state.brands.map(brand => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
        <h2>Stores</h2>
            <ul>
            {this.state.stores.map(store => (
		<Store id={store.id} name={store.name} /> 
          ))}
        </ul>
        {/* List the stores here. */}
      </div>
    );
  }
}

export default App;
