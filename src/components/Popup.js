import React from 'react';

const Popup = ({ name, onChange, onClick, onSubmit, value }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div>New {name}:</div>
        <input onChange={onChange} value={value} />
        <form onSubmit={onSubmit}>
          <button type="submit">Submit</button>
          <button onClick={onClick}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
