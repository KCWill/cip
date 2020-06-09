import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SavedStations.css';

class SavedStations extends Component {
  constructor(props) {
    super(props);

  }

  displayFavorites = (savedStations) => {
    const displayStations = savedStations.map((station, index) => { 
      return (
        <li className='list-stations' key={index}>
          <NavLink className='station-btn' to={`/navigate/${station.restaurantId}/${station.lineId}/${station.stationId}/${station.directionId}`}>
            {`${station.stationName} - Going to Chipotle ${this.props.displayRestaurantName(station.restaurantId)}`} 
          </NavLink>
        </li>
      )
    })
    return displayStations
  }


  render() {
    return(
      <section>
        <h2>Your Saved Stations</h2>
        <ul>
          {this.displayFavorites(this.props.savedStations)}
        </ul>
        {!this.props.savedStations.length && <h3>Add some stations!</h3>}
      </section>
    )
  }
}

export default SavedStations;