import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class RestaurantDetails extends Component { 
  render() {
    return(
      <section>
        <h2>Restaurant Details</h2>
        <section>
          Pics and stuff
        </section>
        <section>
          Information and stuff
        </section>
        <NavLink to={`/navigate/${this.props.restaurantId}`}>
          Navigate to this Location
        </NavLink>
      </section>
    )
  }
}

export default RestaurantDetails;