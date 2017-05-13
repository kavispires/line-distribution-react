import React from 'react';

import WhoAmI from './WhoAmI';
import Login from './login';

const Profile = () => {
	return (
		<div className="row">
      <h1>Profile</h1>
      <Login />
      <WhoAmI />
    </div>
	);
};

export default Profile;
