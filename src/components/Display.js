import React from 'react';

const Display = ({ toDo }) => {
  return (
    <div className="display">
      {toDo.map((item) => {
        return item.tasks.map((list, index) => {
          return <div key={index}>{list.task}</div>;
        });
      })}
    </div>
  );
};

export default Display;
