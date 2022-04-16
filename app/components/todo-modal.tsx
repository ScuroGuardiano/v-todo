import { Todo, TodoDtoUpdate } from "../interfaces/api-dtos";
import Modal from 'react-modal';
import { FormEventHandler, useState } from "react";

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(37, 37, 53, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "rgba(37, 37, 53, 1)",
    width: "min(500px, 100%)",
    height: "fit-content",
    position: "static",
    borderColor: "#333348",
    borderWidth: "2px"
  }
}

export default /*__cdecl*/ function TodoModal({
  todo: todoToEdit,
  open = false,
  onRequestClose = () => {},
  onSuccess = () => {},
  onFail = () => {}
}: {
  todo?: Todo;
  open?: boolean;
  onRequestClose?: Function;
  onSuccess?: Function;
  onFail?: Function;
}) {
  const todo: Partial<TodoDtoUpdate> = { ...(todoToEdit ?? {}) };
  const forUpdate = todo.hasOwnProperty("id");

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const submit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const nameElement = elements.namedItem("name") as HTMLInputElement;
    const descriptionElement = elements.namedItem("description") as HTMLTextAreaElement;
    const deadlineElement = elements.namedItem("deadline") as HTMLInputElement;

    todo.name = nameElement.value;
    todo.description = descriptionElement.value;
    todo.deadline = deadlineElement.valueAsNumber;

    let route = '/api/create';

    if (forUpdate) {
      route = `/api/${todo.id}/update`
    }
    setWaitingForResponse(true);

    fetch(route, {
      method: "POST",
      body: JSON.stringify(todo)
    })
    .then(async resp => {
      if (resp.ok) {
        return resp.json();
      }
      return onFail(resp);
    })
    .then(payload => {
      if (forUpdate) {
        return onSuccess(todo);
      }
      return onSuccess(payload);
    })
    .catch(err => {
      onFail(err);
    })
    .finally(() => setWaitingForResponse(false));
  }

  return (
    <>
      <Modal isOpen={open} style={modalStyle} onRequestClose={onRequestClose}>
        <div className="modal-container">
          <h2>{forUpdate ? "Editing" : "Creating new"} todo</h2>
          <form onSubmit={submit}>
            <input
              type="text"
              id="name"
              defaultValue={todo.name}
              name="name"
              placeholder="name"
              required
            />
            <textarea
              id="description"
              defaultValue={todo.description}
              name="description"
              placeholder="description"
              required
            />
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              defaultValue={new Date(todo?.deadline).toISOString().split('.')[0]} // Help PLZ
              required
            />
            <input type="submit" disabled={waitingForResponse} value={forUpdate ? "Save" : "Create"} />
          </form>
        </div>
      </Modal>
      <style jsx>{`
        h2 {
          text-align: center;
          margin-top: 0;
        }
        form {
          width: min(500px, 100%);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }
        input:not([type="submit"]),
        textarea {
          display: block;
          width: 100%;
          font-size: 1.2rem;
          padding: 1rem;
          background: #252535;
          color: #eee;
          border: 2px solid #333348;
          border-radius: 5px;
        }
        input[type="submit"] {
          font-size: 1.2rem;
          padding: 0.3rem 1.5rem;
          color: #252535;
          background-color: #54cdfc;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        input[type="submit"]:hover:not(:disabled) {
          background-color: #86dbfd;
        }
        input[type="submit"]:disabled {
          ${waitingForResponse ? 'cursor: wait;' : ''}
          background-color: gray;
        }
      `}</style>
    </>
  );
}
