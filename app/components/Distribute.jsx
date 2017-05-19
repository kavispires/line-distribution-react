import React from 'react';
import { Link } from 'react-router';

import { getBoxSize, whosSinging } from '../utils';

import ResultsComponent from './Results';

const Distribute = ({currentBand, currentSingers, log, members, mouseUp, mouseDown, finish, reset, results, clearResults}) => {
	
	let boxSize = 0;
	if (currentBand.id) {
		boxSize = getBoxSize(currentBand.members.length);
	}

  let setCurrentSingers = whosSinging(currentSingers);
	
	return (
		<section className="row distribute scrollable">
		{
			currentBand.id ? (
				<div className="row-container">
          {
            results.length > 0 ? <ResultsComponent results={results} clearResults={clearResults} /> : null
          }
          <h2>{currentBand.name} <span className="change-band"><Link to="/search">change?</Link></span></h2>
          <nav>
            <button className="btn" onClick={() => reset()}><span className="icon-refresh" /> <span className="desktop-only">Reset</span></button>
            <button className="btn" onClick={() => console.log('remove last')}><span className="icon-trash" /> <span className="desktop-only">Remove Last</span></button>
            <button className="btn" onClick={() => console.log('decrease')} id="decrease"><span className="icon-remove" /> <span className="desktop-only">Decrease</span></button>
            <button className="btn" onClick={() => finish()}><span className="icon-complete" /> <span className="desktop-only">Finish</span></button>
            <button className="btn" onClick={() => console.log('help')}><span className="icon-question-circle" /> <span className="desktop-only">Help</span></button>
          </nav>

          <h3 className="who">{setCurrentSingers}</h3>
          <div className="progress">
          	{
          		members.map(member => (
          			<span key={member.id} className={`bar bar${member.id} w-${member.percentage} color-${member.color}`} />
          		))
          	}
          </div>

          <div className="boxes">
          	{
          		members.map((member, index) => (
          			<div key={member.id} className={`box box0 box-${boxSize} color-${member.color}`} onMouseDown={() => mouseDown(index)} onMouseUp={() => mouseUp(index)}>
		              <span className="box-key">{member.keyFace}</span><br />
		              <span className="box-name">{member.name}</span><br />
		              <span className="timestamp">{member.total} s</span>
		            </div>
		            )
          		)
          	}
          </div>
          <div className="log" data-bind="foreach: log">
            {
              log.map((member, i) => <span key={`${member.name}-${i}`}>{member.name}<span className="tooltip">{member.duration} s</span></span>)
            }
          </div>
        </div>  
			) :
			<p>No band selected.</p>
		}
		</section>
	);
};

export default Distribute;
