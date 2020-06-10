import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Instructions from './Instructions.js';
import MutationObserver from '@sheerun/mutationobserver-shim';
import RestaurantData from '../../RestaurantData.js';
window.MutationObserver = MutationObserver;

describe('Instructions', () => {
  it('Should display station name and correct line ', async () =>{
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
    expect(mockDisplayRestaurantName).toHaveBeenCalledWith('beaugrenelle')
  });

  it.skip('Should allow user to add station as favorite', async () =>{
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
          displayRestaurantName={()=>{return 'Beaugrenelle'}}
          favorites={testFavorites}
        />
      </MemoryRouter>
    )
    const addFavorite = await waitFor(()=>getByText('Favorite This Station'));
    fireEvent.click(addFavorite);
    expect(mockAddSavedStation).toHaveBeenCalledWith('100110006','Raspail','542','R','beaugrenelle');
  });

});
