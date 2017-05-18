import React from 'react';

import Warning from './Warning';

const CreateBand = (props) => {

  const colorList = props.colorList;
  const editingBand = props.editingBand;
  const editingMember = props.editingMember;
  const newBandName = props.newBandName;
  const newMemberColor = props.newMemberColor;
  const newMemberName = props.newMemberName;
  const newMembers = props.newMembers;
  const publicStatus = props.publicStatus;
  const warning = props.warning;

  const checkBandName = props.checkBandName;
  const handleBandName = props.handleBandName;
  const handleMemberColor = props.handleMemberColor;
  const handleMemberName = props.handleMemberName;
  const handlePublicStatus = props.handlePublicStatus;
  const handleSubmit = props.handleSubmit;
  const handleUpdate = props.handleUpdate;
  const addCustomMember = props.addCustomMember;
  const editCustomMember = props.editCustomMember;
  const removeCustomMember = props.removeCustomMember;

  const addEditButtonName = editingMember ? 'Update' : 'Add';
  const pageTitle = editingBand ? newBandName : 'Create Band';

  return (
    <div className="row creator scrollable">
      <div className="row-container">
        <h2>{pageTitle}</h2>
        {
          editingBand ? null :
          <span>
            <input className="textfield" type="text" name="setname" placeholder="Define Band Name" onChange={handleBandName} onBlur={(event) => checkBandName(event)} /><br />
            {
              warning ? <Warning message={ warning.cb1 } /> : null
            }
          </span>
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
          newMembers.length < 20 ? <button className="btn btn-lg-mobile" type="submit" onClick={() => addCustomMember()}>{addEditButtonName} Member</button> : null
        }
        {
          editingMember ? <button className="btn btn-lg-mobile" type="button" onClick={() => removeCustomMember()}>Remove Member</button> : null
        }
        <hr />
        <h3>Members' List (<span>{newMembers.length}</span> of 20)</h3>
        {
          warning ? <Warning message={ warning.cb2 } /> : null
        }
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
        {
          editingBand ?
          <button className="btn btn-lg-mobile" onClick={() => handleUpdate()}>Update Set</button>
          :
          <button className="btn btn-lg-mobile" onClick={() => handleSubmit()}>Save Set</button>
        }
      </div>
    </div>
  );
};

export default CreateBand;
