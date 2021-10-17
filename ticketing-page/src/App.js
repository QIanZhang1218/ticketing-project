import React from "react";
import {Route} from 'react-router-dom';
import './App.css';
import HeaderNavBar from '../src/Components/HeaderNavBar/HeaderNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-bootstrap/Switch";
import HomePage from "./Components/HomePage/HomePage";
import SportsEvent from '../src/Components/Sports/Sports';
import MusicEvents from  '../src/Components/Music/Music';
import SportsDetails from './Components/Details/Details';
import PlaceOrder from './Components/Order/Order';
import Checkout from './Components/CheckOut/CheckOut';
import ETicket from './Components/ETicket/Eticket';


function App() {
  return (
    <div className="App">
      <HeaderNavBar />
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path='/sports' component={SportsEvent}/>
            <Route path='/music' component={MusicEvents}/>
            <Route path='/detail' component={SportsDetails}/>
            <Route path='/order' component={PlaceOrder} />
            <Route path='/checkout' component={Checkout}/>
            <Route path='/eTicket' component={ETicket} />
            {/*<Route path="/Sports/Details" component={Details} />*/}
        </Switch>
    </div>

  );
}

export default App;
