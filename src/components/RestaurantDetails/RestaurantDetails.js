import React from 'react';
import { NavLink } from 'react-router-dom';
import './RestaurantDetails.css';
import restaurantData from '../../RestaurantData.js';
import PropTypes from 'prop-types';

const RestaurantDetails = (props) => {
  const chooseRestaurant = () => {
    return (
      <section className='restaurant-container'>
        <section className='images'>
          <img alt={`${restaurantData[props.restaurantId].name} view`} src={restaurantData[props.restaurantId].imageURL} />
        </section>
        <section className='details'>
          <h2>
            {`Chipotle ${restaurantData[props.restaurantId].name}`}
          </h2>
          <p>
            {restaurantData[props.restaurantId].description}
          </p>
          <p>
            {restaurantData[props.restaurantId].address}
          </p>
          <NavLink to={`/navigate/${props.restaurantId}`} className='navigate-btn'>
            Find the Next Train to this Location! 
          </NavLink>
        </section>
      </section>
    )
  }

  return(
    <section>
      {chooseRestaurant()}
    </section>
  )
}

export default RestaurantDetails;

RestaurantDetails.propTypes = {
  restaurantId: PropTypes.string,
}