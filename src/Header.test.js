import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { shallow, render } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const user = {
    uid: '123'
  };
  ReactDOM.render(
    <MemoryRouter>
      <Header user={user} />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders logged in header if user is logged in', () => {
  const div = document.createElement('div');
  const user = {
    uid: '123'
  };
  const header = render(
    <MemoryRouter>
      <Header user={user} />
    </MemoryRouter>
  );

  const navItems = header.find('.App-nav a');
  expect(navItems).toHaveLength(2);
  expect(navItems.first().html()).toEqual('Settings');
  expect(navItems.last().html()).toEqual('Log out');
});

it('renders logged out header if user is logged out', () => {
  const div = document.createElement('div');
  const user = null;
  const header = render(
    <MemoryRouter>
      <Header user={user} />
    </MemoryRouter>
  );

  const navItems = header.find('.App-nav a');
  expect(navItems).toHaveLength(2);
  expect(navItems.first().html()).toEqual('Log in');
  expect(navItems.last().html()).toEqual('Sign up');
});
