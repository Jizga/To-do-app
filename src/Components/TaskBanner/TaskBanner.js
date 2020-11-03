import React from "react";
import styles from "./TaskBanner.module.scss";

export const TaskBanner = (props) => {
  return (
    <h4>
      <input
        type="text"
        value={props.userName}
        onChange={props.newUserName}
        className={styles.userName}
      />
      <h3 className={styles.list}>'s List To Do</h3>
      <p className={styles.nTask}>
        ({props.taskItems.filter((t) => !t.done).length} task to do)
      </p>
    </h4>
  );
};
