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

  render() {
    return (
      <div className="App">
        <h1>Produkty</h1>
        <div className="Container">

          <form>
            <input type="text" placeholder="Kod produktu" required></input>
            <input type="text" placeholder="Nazwa produktu" required></input>
            <input type="text" placeholder="Producent" required></input>
            <input type="text" placeholder="Kategoria" required></input>
            <input type="text" placeholder="Cena produktu" required></input>
            <input type="text" placeholder="Kod produktu" required></input>
          </form>

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
        </div>
      </div>
    );
  }
}

export default App;
