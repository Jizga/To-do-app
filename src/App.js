import React, { useState, useEffect } from "react";
import { TaskRow } from "./Components/TaskRow"; /* así es como usamos la función hecha en 
el componente "TaskRow" */
import { TaskBanner } from "./Components/TaskBanner";
import { TaskCreator } from "./Components/TaskCreator";
import { VisibilityControl } from "./Components/VisibilityControl";

function App() {
  /* 1º se define al dueño de las tareas */
  const [userName, setUserName] = useState("Jizga");
  const newUserName = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("user", userName)
  } 

  /* 2º se definen las tareas */
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false },
  ]);

  /* 4º.-- Mostrar las tareas completadas  */

  const [showCompleted, setShowCompleted] = useState(true);

  /* Uso del UseEffect nada más iniciar la web */

  useEffect(() => {
    let data = localStorage.getItem("task");
    let user = localStorage.getItem("user")
    if (data != null && user != null) {
      setTaskItems(JSON.parse(data));
      setUserName(user)
    } else {
      setUserName("Pepe");
      setTaskItems([
        /*{ name: "Task One Example", done: false },
        { name: "Task Two Example", done: false },
        { name: "Task Three Example", done: true },
        { name: "Task Four Example", done: false }, */
      ]);
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItems))
    localStorage.setItem("user", userName);
  }, [taskItems,userName]);

  /* 3º.-- Se define la función que añadirá las tareas nuevas */

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
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
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ));
  };

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} newUserName={newUserName}/>
      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        {/* función que dará el contenido de la tabla */}
        <tbody>{taskTableRows(false)}</tbody>
      </table>
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
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(true)}</tbody>
        </table>
      )}
    </div>
  );
}

export default App;
