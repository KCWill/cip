import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Instructions from './Instructions.js';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

describe('Instructions', () => {
  it('Should display title', async () =>{
    const mockAddSavedStation = jest.fn();
    const mockRemoveSavedStation = jest.fn();
    const mockDisplayRestaurantName = jest.fn();
    const testFavorites = [{
      lineId:'100110006',
      stationName:'Raspail',
      stationId:'542',
      directionId: 'R',
      restaurantId: 'beaugrenelle'
    }]
    const { getByText }  = render(
      <MemoryRouter>
        <Instructions 
          restaurantId='beaugrenelle'
          lineId='100110006'
          stationId='542'
          directionId='R'
          addSavedStation={mockAddSavedStation}
          removeSavedStation={mockRemoveSavedStation}
          displayRestaurantName={mockDisplayRestaurantName}
          favorites={testFavorites}
        />
      </MemoryRouter>
    )
    const title = getByText('Beaugrenelle');
    expect(title).toBeInTheDocument();
  });

});
