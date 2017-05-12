import React from 'react';

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <p>Welcome back, {user.name}! <span className="btn logout icon-sign-out" onClick={logout} /></p>
  </div>
);

import {logout} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout}
)(WhoAmI);
