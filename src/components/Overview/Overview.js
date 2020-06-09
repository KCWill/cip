import React from 'react';
import { NavLink } from 'react-router-dom';
import './Overview.css'


const Overview = () => { 
    return(
    <section>
      <h2>
        Chipotles in Paris
      </h2>
      <section className='restaurants-container'>
        <section className='restaurant-overview'>
          <h3>
            Montmartre
          </h3>
          <p>
            Located in the art district of Paris, Chipotle Montmartre is surrounded by many other American fast-food chains. 
          </p>
        <NavLink to='/details/montmartre' className='details-btn'>
          View Details
        </NavLink>
        </section>
        <section className='restaurant-overview'>
          <h3>
            Beaugrenelle
          </h3>
          <p>
            Directly on the Seine, this Chipotle in the Beaugrenelle Mall is a short walk from the Eiffel Tower and has a special secret.
          </p>
          <NavLink to='/details/beaugrenelle' className='details-btn'>
            View Details
          </NavLink>
        </section>
        <section className='restaurant-overview'>
          <h3>
            St. Germain
          </h3>
          <p>
            A few blocks from Notre-Dame de Paris and le Jardin du Luxembourg, kick back and eat a burrito with guac. You can afford the extra €s in St. Germain! 
          </p>
          <NavLink to='/details/stGermain' className='details-btn'>
            View Details
          </NavLink>
        </section>
      </section>
    </section>
    )
}

export default Overview;