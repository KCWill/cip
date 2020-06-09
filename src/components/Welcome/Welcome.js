import React, { Component } from 'react'; 
import './Welcome.css';

class Welcome extends Component {
  render() { 
    return (
      <section className='welcome-page'>
        <h2>Bienvenue !</h2>
        <p className='welcome-message'>
          Welcome to le Chipôtlé, the premier stop for Americans living in Paris! This site was created by a Coloradan who grew up eating Chipotle every chance he got. While he was working in Paris, he became a bit homesick and ventured to the Chipotle in Montmartre. The industrial décor, the line of ingredients protected by glass, the friendly staff, and even the Tabasco Chipotle Pepper Sauce was all there. This mini Coloradan Embassy was the answer to his homesick feeling. 
        </p>
        <p className='welcome-message'>
          Use this website to find out about the three Chipotles in Paris. Each is unique and have some important differences (really!). View the locations' details and get directions using the Paris Métro. 
        </p>
        <p className='welcome-message'>
          Click 'Locations' in the navigation bar to view the Chipotles in Paris!
        </p>
      </section>
    )
  }
}

export default Welcome;