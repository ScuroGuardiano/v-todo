import { useState } from "react";
import { Todo as ITodo } from "../interfaces/api-dtos";
import Todo from './todo';

export default function Todos({ todos }: { todos: ITodo[] }) {
    const [currentTodos, setCurrentTodos] = useState(todos);

    const onDeleted = (id: number) => {
        setCurrentTodos(currentTodos.filter(todo => todo.id != id));
    }

    return (<>
        <ul>
            { currentTodos.map(todo => <Todo key={todo.id} todo={todo} onDelete={onDeleted} />) }
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
        `}</style>
    </>)
}
