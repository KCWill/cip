import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import Welcome from '../Welcome/Welcome.js';
import Overview from '../Overview/Overview.js';
import Instructions from '../Instructions/Instructions.js';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails.js';
import LineChooser from '../LineChooser/LineChooser.js';
import SavedStations from '../SavedStations/SavedStations.js';
import './App.css';
import restaurantData from '../../RestaurantData.js';

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
    return restaurantData[restaurantId].name
  }

  render () {
    return (
      <main className='app'>
        <header className='top-bar'>
          <h1>le Chipôtlé</h1>
          <hr />
            <section className='nav-container'>
            <NavLink exact to='/' className='nav-btn' activeClassName='nav-btn-active'>
              Home
            </NavLink>
            | 
            <NavLink to='/overview' className='nav-btn' activeClassName='nav-btn-active'>
              Locations
            </NavLink>
            | 
            <NavLink to='/savedstations' className='nav-btn' activeClassName='nav-btn-active'>
              Saved Trips
            </NavLink>
            </section>
        </header>
        <section className='main-content'>
        <Route exact path='/' component={Welcome} />
        <Route path='/overview' component={Overview} />
        <Route path='/details/:restaurantId' render={({ match }) => {
          const { restaurantId } = match.params;
          return <RestaurantDetails restaurantId={restaurantId}/>
        }} />
        <Route exact path='/navigate/:restaurantId' render={({ match }) => {
          const { restaurantId } = match.params;
          return <LineChooser 
          restaurantId={restaurantId} 
          />
        }}/>
        <Route exact path='/navigate/:restaurantId/:lineId' render={({ match }) => {
          const { restaurantId, lineId} = match.params;
          return <LineChooser 
          key={window.location.pathname} 
          restaurantId={restaurantId} 
          lineId={lineId}/>
        }}/>
        <Route exact path='/navigate/:restaurantId/:lineId/:stationId' render={({ match }) => {
          const { restaurantId, lineId, stationId} = match.params;
          return <LineChooser 
          key={window.location.pathname} 
          restaurantId={restaurantId} 
          lineId={lineId} 
          stationId={stationId}/>
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
        </section>
      </main>
    )
  }
}

export default App;
