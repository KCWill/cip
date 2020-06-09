import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Welcome from '../Welcome/Welcome.js';
import Overview from '../Overview/Overview.js';
import Instructions from '../Instructions/Instructions.js';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails.js';
import LineChooser from '../LineChooser/LineChooser.js';
import SavedStations from '../SavedStations/SavedStations.js';
import './App.css';
import { getLines } from '../../apiCalls.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      }
  }

  addSavedStation = (lineId, stationName, stationId, directionId, restaurantId) => {
    const newFavorite = {
      lineId,
      stationName,
      stationId,
      directionId,
      restaurantId
    }
    this.setState({ favorites: [...this.state.favorites, newFavorite] })
  }

  removeSavedStation = (stationId) => {
    const updatedSavedStations = this.state.favorites.filter((station) => {
      return station.stationId !== stationId });
            
    this.setState({favorites: [...updatedSavedStations]});
  }

  displayRestaurantName = (restaurantId) => {
    if (restaurantId === 'beaugrenelle'){
      return 'Beaugrenelle'
    } else if (restaurantId === 'stGermain'){
      return 'St. Germain'
    } else {
      return 'Montmartre'
    }
  }

  render () {
    return (
      <main className='app'>
        <header className='top-bar'>
          <h1>Le Chipôtlé</h1>
          <NavLink to='/savedstations' className='saved-trips-btn'>
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
          return <LineChooser key={window.location.pathname} restaurantId={restaurantId} lineId={lineId}/>
        }}/>
        <Route exact path='/navigate/:restaurantId/:lineId/:stationId' render={({ match }) => {
          const { restaurantId, lineId, stationId} = match.params;
          return <LineChooser key={window.location.pathname} restaurantId={restaurantId} lineId={lineId} stationId={stationId}/>
        }}/>
        <Route 
          exact path='/navigate/:restaurantId/:lineId/:stationId/:directionId'
          render={({ match }) => {
            const { restaurantId, lineId, stationId, directionId} = match.params;
            return <Instructions 
            restaurantId={restaurantId} 
            lineId={lineId} 
            key={window.location.pathname} 
            stationId={stationId} 
            directionId={directionId} 
            addSavedStation={this.addSavedStation}
            removeSavedStation={this.removeSavedStation}
            restaurantId={restaurantId}
            displayRestaurantName={this.displayRestaurantName}
            favorites={this.state.favorites}
            />
          }}/>
        <Route 
          exact path='/savedstations' 
          render={()=><SavedStations
            savedStations={this.state.favorites}
            displayRestaurantName={this.displayRestaurantName}
          />}
        />
      </main>
    )
  }
}

export default App;
