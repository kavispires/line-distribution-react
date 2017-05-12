import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header>
      <ul className="nav">
          <Link to="/profile">
            <span className="icon-user" />
            <br className="only-mobile" />
            <span className="menu-text"> Profile</span>
          </Link>
          <Link to="/mybands">
            <span className="icon-sets" />
            <br className="only-mobile" />
            <span className="menu-text"> My Bands</span>
          </Link>
          <Link to="/distribute">
            <span className="icon-bar-chart" />
            <br className="only-mobile" />
            <span className="menu-text"> Distribute</span>
          </Link>
          <Link to="/search">
            <span className="icon-search" />
            <br className="only-mobile" />
            <span className="menu-text"> Search</span>
          </Link>
      </ul>
    </header>
  );
};

export default Header;
