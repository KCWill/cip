import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Overview from './Overview.js';

describe('Overview', () => {
  it('Should display title', () =>{
    const { getByText }  = render(
      <BrowserRouter>
        <Overview />
      </BrowserRouter>
    )
    const title = getByText('Chipotles in Paris');
    expect(title).toBeInTheDocument();
  })

  it('Should display three Chipotle locations and descriptions', () =>{
    const { getByText }  = render(
      <BrowserRouter>
        <Overview />
      </BrowserRouter>
    )
    const montmartre = getByText('Montmartre');
    const montmartreDescription = getByText('Located in the art district of Paris, Chipotle Montmartre is surrounded by many other American fast-food chains.');
    const beaugrenelle = getByText('Beaugrenelle');
    const beaugrenelleDescription = getByText('Directly on the Seine, this Chipotle in the Beaugrenelle Mall is a short walk from the Eiffel Tower and has a special secret.');
    const stGermain = getByText('St. Germain');
    const stGermainDescription = getByText('A few blocks from Notre-Dame de Paris and le Jardin du Luxembourg, kick back and eat a burrito with guac. You can afford the extra €s in St. Germain!');

    expect(montmartre).toBeInTheDocument();
    expect(montmartreDescription).toBeInTheDocument();
    expect(beaugrenelle).toBeInTheDocument();
    expect(beaugrenelleDescription).toBeInTheDocument();
    expect(stGermain).toBeInTheDocument();
    expect(stGermainDescription).toBeInTheDocument();
  })
  
  it('Should have a button to view more details', () => {
    const { getAllByText }  = render(
      <BrowserRouter>
        <Overview />
      </BrowserRouter>
    )
    const viewDetails = getAllByText('View Details');
    expect(viewDetails[0]).toBeInTheDocument();
    expect(viewDetails[1]).toBeInTheDocument();
    expect(viewDetails[2]).toBeInTheDocument();
  })
  
})
