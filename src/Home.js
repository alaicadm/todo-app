import React, { useState, useRef, useEffect } from 'react'; //useref is to get element in html
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos"

export default function Home() {
        const [todos, setTodos] = useState([]) //kind of like a list holder
        const todoNameRef = useRef()
        const todoDateTimeRef = useRef()

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
            const datetime = datetimeParser(todoDateTimeRef)
            if (name != '' && datetime != ''){
                try{
                    setTodos(prevTodos => {
                        return [...prevTodos, { id: uuidv4(), name: name, complete: false, time: datetime }]
                        })
                }catch(error){
                    window.location.reload();
                }
            }
            window.location.reload();
        }

        function handleClearTodos() {
            const newTodos = todos.filter(todo => !todo.complete)
            setTodos(newTodos)
        }
        
        function datetimeParser(datetime) {
            const value = datetime.current.value

            //date parser
            var dateNow = new Date()
            var date = value.slice(0, 10)
            var getdaytoday = dateNow.getDate()
            var daydate = date.slice(8,10)
            var strDate;

            if (Number(getdaytoday) == Number(daydate)) strDate = 'Today';
            else if (Number(daydate) - Number(getdaytoday) == 1) strDate = 'Tommorow';
            else {
                var months = ['0','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
                var getmonth = date.slice(5,7).toString()
                if (getmonth[0]=='0') getmonth.replace('0','');
                strDate = months[Number(getmonth)] + ' ' + daydate + ', ' + date.slice(0,4)
            }
           

            //time parser
            var time = value.slice(11, 16)
            var hour = time.slice(0, 2)
            var min = time.slice(3, 5)
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            //min = min < 10 ? '0'+min : min;
            var strTime = hour + ':' + min + ampm;

           
            return strDate + ' ' + strTime 
        }

        return (
            <>
            <h1>ToDo!</h1>
            <div class="holder">
                <div class ="holder">
                    <input class="field" ref={todoNameRef} type="text" placeholder="Name" required />
                    <input class="field" ref={todoDateTimeRef} type="datetime-local" placeholder="Schedule" required />
                </div>
                <div class ="holder">
                    <button onClick={handleAddTodo}>Add</button>
                    <button onClick={handleClearTodos}>Clear</button>
                </div>
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

