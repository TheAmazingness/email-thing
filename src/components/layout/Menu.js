import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <aside className="menu">
    <p className="menu-label">
      Mail
    </p>
    <ul className="menu-list">
      <li><Link to="/inbox">Inbox</Link></li>
      <li><Link to="/compose">Compose</Link></li>
    </ul>
  </aside>
);

export default Menu;