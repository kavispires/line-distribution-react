import React from 'react';

const Results = ({results, clearResults}) => {
	return (
    <div className="modal modal-results">
      <div className="results">
        <h3>Results</h3>
        <div className="results-ranking">
          {
            results.map((member, i) => (
            <div className="result" key={member.id}>
              <div className={`result-bar w-${member.relativePercentage} color-${member.color}`} />
              <div className="result-info">#<span className="position">{i + 1}</span> <span className="name">{member.name}</span> [ <span className="percentage">{member.percentage}</span>% ] [ <span className="timestamp">{member.total}</span>s ]</div>
            </div>
            ))
          }
        </div>
        <button className="btn" type="button" onClick={clearResults}>Close</button>
      </div>
    </div>
	);
};

export default Results;
