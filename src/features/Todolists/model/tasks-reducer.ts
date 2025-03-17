import { nanoid } from "@reduxjs/toolkit";
import { CreateTodolistAction, RemoveTodolistAction } from "./todolists-reducer";
import { TasksType } from "./types/todolist";


const initialState: TasksType = {};

export const removeTaskAC = (
  { todolistId, taskId }: {
    todolistId: string, taskId: string;
  }
) => {
  return {
    type: "delete_task",
    payload: {
      todolistId,
      taskId
    }
  } as const;
};
export const createTaskAC = (
  { todolistId, title }: {
    todolistId: string, title: string;
  }
) => {
  return {
    type: "create_task",
    payload: {
      todolistId,
      title
    }
  } as const;
};
export const changeTaskStatusAC = (
  { todolistId, taskId, isDone }: {
    todolistId: string, taskId: string; isDone: boolean;
  }
) => {
  return {
    type: "change_task_status",
    payload: {
      todolistId,
      taskId,
      isDone
    }
  } as const;
};
export const changeTaskTitleAC = (
  { todolistId, taskId, title }: {
    todolistId: string, taskId: string; title: string;
  }
) => {
  return {
    type: "change_task_title",
    payload: {
      todolistId,
      taskId,
      title
    }
  } as const;
};
type removeTaskACtion = ReturnType<typeof removeTaskAC>;
type CreateTaskAction = ReturnType<typeof createTaskAC>;
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActoin = ReturnType<typeof changeTaskTitleAC>;
type Actions = CreateTodolistAction | RemoveTodolistAction | removeTaskACtion | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleActoin;
export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [nanoid()]: [] };
    }
    case 'remove_todolist': {
      delete state[action.payload.id];
      return { ...state };
    }
    case 'delete_task': {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId)] };
    }
    case 'create_task': { 
      return {
        ...state,
        [action.payload.todolistId]:
          [
            {
              id: nanoid(), title: action.payload.title, isDone: false
            },
            ...state[action.payload.todolistId]
          ]
      };
    }
    case 'change_task_status': {
      return {
        ...state,
        [action.payload.todolistId]:
          [
            ...state[action.payload.todolistId].map(
              t => t.id === action.payload.taskId ?
                { ...t, isDone: action.payload.isDone }
                : t
            )
          ]
      };
    }
    case 'change_task_title': {
      return {
        ...state,
        [action.payload.todolistId]:
          [
            ...state[action.payload.todolistId].map(
              t => t.id === action.payload.taskId ?
                { ...t, title: action.payload.title }
                : t
            )
          ]
      };
    }
    default:
      return state;
  }
};
