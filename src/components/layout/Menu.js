import React from 'react';

const Menu = () => (
  <aside className="menu">
    <p className="menu-label">
      General
    </p>
    <ul className="menu-list">
      <li><span>Dashboard</span></li>
      <li><span>Customers</span></li>
    </ul>
    <p className="menu-label">
      Administration
    </p>
    <ul className="menu-list">
      <li><span>Team Settings</span></li>
      <li>
        <span className="is-active">Manage Your Team</span>
        <ul>
          <li><span>Members</span></li>
          <li><span>Plugins</span></li>
          <li><span>Add a member</span></li>
        </ul>
      </li>
      <li><span>Invitations</span></li>
      <li><span>Cloud Storage Environment Settings</span></li>
      <li><span>Authentication</span></li>
    </ul>
    <p className="menu-label">
      Transactions
    </p>
    <ul className="menu-list">
      <li><span>Payments</span></li>
      <li><span>Transfers</span></li>
      <li><span>Balance</span></li>
    </ul>
  </aside>
);

export default Menu;