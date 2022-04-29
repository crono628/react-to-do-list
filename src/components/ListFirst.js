import React from 'react';

const ListFirst = ({ onClick }) => {
  return (
    <div className="modal">
      <div onClick={onClick} className="modal-content">
        <div>
          Please select a list first
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ListFirst;
