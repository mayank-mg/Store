import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom';
import Productlist from'./components/Productlist';
import Default from'./components/Default';
import Cart from'./components/Cart';
import Details from'./components/Details';
import Navbar from'./components/Navbar';
import Modal from './components/Modal'
function App() {
  return (
  <React.Fragment>
   <Navbar />
   <Switch>
     <Route  exact path="/" component={Productlist}  />
     <Route  path="/details" component={Details}  />
     <Route  path="/cart" component={Cart}  />
     <Route  component={Default}  />
   </Switch>
  <Modal/>
  </React.Fragment>
  )
}

export default App;
