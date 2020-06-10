import React from 'react';
import { render } from '@testing-library/react';
import Welcome from './Welcome';

describe('Welcome', () =>{
  it('Should get a welcome message on load', () => {
    const { getByText } = render(
      <Welcome />
    )
    const welcomeMessage1 = getByText('Welcome to le Chipôtlé, the premier stop for Americans living in Paris!', { exact: false })
    const welcomeMessage2 = getByText('Use this website to find out about the three Chipotles in Paris.', { exact: false })
    const welcomeMessage3 = getByText("Click 'Locations' in the navigation bar to view the Chipotles in Paris!", { exact: false })
    expect(welcomeMessage1).toBeInTheDocument();
    expect(welcomeMessage2).toBeInTheDocument();
    expect(welcomeMessage3).toBeInTheDocument();
  })
});

