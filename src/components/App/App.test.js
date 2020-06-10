import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Should display title, navigation bar, and welcome on load', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const title = getByText('le Chipôtlé');
    const welcome = getByText('Bienvenue !');
    const locations = getByText('Locations');
    const home = getByText('Home');
    const savedTrips = getByText('Saved Trips');

    expect(title).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
    expect(locations).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(savedTrips).toBeInTheDocument();
  });

  it('Should display locations view on click', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const locations = getByText('Locations');
    fireEvent.click(locations);
    const chipotlesInParis = getByText('Chipotles in Paris');
    expect(chipotlesInParis).toBeInTheDocument();
  })

})
