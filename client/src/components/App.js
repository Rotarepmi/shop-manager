import React, { Component } from 'react';
import styles from './Style.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      prices: [],
      warehouse: [],
      sale: [],
      sold: []
    }
  }

  componentDidMount() {
    fetch('/products/list')
      .then(res => res.json())
      .then(products => {
        this.setState({products});
        console.log(products);
      });
  }

  addProduct = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/newProduct', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <styles.MainDiv>
        <h1>Zarządzaj produktami w sklepie</h1>

        <h2>Dodaj produkt</h2>

        <form onSubmit={this.addProduct}>
          <styles.Input type="number" name="code" placeholder="Kod produktu" required></styles.Input>
          <styles.Input type="text" name="name" placeholder="Nazwa produktu" required></styles.Input>
          <styles.Input type="text" name="manufacturer" placeholder="Producent" required></styles.Input>
          <styles.Input type="text" name="category" placeholder="Kategoria" required></styles.Input>
          <styles.Input type="text" name="price" placeholder="Cena produktu" required></styles.Input>
          <styles.Input type="number" name="am" placeholder="Ilość" required></styles.Input>

          <button>Dodaj produkt</button>
        </form>

        <h2>Lista produktów</h2>
        <styles.Table>
          <tbody>
            <styles.TableRow>
              <styles.TableHeader>
                Kod
              </styles.TableHeader>
              <styles.TableHeader>
                Nazwa
              </styles.TableHeader>
              <styles.TableHeader>
                Producent
              </styles.TableHeader>
              <styles.TableHeader>
                Kategoria
              </styles.TableHeader>
              <styles.TableHeader>
                Cena (z obniżką)
              </styles.TableHeader>
              <styles.TableHeader>
                Obniżka
              </styles.TableHeader>
              <styles.TableHeader>
                Magazyn
              </styles.TableHeader>
              <styles.TableHeader>
                Sprzedano
              </styles.TableHeader>
            </styles.TableRow>

            {this.state.products.map(product =>
              <styles.TableRow key={product._id}>
                <styles.TableData>
                  {product.code}
                </styles.TableData>
                <styles.TableData>
                  {product.name}
                </styles.TableData>
                <styles.TableData>
                  {product.manufacturer}
                </styles.TableData>
                <styles.TableData>
                  {product.category}
                </styles.TableData>
                <styles.TableData>
                  {product.prod_sale.length > 0 ? (Math.round((product.prod_price[0].price * (100 - product.prod_sale[0].reduction))) / 100).toFixed(2) : product.prod_price[0].price}zł
                </styles.TableData>
                <styles.TableData>
                  {product.prod_sale.length > 0 ? product.prod_sale[0].reduction : '--'}%
                </styles.TableData>
                <styles.TableData>
                  {product.prod_ware[0].am}
                </styles.TableData>
                <styles.TableData>
                  {product.prod_sold.length > 0 ? product.prod_sold[0].amount : '--'}
                </styles.TableData>
              </styles.TableRow>
            )}

          </tbody>
        </styles.Table>

      </styles.MainDiv>
    );
  }
}

export default App;
