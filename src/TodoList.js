import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
    return (
        // <div>
        //     <h1>TODO LIST: {todoList.length} </h1> 
        // </div>
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
