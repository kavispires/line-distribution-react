import React from 'react';

const MyBands = ({myBands, favoriteBands, handleCreateBandClick, loadCurrentBand, deleteBand, editBand}) => {

  return (
    <div className="row scrollable">
      <div className="row-container">
        <h1>My Bands</h1>
        <p>Here you can create a new band, see your custom bands and the bands you favorited</p>
        <button onClick={() => handleCreateBandClick(false)}className="btn btn-center">Create New Band</button>
        <hr />
        <h2>Custom Bands <span className="h2-count">({ myBands.length })</span></h2>
        <table className="custom-bands">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Members</th>
              <th>Public</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              myBands && myBands.length ?
                myBands.map(band => {
                  const members = band.members.map(mmember => mmember.name).join(', ');
                  const publicStatus = band.public ? 'Yes' : 'No';
                  return (
                    <tr key={ band.id }>
                      <td onClick={() => loadCurrentBand(band.id)}>{ band.name }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ `OT${band.members.length}` }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ members }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ publicStatus }</td>
                      <td onClick={() => editBand(band.id)}><span className="icon icon-edit btn-icon" /></td>
                      <td onClick={() => deleteBand(band.id)}><span className="icon icon-trash btn-icon" /></td>
                    </tr>
                  );
                }) :
                <tr><td colSpan="6">No Custom Bands available.</td></tr>
            }
          </tbody>
        </table>
        <p><small>If you delete your public custom bands, your credit as creator will be removed, but the band will still be available in the search box for other users.</small></p>
        <h2>Favorite Bands <span className="h2-count">({ myBands.length })</span></h2>
        <table className="favorite-bands">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Members</th>
              <th>Distributions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              favoriteBands.length ?
                favoriteBands.map(band => {
                  const members = band.members.map(mmember => mmember.name).join(', ');
                  return (
                    <tr key={ band.id }>
                      <td onClick={() => loadCurrentBand(band.id)}>{ band.name }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ `OT${band.members.length}` }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ members }</td>
                      <td onClick={() => loadCurrentBand(band.id)}>{ `0` }</td>
                      <td><span className="icon icon-trash btn-icon" /></td>
                    </tr>
                  );
                }) :
                <tr><td colSpan="5">No Favorite Bands available.</td></tr>
            }
          </tbody>
        </table>
        <p><small>You will always have access to the public bands, unless the administrator have removed them.</small></p>
      </div>
    </div>
  );
};

export default MyBands;
