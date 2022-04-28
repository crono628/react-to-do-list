import React from 'react';

const Popup = ({ name, onChange, onClick, onSubmit, value }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div>New {name}:</div>
        <input onChange={onChange} value={value} />
        <div>
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
