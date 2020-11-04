import React, { useState } from "react";
import styles from "./TaskCreator.module.scss";

export const TaskCreator = (props) => {
  const [newTaskName, setNewTaskName] = useState("");

  const updateNewTaskValue = (e) => setNewTaskName(e.target.value);

  const createNewTask = () => {
    props.callback(newTaskName);
    setNewTaskName("");
  };

  /* ---- Añadir la nueva tarea pulsando "Enter" */

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      props.callback(newTaskName);
      setNewTaskName("");
    }
  };

  return (
    <div className="my-1">
      <input
        type="text"
        className={styles.newTask}
        value={newTaskName}
        onChange={updateNewTaskValue}
        onKeyPress={
          pressEnter
        } /* ---- Añadir la nueva tarea pulsando "Enter" */
      />
      {/* botón para agregar una nueva tarea */}
      <button className={styles.bottonNewTask} onClick={createNewTask}>
        Add
      </button>
    </div>
  );
};
