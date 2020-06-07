import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Welcome from '../Welcome/Welcome.js';
import Overview from '../Overview/Overview.js';
import Instructions from '../Instructions/Instructions.js';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails.js';
import LineChooser from '../LineChooser/LineChooser.js';
import './App.css';
import { getLines } from '../../apiCalls.js';

class App extends Component {
    constructor() {
        super();
        this.state = {

        }
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
                <Route path='/details/:restaurantId' render={({ match }) => {
                    const { restaurantId } = match.params;
                    return <RestaurantDetails restaurantId={restaurantId}/>
                }} />
                <Route exact path='/navigate/:restaurantId' render={({ match }) => {
                    const { restaurantId } = match.params;
                    return <LineChooser restaurantId={restaurantId} />
                }}/>
                <Route exact path='/navigate/:restaurantId/:lineId' render={({ match }) => {
                    const { restaurantId, lineId} = match.params;
                    return <LineChooser restaurantId={restaurantId} lineId={lineId}/>
                }}/>
                <Route exact path='/navigate/:restaurantId/:lineId/:stationId' render={({ match }) => {
                    const { restaurantId, lineId, stationId} = match.params;
                    return <LineChooser restaurantId={restaurantId} lineId={lineId} stationId={stationId}/>
                }}/>
                <Route 
                exact path='/navigate/:restaurantId/:lineId/:stationId/:directionId'
                render={({ match }) => {
                    const { restaurantId, lineId, stationId, directionId} = match.params;
                    return <Instructions restaurantId={restaurantId} lineId={lineId} stationId={stationId} directionId={directionId}/>
                }}/>

            </main>
        )
    }
}

export default App;
