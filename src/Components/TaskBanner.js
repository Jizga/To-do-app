import React from "react";

export const TaskBanner = (props) => {
  return (
    <h4 className="bg-primary text-white text-center p-4">
      {props.userName}'s List To Do
      <p>({props.taskItems.filter((t) => !t.done).length} task to do)</p>
    </h4>
  );
};
