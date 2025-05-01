import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import './TodoList.css'



function TodoApp () {
    const [todo,setTodo] = useState(() => {
        const savedTodo = localStorage.getItem("todo")

        if (savedTodo) {
            return JSON.parse(savedTodo)
        } else {
            return [] ;
        }
    });
    const [todos,setTodos] = useState("");
    const todosRef = useRef(null)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    useEffect (() => {
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo])
    
    const saveTodo = useCallback ((e) => {
        e.preventDefault();

        if (todos !== "") {
            setTodo([
                ...todo,
                {
                    id: todo.length + 1,
                    text: todos.trim()
                }
            ])
        }
        setTodos("");
        todosRef.current.focus();
        
    }, [todos,todo]);

    const deleteTodo = useCallback ((id) => {
        setTodo(todo.filter((todos) => todos.id !== id));
        
    }, [todo]);

    const clearAll = useCallback (() => {
        setTodo([]);
    }, [] )

    console.log(todo);

    const pendingCount = useMemo(() => todo.length, [todo])
    



    return (
        <div className="container">
            <h1>Todo-App</h1>
            <form className="todoForm" onSubmit={saveTodo}>
            <input 
                    type="text" 
                    name="todo-input" 
                    placeholder="What you wanna do?" 
                    ref={todosRef}
                    value={todos}
                    onChange={(e) => setTodos(e.target.value)}>
                </input>
                <button 
                    type="subnit" 
                    className="btn"
                    title="เพิ่มรายการใหม่">Add
                </button>
            </form>
            <ul className="todo-list">
                {todo.map((todos) => (
                    <li key={todos.id}>{todos.text}
                    {" "}
                    <button onClick={() => deleteTodo(todos.id)} title="ลบรายการนี้"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALpJREFUSEtjZKAxYKSx+Qx4LXgeEODwn5FxPgMDgwIOhzxg/P8/UXLDhgO4HIrXgmeBgfsZGBgcCPjygdT69YrkWvAfpFFq/XqsDnkWGIhXHqSXkA+oawHMRZRGPLKPUXxAcwtgLicmbJF9iU892ZFHVQvQXUiIj2w5UT4gZCDFQTRqAUa+IjVIRuOAYNFEcRARsoEcC4ipaNDtPSC1fr0juiDWnAytKuuJqM1g5uGsOge20icU9sTIAwAKUNQZPmcGWgAAAABJRU5ErkJggg=="/></button>
                    </li>
                ))}
            </ul>
            <p className="clearAll" title="ลบรายการทั้งหมด"> {pendingCount} สิ่งที่ยังไม่ได้ทำ
                {" "}
                <button onClick={clearAll}>Clear All</button>
            </p>
        </div>
    )

}


export default TodoApp