import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Profile from './Profile';
import Home from './Home';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  wrapper.unmount();
});

it('renders profile page when URL matches profile', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/u/tim']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Profile)).toHaveLength(1);
  expect(wrapper.find(Home)).toHaveLength(0);
  wrapper.unmount();
});
