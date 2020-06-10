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

  it.skip('Should be able to go through app and add a favorite station', async () => {
    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const locations = getByText('Locations');
    fireEvent.click(locations);
    const viewDetails = getAllByText('View Details');
    fireEvent.click(viewDetails[1]);
    const findTrain = getAllByText('Find the Next Train to this Location!');
    fireEvent.click(findTrain);
    const m5 = await waitFor(()=>getByText('M5', {exact: false}));
    fireEvent.click(m5);
    const hoche = await waitFor(()=>getByText('Hoche'));
    fireEvent.click(hoche);
    const place = await waitFor(()=>getByText('Going towards Place', {exact: false}));
    fireEvent.click(place);
  })
})
