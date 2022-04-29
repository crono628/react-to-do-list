import React from 'react';

const Popup = ({ name, onChange, onClick, onSubmit, value }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div>New {name}:</div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={value} />
          <div>
            <button type="submit">Submit</button>
            <button onClick={onClick}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
