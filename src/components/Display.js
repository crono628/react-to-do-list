import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Display = ({ toDo, onDelete, onEdit }) => {
  const [toggle, setToggle] = useState(Array(toDo.length).fill(false));

  useEffect(() => {
    //resets the array so any displayed buttons disapper on list/task change
    setToggle(Array(toDo.length).fill(false));
  }, [toDo]);

  const handleClick = (i) => {
    console.log(toggle);
    let copy = [...toggle];
    copy[i] = !copy[i];
    setToggle(copy);
  };

  const renderList = toDo.map((item, index) => (
    <div onClick={() => handleClick(index)} key={uniqid()}>
      {item.task}
      {toggle[index]
        ? <button onClick={onEdit}>Edit</button> && (
            <button onClick={onDelete}>Delete</button>
          )
        : null}
    </div>
  ));

  return <div className="display">{renderList}</div>;
};

export default Display;
