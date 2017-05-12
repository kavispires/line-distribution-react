import React from 'react';

import PopUpAlert from './PopUpAlert';
import Modal from './Modal';

const CreateBand = ({newBandName, newMembers, newMemberName, newMemberColor, publicStatus, colorList, handlePublicStatus, modalMessage, checkBandName, handleMemberName, handleMemberColor, addCustomMember, editCustomMember, removeCustomMember, alert, handleBandName, handleSubmit}) => {
  
  return (
    <div className="row creator">
      <Modal message={modalMessage} />
      <div className="row-container">
        <h2>Create Band</h2>
        <input className="textfield" type="text" name="setname" placeholder="Define Band Name" onChange={handleBandName} onBlur={(event) => checkBandName(event)} /><br />
        {
          alert ? <PopUpAlert message={ alert } /> : null
        }
        <div className="public-status">
          <input type="checkbox" checked={publicStatus} name="public" onChange={handlePublicStatus} /> Public
        </div>
        <hr />
        <input className="textfield" type="text" name="membername" placeholder="Add Member Name" value={newMemberName} maxLength="15" onChange={handleMemberName} />
        <p>Member Color:</p>
        <div className="color-picker">
          {
            colorList.map(color => {
              return (
                <div key={color} className={(newMemberColor === color) ? `box box-selected color-${color}` : `box color-${color}`} onClick={() => handleMemberColor(color)}></div>
              );
            })
          }
        </div>
        {
          newMembers.length < 20 ? <button className="btn btn-lg-mobile" type="submit" onClick={() => addCustomMember()}>Add Member</button> : null
        }
        {/*<button className="btn btn-lg-mobile" type="button" onClick={removeCustomMember}>Remove Member</button>*/}
        <hr />
        <h3>Members' List (<span>{newMembers.length}</span> of 20)</h3>
        <p className="text-details"><small>(To edit a member, click on its name.)</small></p>
        <ul className="members-list">
          {
            newMembers && newMembers.map(member => {
              return (
                <li key={member.name} className={`btn-mini color-${member.color}`} type="button" onClick={() => editCustomMember(member)}>{member.name}</li>
              );
            })
          }
        </ul>
        <hr />
        <button className="btn btn-lg-mobile" onClick={() => handleSubmit()}>Save Set</button>
      </div>
    </div>
  );
};

export default CreateBand;
