import { Todo, TodoDtoUpdate } from "../interfaces/api-dtos";
import Modal from 'react-modal';

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
}: {
  todo?: Todo;
  open?: boolean;
  onRequestClose?: Function;
}) {
  const todo: Partial<TodoDtoUpdate> = { ...(todoToEdit ?? {}) };
  const forUpdate = todo.hasOwnProperty("id");

  return (
    <>
      <Modal isOpen={open} style={modalStyle} onRequestClose={onRequestClose}>
        <div className="modal-container">
          <h2>{forUpdate ? "Editing" : "Creating new"} todo</h2>
          <form>
            <input
              type="text"
              id="name"
              defaultValue={todo.name}
              name="name"
              placeholder="name"
            />
            <textarea
              id="description"
              defaultValue={todo.description}
              name="description"
              placeholder="description"
            />
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              defaultValue={new Date(todo?.deadline).toISOString().split('.')[0]} // Help PLZ
            />
            <input type="submit" value={forUpdate ? "Save" : "Create"} />
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
        input[type="submit"]:hover {
          background-color: #86dbfd;
        }
      `}</style>
    </>
  );
}
