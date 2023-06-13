import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Action from "./types/Action";
import { RootState } from "../../Store";
import { Tooltip } from "react-tooltip";
import TodoState from "./types/todoState";
import "./Todo.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function ToDo(): JSX.Element {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isDone, setIsDone] = useState(true);
  const [filter, setFilter] = useState<"all" | "true" | "false">("all");
  const [edit, setEdit] = useState<number>(-1);
  const toDoList = useSelector((state: RootState) => state.todo);
  const toDoListLength = useSelector((state: RootState) => state.todo.length);

  useEffect(() => {},[isDone]);

  const handleEdit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (editDescription.trim()) {
      const todoItem: TodoState = {
        id: edit,
        description: editDescription.trim(),
        isDone: false,
      };
      dispatch<Action>({ type: "editToDo", payload: todoItem });
      setEditDescription("");
      setEdit(-1);
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (description.trim()) {
      const todoItem: TodoState = {
        id: toDoListLength + 1,
        description: description.trim(),
        isDone: false,
      };
      dispatch<Action>({ type: "addToDo", payload: todoItem });
      setDescription("");
    }
  };

  return (
    <div className="todoContainer">
      <div className="todoForm">
        <form onSubmit={handleSubmit}>
          <input
            className="todoInput"
            value={description}
            placeholder="Enter your task here.."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="todoButton"
            type="submit"
            data-tip="Это всплывающая подсказка"
          >
            Add Task
          </button>
        </form>
        <span className="filterSpan">Filter: </span>
        <button
          type="button"
          className="filterButton"
          style={{ backgroundColor: filter === "all" ? "grey" : "lightgrey" }}
          onClick={() => {
            setFilter("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          className="filterButton"
          style={{ backgroundColor: filter === "false" ? "grey" : "lightgrey" }}
          onClick={() => {
            setFilter("false");
          }}
        >
          Active
        </button>
        <button
          type="button"
          className="filterButton"
          style={{ backgroundColor: filter === "true" ? "grey" : "lightgrey" }}
          onClick={() => {
            setFilter("true");
          }}
        >
          Done
        </button>
      </div>
      <div className="todoListContainer">
        {toDoList
          .filter((todo) => {
            if (filter === "true") {
              return todo.isDone === true;
            }
            if (filter === "false") {
              return todo.isDone === false;
            }
            return true;
          })
          .map((todo) => (
            <div key={todo.id} className="todoItem">
              <button
                className="deleteButton"
                type="button"
                data-tooltip-id="deleteTip"
                data-tooltip-content="Delete task"
                data-tooltip-place="bottom"
                onClick={() => {
                  dispatch<Action>({ type: "deleteToDo", payload: todo.id });
                }}
              >
                <AiOutlineDelete />
              </button>
              <Tooltip
                id="deleteTip"
                style={{ backgroundColor: "lightgray", color: "black" }}
              />
              <button
                type="button"
                className="editButton"
                data-tooltip-id="editTip"
                data-tooltip-content="Edit task"
                data-tooltip-place="bottom"
                onClick={() => {
                  setEdit(todo.id);
                  setEditDescription(todo.description);
                }}
              >
                <AiOutlineEdit />
              </button>
              <Tooltip
                id="editTip"
                style={{ backgroundColor: "lightgray", color: "black" }}
              />
              <p
                data-tooltip-id="taskTip"
                data-tooltip-content="Click to change task status"
                data-tooltip-place="bottom"
                onClick={() => {
                  setIsDone(!isDone);
                  todo.isDone = !todo.isDone;
                }}
                className={todo.isDone ? "task completed" : "task"}
              >
                {todo.description}
              </p>
              <Tooltip
                id="taskTip"
                style={{ backgroundColor: "lightgray", color: "black" }}
              />
            </div>
          ))}
      </div>
      {edit !== -1 && (
        <form onSubmit={handleEdit}>
          <input
            className="todoInput"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button className="todoButton" type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
}
