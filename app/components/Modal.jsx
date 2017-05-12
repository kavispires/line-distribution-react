import React from 'react';

import { closeModal } from '../reducers/creator';

const Modal = ({message}) => {
  return (
    <div>
      {
        message ? (
          <div className="modal">
            <div className="modal-content">
              <p>{message}</p>
              <button className="btn btn-20" onClick={() => closeModal()}>OK</button>
            </div>
          </div>)
        : null
      }
    </div>
  );
};

export default Modal;
