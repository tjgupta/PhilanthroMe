import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Settings from './Settings';

xit('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>
  );
  wrapper.unmount();
});
