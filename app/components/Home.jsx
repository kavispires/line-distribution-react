import React from 'react';
import { Link } from 'react-router';

import WhoAmI from './WhoAmI';
import Login from './login';

const Home = ({user}) => {
  return (
    <div className="row home">
      <img className="logo" src="/img/line-distribution-logo.svg" />
      <div className="loading-log">
        {
          user && user.name ?
          (
            <WhoAmI />
          ) : (
            <div>
              <p>Calculate how much the members of that band you love sing on each song.</p>
              <Login />
              <Link to="/signup">I don't have an account</Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

import {connect} from 'react-redux';

export default connect(
  ({ auth }) => ({ user: auth }),
  {}
)(Home);
