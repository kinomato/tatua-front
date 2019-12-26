import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationBar from './components/navbar';
// import PrivateRoute from './components/privateRoute';
import UserRoute from './components/userRoute';
import MainContent from './components/mainContent';
import AccessDenied from './components/accessDenied';
import Usercontent from './components/user/usercontent'
import Tst from './components/tst'
import CheckoutScreenKai from './components/order/checkoutScreenKai'
import { loadUser } from './actions/authAction';
import { getCartItems } from './actions/cartAction';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import ProductList from './components/admin/product/productList';
import UserList from './components/admin/user/userList';
import ToppingList from './components/admin/topping/toppList';
import PromoList from './components/admin/promo/promoList';
import ToppingDetail from './components/admin/topping/toppDetail';
import ProductDetail from './components/admin/product/productDetail';
import EditProduct from './components/admin/product/editProduct';
import UserDetail from './components/admin/user/userDetail';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getCartItems());
  }
  render() {
    return (
      
      <Provider store={store}>
        <div className="App">
          
          <NavigationBar />
          <ToastContainer />
          <Container fluid={true} style={{ marginTop: "1rem" }}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={MainContent} />
              <Route path="/admin/products/editProduct" component={EditProduct} /> 
              <Route path="/admin/products/:id" component={ProductDetail}></Route>                
              <Route path="/admin/products" component={ProductList} />          
              {/* <Route path="/test/shoppinglist" component={ShoppingList} /> */}
              <Route path="/forbidden" component={AccessDenied} />
              <Route path="/test" component={Tst} />
              <Route path="/admin/users/:id" component={UserDetail}></Route>
              <Route path="/admin/users" component={UserList}></Route>
              <Route path="/admin/toppings/:id" component={ToppingDetail}></Route>
              <Route path="/admin/toppings" component={ToppingList}></Route>
              <Route path="/admin/promos" component={PromoList}></Route>
              <UserRoute path="/cart/checkout"  component={CheckoutScreenKai}/>
              <UserRoute path="/account" component={Usercontent} />
              {/* <PrivateRoute path="/admin/orders/:id" component={OrderDetail}/>
              <PrivateRoute path="/admin/orders" component={Order}/>
              <PrivateRoute path="/admin/dashboard" component={Dashboard}/> */}
            </Switch>
          </Container>
        </div>
      </Provider>
    );
  }
}
export default App;
