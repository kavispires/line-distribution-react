import React from 'react';
import { Link } from 'react-router';

import { getBoxSize } from '../utils';

const Distribute = ({currentBand}) => {
	
	let boxSize = 0;
	if (currentBand.id) {
		boxSize = getBoxSize(currentBand.members.length);
	}

	const boxCode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
	
	return (
		<section className="row distribute scrollable">
		{
			currentBand.id ? (
				<div className="row-container">
          <h2>{currentBand.name} <span className="change-band"><Link to="/search">change?</Link></span></h2>
          <nav>
            <button className="btn" onClick={() => console.log('reset')}><span className="icon-refresh" /> <span className="desktop-only">Reset</span></button>
            <button className="btn" onClick={() => console.log('remove last')}><span className="icon-trash" /> <span className="desktop-only">Remove Last</span></button>
            <button className="btn" onClick={() => console.log('decrease')} id="decrease"><span className="icon-remove" /> <span className="desktop-only">Decrease</span></button>
            <button className="btn" onClick={() => console.log('finish')}><span className="icon-complete" /> <span className="desktop-only">Finish</span></button>
            <button className="btn" onClick={() => console.log('help')}><span className="icon-question-circle" /> <span className="desktop-only">Help</span></button>
          </nav>

          <h3 className="who">Nayeon is singing.</h3>
          <div className="progress">
          	{
          		currentBand.members.map(member => {
          			<span key={member.id} className={`bar bar${member.id} w-5 ${member.color}`} />
          		})
          	}
          </div>

          <div className="boxes">
          	{
          		currentBand.members.map((member, i) => (
          			<div key={member.id} className={`box box0 box-${boxSize} color-${member.color}`}>
		              <span className="box-key">{boxCode[i]}</span><br />
		              <span className="box-name">{member.name}</span><br />
		              <span className="timestamp">0</span>
		            </div>
		            )
          		)
          	}
          </div>
          <div className="log" data-bind="foreach: log">
            <a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a><a>Nayeon</a><a>Jihyo</a><a>Sana</a><a>Jihyo</a><a>Nayeon</a>
          </div>
        </div>  
			) :
			<p>No band selected.</p>
		}
		</section>
	);
};

export default Distribute;
