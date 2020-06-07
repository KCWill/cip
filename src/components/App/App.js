import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Welcome from '../Welcome/Welcome.js';
import Overview from '../Overview/Overview.js';
import Instructions from '../Instructions/Instructions.js';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails.js';
import LineChooser from '../LineChooser/LineChooser.js';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount(){

    }

    render () {
        return (
            <main className='app'>
                <header className='top-bar'>
                    <h1>Le Chipôtlé</h1>
                    <NavLink to='/favorites' className='saved-trips-btn'>
                        View Saved Trips
                    </NavLink>
                    <NavLink to='/' className='home-button'>
                        Take Me Home
                    </NavLink>
                </header>
                <Route exact path='/' component={Welcome} />
                <Route path='/overview' component={Overview} />
                <Route path='/details/:restaurantId' component={RestaurantDetails} />
                <Route path='/navigate/:restaurantId' component={LineChooser} />
                <Route path='/navigate/:restaurantId/:originStation' component={Instructions} />
            </main>
        )
    }
}

export default App;
