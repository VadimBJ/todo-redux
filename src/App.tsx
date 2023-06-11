import React from "react";
import "./App.css";
import ToDo from "./features/todo/ToDo";

function App(): JSX.Element {
  return (
    <div className="App">
      <h1 className="h1title">To Do List</h1>
      <ToDo />
    </div>
  );
}

export default App;
