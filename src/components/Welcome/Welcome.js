import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 

class Welcome extends Component {
  render() { 
    return (
      <section>
        <h2>Welcome!</h2>
        <NavLink to='/overview' className='nav'> Chipotles in Paris </NavLink>
      </section>
    )
  }
}

export default Welcome;