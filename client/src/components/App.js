import React, { Component } from 'react';
import styles from './Style.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      totalPrice: [{totalPrice: null, count: null}]
    }
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    fetch('/products/list')
      .then(res => res ? res.json() : console.log('server error'))
      .then(products => {
        let allCats = [];
        products.map(product => allCats.push(product.category));
        const categories = [...new Set(allCats)];
        this.setState({products, categories});
      });
      
    this.categoryCount('all');
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

  editName = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/products/editName', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editManufacturer = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/products/editManufacturer', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editCategory = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/products/editCategory', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editPrice = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/prices/editPrice', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editSale = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/sale/editSale', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editWare = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/warehouse/editWare', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  editSold = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/sold/editSold', {
      method: 'POST',
      body: data
    })
    .then(response => {if(response) this.fetchList()});
  }

  sortList = (target, dir, e) => {
    e.preventDefault();
    if(dir) {
      fetch('/products/sortUp/'+target)
        .then(res => res ? res.json() : console.log('server error'))
        .then(products => {
          this.setState({products});
        });
    }
    else{
      fetch('/products/sortDown/'+target)
        .then(res => res ? res.json() : console.log('server error'))
        .then(products => {
          this.setState({products});
        });
    }
  }

  categoryAggr = (event) => {
    event.preventDefault();
    const select = document.querySelector('select');
    const category = select.options[select.selectedIndex].value;
    fetch('/products/categoryAggr/'+category)
      .then(res => res ? res.json() : console.log('server error'))
      .then(products => {
        this.setState({products});
      });

    this.categoryCount(category);
  }

  categoryCount = (category) => {
    fetch('/products/categoryCount/'+category)
      .then(res => res ? res.json() : console.log('server error'))
      .then(totalPrice => {
        console.log(totalPrice);
        this.setState({totalPrice});
      });
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

        <form onSubmit={this.categoryAggr}>
          <select name="category">
            {this.state.categories.map((category, index) =>
              <option key={index} value={category}>{category}</option>
            )}
          </select>

          <button>Wyszukaj kategorię</button>
        </form>

        <p>
          Unikalnych produktów: {this.state.totalPrice[0].count}
        </p>
        <p>
          Wartość łączna: {this.state.totalPrice[0].totalPrice}zł
        </p>

        <styles.Table>
          <tbody>
            <styles.TableRow>
              <styles.TableHeader>
                #
              </styles.TableHeader>
              <styles.TableHeader>
                Kod
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('code', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('code', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Nazwa
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('name', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('name', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Producent
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('manufacturer', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('manufacturer', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Kategoria
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('category', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('category', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Cena (przed obniżką) zł
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_price.price', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_price.price', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Obniżka %
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_sale.reduction', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_sale.reduction', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Cena (po obniżce) zł
              </styles.TableHeader>
              <styles.TableHeader>
                Magazyn
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_ware.am', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_ware.am', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
              </styles.TableHeader>
              <styles.TableHeader>
                Sprzedano
                <div>
                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_sold.amount', true, e)}
                  >
                    &uarr;
                  </styles.SortBtn>

                  <styles.SortBtn type="button"
                    onClick={(e) => this.sortList('prod_sold.amount', false, e)}
                  >
                    &darr;
                  </styles.SortBtn>
                </div>
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
                  {product.code}
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editName}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="text" name="name" defaultValue={product.name} />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editManufacturer}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="text" name="manufacturer" defaultValue={product.manufacturer} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editCategory}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="text" name="category" defaultValue={product.category} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editPrice}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="text" name="price"
                      defaultValue={product.prod_price[0].price}
                      required
                    />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editSale}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="number" name="sale"
                      defaultValue={product.prod_sale.length > 0 ? product.prod_sale[0].reduction : 0}
                      required
                    />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  {product.prod_sale.length > 0 ? (Math.round((product.prod_price[0].price * (100 - product.prod_sale[0].reduction))) / 100).toFixed(2) : product.prod_price[0].price}
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editWare}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="number" name="warehouse" defaultValue={product.prod_ware[0].am} required />
                  </styles.FormTable>
                </styles.TableData>
                <styles.TableData>
                  <styles.FormTable onSubmit={this.editSold}>
                    <input type="hidden" name="code" defaultValue={product.code} required />
                    <styles.InputTable type="number" name="sold"
                      defaultValue={product.prod_sold.length > 0 ? product.prod_sold[0].amount : 0}
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
