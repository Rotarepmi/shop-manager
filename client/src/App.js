import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => {
        this.setState({products});
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Produkty</h1>
        <div className="Container">
          {this.state.products.map(product =>
            <li key={product._id}>{product.name} | {product.code} | {product.category} | {product.manufacturer}</li>
          )}
        </div>
      </div>
    );
  }
}

export default App;
