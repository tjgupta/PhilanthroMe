import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Profile match={{params: {username: 'tim'}}} />
    </MemoryRouter>);
  wrapper.unmount();
});
