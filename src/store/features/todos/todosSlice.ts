import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";

export type TodoStatus = "process" | "completed" | "removed";

type Todo = {
  id: string;
  name: string;
  status: TodoStatus;
};

interface TodosState {
  todos: Todo[];
}

const initialState = {
  todos: [],
} satisfies TodosState as TodosState;

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<{ name: string }>) => {
      if (payload.name === "") return;
      const newTodo: Todo = {
        ...payload,
        id: uuidv4(),
        status: "process",
      };
      state.todos.unshift(newTodo);
    },
    removeTodo: (state, { payload }: PayloadAction<{ id: string }>) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === payload.id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].status = "removed";
      }
    },
    forceRemoveTodo: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.todos.splice(
        state.todos.findIndex((todo) => todo.id === payload.id),
        1
      );
    },
    completeTodo: (state, { payload }: PayloadAction<{ id: string }>) => {
      console.log(payload.id);
      const todoIndex = state.todos.findIndex((todo) => todo.id === payload.id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].status = "completed";
      }
    },
    returnTodo: (state, { payload }: PayloadAction<{ id: string }>) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === payload.id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].status = "process";
      }
    },
  },
});

export const {
  addTodo,
  removeTodo,
  forceRemoveTodo,
  completeTodo,
  returnTodo,
} = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
