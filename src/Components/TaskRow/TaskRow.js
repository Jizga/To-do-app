import React from "react";
// import { TaskDelete } from "./TaskDelete";

/* Este componente, lo único que hará es generar filas, es decir, devoverá los elementos "tr" de "App.js" */
/* ESte componente recibe los datos de "App", y le devuelve al mismo los datos */

export const TaskRow = (props) => {
  return (
    <tr key={props.task.name}>
      <td>{props.task.name}</td>
      <td>
        <input
          type="checkbox"
          checked={
            props.task.done
          } /* esto quiere decir que estará marcado en función del "done", es decir,
          si la tarea está hecha o no*/
          onChange={() => props.toggleTask(props.task)}
        />
        {/* Botón de borrar tarea */}
        <button onClick={() => props.deleteTask(props.task.name)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
