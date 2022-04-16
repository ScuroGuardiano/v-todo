import { useState } from "react";
import { Todo as ITodo } from "../interfaces/api-dtos";
import Todo from "./todo";
import TodoModal from "./todo-modal";

export default function Todos({ todos }: { todos: ITodo[] }) {
  const [currentTodos, setCurrentTodos] = useState(todos);

  const onDeleted = (id: number) => {
    setCurrentTodos(currentTodos.filter((todo) => todo.id != id));
  };
  const [adding, setAdding] = useState(false);

  const onRequestClose = () => {
    setAdding(false);
  }

  const onSuccess = payload => {
    setCurrentTodos([payload, ...currentTodos]);
    setAdding(false);
  }

  const onFail = err => {
    alert(err);
  }

  return (
    <>
      <button onClick={() => setAdding(true)}>Add TODO</button>
      {adding ? <TodoModal open={adding} onRequestClose={onRequestClose} onSuccess={onSuccess} onFail={onFail}></TodoModal> : null}
      <ul>
        {currentTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={onDeleted} />
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          max-width: 600px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
        button {
          font-size: 1.2rem;
          padding: 0.3rem 1.5rem;
          color: #252535;
          background-color: #54cdfc;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        button:hover:not(:disabled) {
          background-color: #86dbfd;
        }
        button:disabled {
          background-color: gray;
        }
      `}</style>
    </>
  );
}
