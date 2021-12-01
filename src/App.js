import React, { useState, useRef, useEffect } from 'react'; //useref is to get element in html
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([]) //kind of like a list holder
  const todoNameRef = useRef()
  const newDate = new Date()
  // const timeNow = newDate.getHours() + ":" + newDate.getMinutes();
  const timeNow = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  //let the todos stay even we refresh cause we got them from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //save our todos on local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //for the toggle
  function toggleTodo(id) {
    //create a copy
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //for adding todos
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return null
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false, time: timeNow }]
    })
    console.log(name)
    window.location.reload();
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  
  function handleExportTodos() {
    
  }

  return (
    <>
      <h1>ToDo!</h1>
      <div class="holder">
        <input class="field" ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add</button>
        <button onClick={handleClearTodos}>Clear</button>
        <div> {todos.filter(todo => !todo.complete).length} left to do</div>
        <div class="todos">
          <div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App;
