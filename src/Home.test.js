import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  wrapper.unmount();
});
