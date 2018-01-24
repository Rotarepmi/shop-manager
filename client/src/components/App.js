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
    this.fetchList();
  }

  fetchList = () => {
    fetch('/products/list')
      .then(res => res ? res.json() : console.log('server error'))
      .then(products => {
        this.setState({products});
      });
  }

  addProduct = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/prod', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  deleteProduct = (pcode, e) => {
    e.preventDefault();
    fetch('/prod/'+pcode, {
      method: 'DELETE'
    })
    .then(response => {if(response) this.fetchList()});
  }

  render() {
    return (
      <styles.MainDiv>
        <h1>Zarządzaj produktami w sklepie</h1>

        <h2>Dodaj produkt</h2>

        <form onSubmit={this.addProduct}>
          <styles.Input type="number" name="code" placeholder="Kod produktu" required />
          <styles.Input type="text" name="name" placeholder="Nazwa produktu" required />
          <styles.Input type="text" name="manufacturer" placeholder="Producent" required />
          <styles.Input type="text" name="category" placeholder="Kategoria" required />
          <styles.Input type="text" name="price" placeholder="Cena produktu" required />
          <styles.Input type="number" name="am" placeholder="Ilość" required />

          <button>Dodaj produkt</button>
        </form>

        <h2>Lista produktów</h2>
        <styles.Table>
          <tbody>
            <styles.TableRow>
              <styles.TableHeader>
                #
              </styles.TableHeader>
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
                Cena (z obniżką) zł
              </styles.TableHeader>
              <styles.TableHeader>
                Obniżka %
              </styles.TableHeader>
              <styles.TableHeader>
                Magazyn
              </styles.TableHeader>
              <styles.TableHeader>
                Sprzedano
              </styles.TableHeader>
            </styles.TableRow>

            {this.state.products.slice(0).reverse().map(product =>
              <styles.TableRow key={product._id}>
                <styles.TableData>
                  <styles.DeleteBtn type="button" data-code={product.code}
                    onClick={(e) => this.deleteProduct(product.code, e)}
                  >
                    X
                  </styles.DeleteBtn>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="number" name="code" value={product.code} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="text" name="name" value={product.name} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="text" name="manufacturer" value={product.manufacturer} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="text" name="category" value={product.category} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="text" name="manufacturer"
                      value={product.prod_sale.length > 0 ? (Math.round((product.prod_price[0].price * (100 - product.prod_sale[0].reduction))) / 100).toFixed(2) : product.prod_price[0].price}
                      required
                    />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="number" name="manufacturer"
                      value={product.prod_sale.length > 0 ? product.prod_sale[0].reduction : 0}
                      required
                    />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="number" name="category" value={product.prod_ware[0].am} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable>
                    <styles.InputTable type="number" name="manufacturer"
                      value={product.prod_sold.length > 0 ? product.prod_sold[0].amount : 0}
                      required
                    />
                  </styles.FormTable>
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
