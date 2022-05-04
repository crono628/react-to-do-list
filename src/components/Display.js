import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Display = ({ toDo, onDelete, onEdit }) => {
  // const [toggle, setToggle] = useState(Array(toDo.length).fill(false));

  // useEffect(() => {
  //   //resets the array so any displayed buttons disapper on list/task change
  //   setToggle(Array(toDo.length).fill(false));
  // }, [toDo]);

  // const handleClick = (i) => {
  //   let copy = [...toggle];
  //   copy[i] = !copy[i];
  //   setToggle(copy);
  // };

  // const renderList = toDo.map((item, index) => (
  //   <div
  //     className="list-item"
  //     onClick={() => handleClick(index)}
  //     key={uniqid()}
  //   >
  //     {item.task}
  //     {toggle[index] ? (
  //       <span className="button-span">
  //         <button onClick={onEdit}>Edit</button>
  //         <button onClick={onDelete}>Delete</button>
  //       </span>
  //     ) : null}
  //   </div>
  // ));

  return <div className="display"></div>;
};

export default Display;
