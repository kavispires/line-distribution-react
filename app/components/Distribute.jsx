import React from 'react';

const Distribute = ({currentBand}) => {
	console.log(currentBand);
	let members;
	if (currentBand.id) {
		members = currentBand.members.map(m => m.name).join(', ');
	}
	return (
		<div className="row">
		{
			currentBand.id ? (
				<div>
		      <h1>{currentBand.name}'s Line Distribution</h1>
		      <h3>{members}</h3>
		    </div>
		    
			) :
			<p>No band selected.</p>
		}
		</div>
	);
};

export default Distribute;
