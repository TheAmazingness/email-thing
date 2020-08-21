import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <aside className="menu">
    <p className="menu-label">
      <i className="fas fa-inbox" />
      &nbsp;
      Mail
    </p>
    <ul className="menu-list">
      <li>
        <Link to="/inbox">
          <i className="fas fa-inbox" />
          &nbsp;
          Inbox
        </Link>
      </li>
      <li>
        <Link to="/compose">
          <i className="fas fa-edit" />
          &nbsp;
          Compose
        </Link>
      </li>
    </ul>
    <p className="menu-label">
      <i className="fas fa-cogs" />
      &nbsp;
      Settings
    </p>
    <ul className="menu-list">
      <li>
        <Link to="/settings">
          <i className="fas fa-cog" />
          &nbsp;
          Settings
        </Link>
      </li>
    </ul>
  </aside>
);

export default Menu;