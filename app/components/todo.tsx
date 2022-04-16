import moment from "moment";
import { ChangeEventHandler, useState } from "react";
import { Todo as ITodo } from "../interfaces/api-dtos";
import TodoModal from "./todo-modal";

export default function Todo({
  todo,
  onDelete,
}: {
  todo: ITodo;
  onDelete?: (id: number) => void;
}) {
  const [todoState, setTodo] = useState(todo);
  const deadlineDate = moment(todoState.deadline).format("YYYY-MM-DD HH:mm");
  const deadlineDiff = todoState.deadline - Date.now();

  let deadlineColor = "unset";
  if (deadlineDiff < 0) {
    deadlineColor = "#FF4514";
  } else if (deadlineDiff < 3600) {
    deadlineColor = "#FFA814";
  }

  const onDoneChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    event.target.disabled = true;
    const val = event.target.checked;
    event.preventDefault();
    const action = val ? "done" : "undone";
    const res = await fetch(`/api/${todo.id}/${action}`);
    event.target.disabled = false;
    if (res.ok) {
      event.target.checked = val;
      return;
    } else {
      const data = await res.text();
      event.target.checked = !val;
      alert(`Error, status: ${res.status} ${res.statusText}; err: ${data}`);
    }
  };

  const deleteTodo = async () => {
    const res = await fetch(`/api/${todo.id}/delete`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (onDelete) {
        onDelete(todo.id);
      }
      return;
    }
    const data = await res.text();
    alert(`Error, status: ${res.status} ${res.statusText}; err: ${data}`);
  };

  const [editing, setEditing] = useState(false);

  const toggleEdit = (event?: any) => {
    event?.preventDefault();
    setEditing(!editing);
  }

  const success = (payload: any) => {
    setEditing(false);
    setTodo(payload);
  }

  return (
    <>
      <li>
        <div className="todo-view">
          <div className="todo-info">
            <h2>{todoState.name}</h2>
            <p>{todoState.description}</p>
            <span className="deadline">Deadline: {deadlineDate}</span>
            <div className="controls">
              <a href="#" onClick={deleteTodo}>
                Delete
              </a>
              <a href="#" onClick={toggleEdit}>Edit</a>
            </div>
          </div>
          <div className="done">
            <input type="checkbox" className="done" onChange={onDoneChange} />
          </div>
        </div>
        <TodoModal todo={todoState} open={editing} onRequestClose={toggleEdit} onSuccess={success} />
      </li>
      <style jsx>{`
        li {
          margin-bottom: 1rem;
        }
        .todo-view {
          border: 2px solid #333348;
          border-radius: 15px;
          text-align: left;
          padding: 1rem;
          display: flex;
        }
        .todo-view h2 {
          margin: 0;
        }
        .todo-info {
          width: 100%;
        }
        .deadline {
          font-weight: 600;
          color: ${deadlineColor};
        }
        .done {
          flex: auto;
          accent-color: #54cdfc;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .done input {
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
        .done input:not(:checked) {
          appearance: none;
          border: solid currentColor 2px;
          border-radius: 2px;
        }
        .done input:not(:checked) {
          appearance: none;
          border: solid currentColor 2px;
          border-radius: 2px;
        }
        .done input:disabled {
          cursor: wait;
          background-color: gray;
          border-color: gray;
        }
        .controls {
          margin-top: 1rem;
        }
        .controls a:not(:first-child) {
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}
