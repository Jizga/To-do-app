import React, { useState } from "react";

export const TaskBanner = (props) => {
  
  

  return (
    <h4 className="bg-primary text-white text-center p-4">
      <input
        type="text"
        value={props.userName}
        onChange={props.newUserName}
        className="form-control"
      />'s List To Do
      <p>({props.taskItems.filter((t) => !t.done).length} task to do)</p>
    </h4>
  );
};
