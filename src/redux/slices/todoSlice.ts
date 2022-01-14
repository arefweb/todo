import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ToDoState {
    todos: {
      id: number;
      title: string;
      isDone: boolean;
    }[]
}


// Define the initial state using that type
const initialState: ToDoState = {
  todos: []
}

export const toDoSlice = createSlice({
  name: 'todos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<string>) => {
      return {...state, todos: [...state.todos, {
        id: state.todos[state.todos.length - 1] ? state.todos[state.todos.length - 1].id + 1 : 1,
        title: action.payload,
        isDone: false
      }]}
    },
    changeDoneStatus: (state, action: PayloadAction<number>)=>{
      state.todos = state.todos.map((todoItem, i) => {
        if(todoItem.id === action.payload){
          return {
            id: todoItem.id,
            title: todoItem.title,
            isDone: !todoItem.isDone
          }
        }
        return todoItem;
      }) 
    },
    removeTodo: (state, action: PayloadAction<number>)=>{
      state.todos = state.todos.filter((todoItem, i)=>{
        return todoItem.id !== action.payload
      })
    },
    editTodo: (state, action:PayloadAction<{id: number; title: string}>)=>{
      state.todos = state.todos.map((todoItem, i)=>{
        if(todoItem.id === action.payload.id){
          return {
            id: todoItem.id,
            title: action.payload.title,
            isDone: todoItem.isDone
          }
        } 
          return todoItem;
      })
    },
    fillTodos: (state, action:PayloadAction<[]>)=>{
      state.todos = [...action.payload];
    }
  },
})

export const { addToDo, changeDoneStatus, removeTodo, editTodo, fillTodos } = toDoSlice.actions

export default toDoSlice.reducer