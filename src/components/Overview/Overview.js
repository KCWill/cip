import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Overview extends Component { 
  render() {
    return(
    <section>
      <h2>Overview</h2>
      <NavLink to='/details/montmartre'>
        Montmartre
      </NavLink>
      <NavLink to='/details/beaugrenelle'>
        Beaugrenelle
      </NavLink>
      <NavLink to='/details/stGermain'>
        St. Germain
      </NavLink>
    </section>
    )
  }
}

export default Overview;