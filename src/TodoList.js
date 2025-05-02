import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import './TodoList.css'



function TodoApp () {
    const [todoList,setTodoList] = useState(() => {
        const savedtodoList = localStorage.getItem("todoList")

        if (savedtodoList) {
            return JSON.parse(savedtodoList)
        } else {
            return [] ;
        }
    });
    const [inputTodoValue,setInputTodoValue] = useState("");
    const todosRef = useRef(null)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    useEffect (() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList])
    
    const savetodoList = useCallback ((e) => {
        e.preventDefault();

        if (inputTodoValue !== "") {
            setTodoList([
                ...todoList,
                {
                    id: todoList.length + 1,
                    text: inputTodoValue.trim()
                }
            ])
        }
        setInputTodoValue("");
        todosRef.current.focus();
        
    }, [inputTodoValue,todoList]);

    const deleteTodo = useCallback ((id) => {
        setTodoList(todoList.filter((inputTodoValue) => inputTodoValue.id !== id));
        
    }, [todoList]);

    const clearAll = useCallback (() => {
        setTodoList([]);
    }, [] )

    console.log(todoList);

    const pendingCount = useMemo(() => todoList.length, [todoList])
    



    return (
        <div className="container">
            <h1>Todo-App</h1>
            <form className="todoForm" onSubmit={savetodoList}>
            <input 
                    type="text" 
                    name="todoList-input" 
                    placeholder="What you wanna do?" 
                    ref={todosRef}
                    value={inputTodoValue}
                    onChange={(e) => setInputTodoValue(e.target.value)}>
                </input>
                <button 
                    type="subnit" 
                    className="btn"
                    title="เพิ่มรายการใหม่">Add
                </button>
            </form>
            <ul className="todo-list">
                {todoList.map((inputTodoValue) => (
                    <li key={inputTodoValue.id}>{inputTodoValue.text}
                    {" "}
                    <button onClick={() => deleteTodo(inputTodoValue.id)} title="ลบรายการนี้"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALpJREFUSEtjZKAxYKSx+Qx4LXgeEODwn5FxPgMDgwIOhzxg/P8/UXLDhgO4HIrXgmeBgfsZGBgcCPjygdT69YrkWvAfpFFq/XqsDnkWGIhXHqSXkA+oawHMRZRGPLKPUXxAcwtgLicmbJF9iU892ZFHVQvQXUiIj2w5UT4gZCDFQTRqAUa+IjVIRuOAYNFEcRARsoEcC4ipaNDtPSC1fr0juiDWnAytKuuJqM1g5uGsOge20icU9sTIAwAKUNQZPmcGWgAAAABJRU5ErkJggg=="/></button>
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