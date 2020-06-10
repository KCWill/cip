import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestaurantDetails from './RestaurantDetails.js';

describe('RestaurantDetails', () => {
  it('Should display restaurant title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <RestaurantDetails 
          restaurantId='beaugrenelle'
        />
      </BrowserRouter>
    )
    const title = getByText('Chipotle Beaugrenelle');
    expect(title).toBeInTheDocument();
  });

  it('Should display restaurant description and have a picture', () =>{
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <RestaurantDetails 
          restaurantId='beaugrenelle'
        />
      </BrowserRouter>
    )
    const description = getByText('This Chipotle is located in the Beaugrenelle Mall and is hands-down the best Chipotle in Paris.', { exact: false });
    const image = getByAltText('Beaugrenelle view')
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('Should have a button to find a train station', () =>{
    const { getByText } = render(
      <BrowserRouter>
        <RestaurantDetails 
          restaurantId='beaugrenelle'
        />
      </BrowserRouter>
    )
    const buttonText = getByText('Find the Next Train to this Location!', { exact: false });
    expect(buttonText).toBeInTheDocument();
  });
})
