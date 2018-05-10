import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  wrapper.unmount();
});
