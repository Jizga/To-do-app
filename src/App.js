import React, { useState } from "react";
import { TaskRow } from "./Components/TaskRow"; /* así es como usamos la función hecha en 
el componente "TaskRow" */
import { TaskBanner } from "./Components/TaskBanner";

function App() {
  /* 1º se define al dueño de las tareas */
  const [userName, setuserName] = useState("Vivi");
  /* 2º se definen las tareas */
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false },
  ]);

  /* 2º- Se define la función "toggleTask", la cual cambirá los estados de los items 
  (cambiará el "done" de true a false y al contrario) */

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  /* 1º.- Se define la función taskTableRows, cuyos datos se transladarán al 
componente "TaskRow" mediante props */

  const taskTableRows = () => {
    /* La función recorrerá cada Item */
    /* cada item retornará un "tr",
    el cual retornará  el nombre (dentro de un "td") */
    return taskItems.map((task) => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ));
  };

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
      </table>
      {/* función que dará el contenido de la tabla */}
      <tbody>{taskTableRows()}</tbody>
    </div>
  );
}

export default App;
