import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import SavedStations from './SavedStations.js';
import MutationObserver from '@sheerun/mutationobserver-shim';
import RestaurantData from '../../RestaurantData.js';
window.MutationObserver = MutationObserver;

describe('SavedStations', () => {
  it('Should have a list of favorites', () =>{
  const testFavorites = [{
          lineId:'100110006',
          stationName:'Raspail',
          stationId:'542',
          directionId: 'R',
          restaurantId: 'beaugrenelle'
    }]
    const {getByText}= render(
    <MemoryRouter>
      <SavedStations 
      savedStations={testFavorites}
      displayRestaurantName={()=> {return 'Beaugrenelle'}}
      />
    </MemoryRouter>
    )
    const favorite = getByText('Raspail', { exact: false });
    expect(favorite).toBeInTheDocument();
  });
});
