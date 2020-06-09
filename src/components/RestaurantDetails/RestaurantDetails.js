import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


const RestaurantDetails = (props) => {

  const chooseRestaurant = () => {
    
  }

  return(
    <section>
      {chooseRestaurant()}
      <h2>Restaurant Details</h2>
      <section>
        Pics and stuff
      </section>
      <section>
        Information and stuff
      </section>
      <NavLink to={`/navigate/${props.restaurantId}`}>
        Navigate to this Location
      </NavLink>
    </section>
  )
}

export default RestaurantDetails;