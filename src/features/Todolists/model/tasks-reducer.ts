import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

import { TasksType } from "./types/todolist";
import { RootState } from "@/app/providers/store/store";
import { createTodolistAC, removeTodolistAC } from "./todolists-reducer";


const initialState: TasksType = {
  ["todolistId1"]: [],
  ["todolistId2"]: [],
};

export const createTaskAC = createAction<{
  todolistId: string, title: string;
}>("tasks/createTask");
export const removeTaskAC = createAction<{
  todolistId: string, taskId: string;
}>("tasks/removeTask");
export const changeTaskStatusAC = createAction<{
  todolistId: string, taskId: string; isDone: boolean;
}>("tasks/changeTaskStatus");
export const changeTaskTitleAC = createAction<{
  todolistId: string, taskId: string; title: string;
}>("tasks/changeTaskTitle");



export const tasksReducer = createReducer(initialState, builder => {
  builder.addCase(createTodolistAC, (state, action) => {
    state[action.payload.id] = [];
  });
  builder.addCase(removeTodolistAC, (state, action) => {
    delete state[action.payload.id];

  });
  builder.addCase(createTaskAC, (state, action) => {
    state[action.payload.todolistId].splice(0, 0, { id: nanoid(), title: action.payload.title, isDone: false });
    // state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false });
  });
  builder.addCase(removeTaskAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
    if (index !== -1) {
      state[action.payload.todolistId].splice(index, 1);
    }
  });
  builder.addCase(changeTaskTitleAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
    if (index !== -1) {
      state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], title: action.payload.title };
    }
  });
  builder.addCase(changeTaskStatusAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
    if (index !== -1) {
      state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], isDone: action.payload.isDone };
    }
  });
});

// export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
//   switch (action.type) {
//     // case 'createTodolist': {
//     //   return { ...state, [action.payload.id]: [] };
//     // }
//     // case 'removeTodolist': {
//     //   delete state[action.payload.id];
//     //   return { ...state };
//     // }
//     case 'delete_task': {
//       return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId)] };
//     }
//     case 'create_task': {
//       return {
//         ...state,
//         [action.payload.todolistId]:
//           [
//             {
//               id: nanoid(), title: action.payload.title, isDone: false
//             },
//             ...state[action.payload.todolistId]
//           ]
//       };
//     }
//     case 'change_task_status': {
//       return {
//         ...state,
//         [action.payload.todolistId]:
//           [
//             ...state[action.payload.todolistId].map(
//               t => t.id === action.payload.taskId ?
//                 { ...t, isDone: action.payload.isDone }
//                 : t
//             )
//           ]
//       };
//     }
//     case 'change_task_title': {
//       return {
//         ...state,
//         [action.payload.todolistId]:
//           [
//             ...state[action.payload.todolistId].map(
//               t => t.id === action.payload.taskId ?
//                 { ...t, title: action.payload.title }
//                 : t
//             )
//           ]
//       };
//     }
//     default:
//       return state;
//   }
// };
export const selectTasks = (state: RootState): TasksType => state.tasks;