import React, { useState } from "react";

function App() {
  const [userName, setuserName] = useState("fazt");
  const [taskItems, settaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false },
  ]);

  const taskTableRows = () => {
    /* La función recorrerá cada Item */
    /* cada item retornará un "tr",
    el cual retornará  el nombre (dentro de un "td") */
    return taskItems.map((task) => (
      <tr>
        <td>{task.name}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Hello World</h1>
      <table>
        <th>Description</th>
        <th>Done</th>
      </table>
      {/* función que dará el contenido de la tabla */}
      <tbody>{taskTableRows()}</tbody>
    </div>
  );
}

export default App;
