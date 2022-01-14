import React, {useState} from 'react';
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import {changeDoneStatus, removeTodo, editTodo} from "./redux/slices/todoSlice";

interface ISingleTodo{ 
  todo: {id: number; title: string; isDone: boolean; }
}

const SingleTodo = ({todo}: ISingleTodo)=>{
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [todoTitle, setTodoTitle] = useState<string>(todo?.title);
  const dispatch = useAppDispatch();
  const isDone = useAppSelector(state => {
     let opt = state.todo.todos.find((item)=>{
      return item.id === todo.id
    })
    return opt?.isDone;
  });

  function changeChecked(){
    dispatch(changeDoneStatus(todo.id));
  }

  function deleteTodo(){
    dispatch(removeTodo(todo.id));
  }

  function enableEdit(){
    setIsReadOnly(false);
    document.getElementById(`title-${todo.id}`)?.focus();
  }

  function editTodoFunc(e: React.ChangeEvent<HTMLInputElement>){
    setTodoTitle(e.target.value);
  }

  function submitEdit(e: any){
    if(e.code === "Enter" || e.code === "NumpadEnter"){
      dispatch(editTodo({id: todo.id, title: todoTitle}));
      setIsReadOnly(true);
    }
  }

  return (
    <div className='SingleTask'>
      <div className='SingleTask__inputs'>
        <input type="checkbox" name='hasDone' checked={isDone} onChange={changeChecked} />
        {isReadOnly ? 
          <p className={`${isDone && "isDone"}`}>{todo?.title}</p>
        :
          <input type="text" id={`title-${todo.id}`} value={todoTitle} onChange={editTodoFunc} onKeyDown={submitEdit} />
        }
      </div>
      
      <div className='SingleTask__btnGroup'>
        <button onClick={enableEdit}>Edit</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
    </div>
  )

}

export default SingleTodo
