import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import LineChooser from './LineChooser.js';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

describe('LineChooser', () => {
  it('Should display title', async () =>{
    const { getByText }  = render(
      <MemoryRouter>
        <LineChooser 
          restaurantId='beaugrenelle'
        />
      </MemoryRouter>
    )
    const title = await waitFor(()=>getByText('Métro Station Selector'));
    const restaurantName = await waitFor(()=>getByText('Beaugrenelle'));
    expect(title).toBeInTheDocument();
    expect(restaurantName).toBeInTheDocument();
  });

  it('Should display intructions on how to select station and show a map', async () =>{
    const { getByText, getByAltText }  = render(
      <MemoryRouter>
        <LineChooser 
          restaurantId='beaugrenelle'
        />
      </MemoryRouter>
    )
    const instructions = await waitFor(()=>getByText('Use the map below to find a station near the Chipotle marked with a red star.', { exact: false }));
    const mapImage = await waitFor(()=>getByAltText('Paris Metro Map'));
    expect(instructions).toBeInTheDocument();
    expect(mapImage).toBeInTheDocument();
  });

  it('Should display métro lines', async () => {
    const { getByText }  = render(
      <MemoryRouter>
        <LineChooser 
          restaurantId='beaugrenelle'
          lineId='100110006'
          stationId='542'
        />
      </MemoryRouter>
    )
    const m6Line = await waitFor(() => getByText('M6 - Charles', { exact: false }));
    expect(m6Line).toBeInTheDocument();
  });

  it('Should display métro stations on a selected line', async () => {
    const { getByText }  = render(
      <MemoryRouter>
        <LineChooser 
          restaurantId='beaugrenelle'
          lineId='100110006'
        />
      </MemoryRouter>
    )
    const m6Line = await waitFor(() => getByText('M6 - Charles', { exact: false }));
    fireEvent.click(m6Line)
    const corvisart = await waitFor(() => getByText('Corvisart', { exact: false }));
    expect(corvisart).toBeInTheDocument();
  });

  it('Should display métro directions after selecting station', async () => {
    const { getByText }  = render(
      <MemoryRouter>
        <LineChooser 
          restaurantId='beaugrenelle'
          lineId='100110006'
          stationId='542'
        />
      </MemoryRouter>
    )
    const m6Line = await waitFor(() => getByText('M6 - Charles', { exact: false }));
    fireEvent.click(m6Line)
    const corvisart = await waitFor(() => getByText('Corvisart', { exact: false }));
    fireEvent.click(corvisart)
    const direction = await waitFor(() => getByText('Going towards Nation', { exact: false }))
    expect(direction).toBeInTheDocument();
  });

});
