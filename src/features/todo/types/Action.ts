import TodoState from "./todoState";

type Action =
  | { type: "addToDo"; payload: TodoState }
  | { type: "deleteToDo"; payload: number }
  | { type: "editToDo"; payload: TodoState };

export default Action;
