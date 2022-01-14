import { useState, useEffect } from 'react';
import './assets/style/style.scss';
import { useAppSelector, useAppDispatch } from "./redux/hooks"
import { addToDo, fillTodos} from './redux/slices/todoSlice';
import SingleTodo from './SingleTodo';

function App() {
  const [task, setTask] = useState<string>("");
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const AddNewTask = ()=>{
    if(task.length > 0){
      dispatch(addToDo(task));
      setTask("");
      document.getElementById("addInput")?.focus();
    }
  }

  useEffect(() => {
    let localStorageTodos = JSON.parse(localStorage.getItem("MY_TODOS") as string);
    if(localStorageTodos?.length > 0){
      dispatch(fillTodos(localStorageTodos));
    }
  }, [])

  useEffect(() => {
      localStorage.setItem("MY_TODOS", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <article className='ToDoBox'>
        <h1>ToDo List</h1>

        <div className='addBox'>
          <input type="text" placeholder='What needs to be done?' 
            id="addInput"
            value={task} 
            onChange={(e)=> setTask(e.target.value)} 
            onKeyDown={(e)=>{
              if(e.code === "Enter" || e.code === "NumpadEnter"){
                AddNewTask();
              }
            }}
          />
          <button onClick={AddNewTask}>+</button> 
        </div>

        <section className="TaskList">
          {todos.length > 0 && todos.map((todo, i)=>{
            return <SingleTodo todo={todo} key={todo.id} />
          })}
        </section>
      </article>
    </div>
  );
}

export default App;
