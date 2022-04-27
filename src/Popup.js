import React from 'react';

const Popup = ({ name, onChange, onClick }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          Please name your {name}
          <button onClick={onClick}>X</button>
        </div>
        <input onChange={onChange} />
      </div>
    </div>
  );
};

export default Popup;
