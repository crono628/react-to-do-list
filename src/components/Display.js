import React from 'react';
import uniqid from 'uniqid';

const Display = ({ toDo, onClick }) => {
  const renderList = toDo.map((item) => (
    <div onClick={() => onClick} key={uniqid()}>
      {item.task}
    </div>
  ));

  return <div className="display">{renderList}</div>;
};

Display.defaultProps = {
  toDo: [],
};

export default Display;
