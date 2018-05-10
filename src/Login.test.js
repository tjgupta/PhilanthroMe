import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  wrapper.unmount();
});
