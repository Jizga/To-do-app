import React, { useState, useEffect } from "react";
import { TaskRow } from "./Components/TaskRow/TaskRow";
import { TaskBanner } from "./Components/TaskBanner/TaskBanner";
import { TaskCreator } from "./Components/TaskCreator/TaskCreator";
import { VisibilityControl } from "./Components/VisibilityControl/VisibilityControl";
import styles from "./App.module.scss";

function App() {
  /* 1º se define al dueño de las tareas */
  const [userName, setUserName] = useState("Viviana Vega");
  const newUserName = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("user", userName);
  };

  /* 2º se definen las tareas */
  const [taskItems, setTaskItems] = useState([
    { name: "Go to the market", done: false },
    { name: "Buy Gabri's present", done: false },
    { name: "Finish the project 'To Do'", done: true },
  ]);

  /* 4º.-- Mostrar las tareas completadas  */

  const [showCompleted, setShowCompleted] = useState(true);

  /* Uso del UseEffect nada más iniciar la web */

  useEffect(() => {
    let data = localStorage.getItem("task");
    let user = localStorage.getItem("user");
    if (data != null && user != null) {
      setTaskItems(JSON.parse(data));
      setUserName(user);
    } else {
      setUserName("Viviana Vega");
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItems));
    localStorage.setItem("user", userName);
  }, [taskItems, userName]);

  /* 3º.-- Se define la función que añadirá las tareas nuevas */

  const createNewTask = (taskName) => {
    if (taskName !== "") {
      if (!taskItems.find((t) => t.name === taskName)) {
        setTaskItems([...taskItems, { name: taskName, done: false }]);
      }
    }
  };

  /* 5º. -- Definir la función de eleminar tarea*/
  /* ------- */

  const deleteTask = (taskName) => {
    const found = taskItems.findIndex(
      (element) => element.name === taskName
    ); /* Buscar en el array de las tareas,
    la tarea que coincida en nombre con la que se selecciona (la tarea que se quiere borrar)*/

    taskItems.splice(
      found,
      1
    ); /*Tarea que se quiere borrar. El splice saca las demás tareas del array y deja la
    que no queremos, pero lo usamos porque muta el array de las tareas, y es lo que buscamos*/

    setTaskItems([
      ...taskItems,
    ]); /* Este es el array que ha sacado splice del array original*/
  };

  /* 2º.-- Se define la función "toggleTask", la cual cambirá los estados de los items 
  (cambiará el "done" de true a false y al contrario) */

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  /* 1º.-- Se define la función taskTableRows, cuyos datos se transladarán al 
componente "TaskRow" mediante props */

  const taskTableRows = (doneValue) => {
    /* La función recorrerá cada Item */
    /* cada item retornará un "tr",
    el cual retornará  el nombre (dentro de un "td") */
    return taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow
          task={task}
          key={task.name}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ));
  };

  return (
    <div className={styles.App}>
      <div>
        <TaskBanner
          userName={userName}
          taskItems={taskItems}
          newUserName={newUserName}
        />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className={styles.description}>Description</th>
              <th className={styles.done}>Done</th>
            </tr>
          </thead>
          {/* función que dará el contenido de la tabla */}
          <tbody className={styles.task}>{taskTableRows(false)}</tbody>
        </table>

        <TaskCreator callback={createNewTask} />

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Task"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>

        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className={styles.description}>Description</th>
                <th className={styles.done}>Done</th>
              </tr>
            </thead>
            <tbody className={styles.task}>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
