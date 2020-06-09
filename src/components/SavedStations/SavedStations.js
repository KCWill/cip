import React from 'react';
import { NavLink } from 'react-router-dom';
import './SavedStations.css';
import PropTypes from 'prop-types';

const SavedStations = (props) => {
  const displayFavorites = (savedStations) => {
    const displayStations = savedStations.map((station, index) => { 
      return (
        <li className='list-stations' key={index}>
          <NavLink className='station-btn' to={`/navigate/${station.restaurantId}/${station.lineId}/${station.stationId}/${station.directionId}`}>
            {`${station.stationName} - Going to Chipotle ${props.displayRestaurantName(station.restaurantId)}`} 
          </NavLink>
        </li>
      )
    })
    return displayStations
  }

  return(
    <section>
      <h2>Your Saved Trips</h2>
      <ul>
        {displayFavorites(props.savedStations)}
      </ul>
      {!props.savedStations.length && <h3>Add some stations!</h3>}
    </section>
  )
}

export default SavedStations;

SavedStations.propTypes = {
  savedStations: PropTypes.arrayOf(PropTypes.object),
  displayRestaurantName: PropTypes.func,
}