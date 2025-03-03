// import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

import type { TasksState } from "@/app/App";
import { Dispatch } from "@reduxjs/toolkit";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, DomainTaskSchema, UpdateTaskModel } from "../api/tasksApi.types";
import { ResultCode, TaskStatus } from "@/common/enums";
import { RootState } from "@/app/store";
import { setAppError, setAppStatus } from "@/app/app-reducer";
import { handleServerAppError } from "@/common/utils/handleServerAppError";
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError";


const initialState: TasksState = {};

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[]; }) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const;
};

export const addTaskAC = (payload: { task: DomainTask; }) => {
  return { type: "ADD-TASK", payload } as const;
};

export const removeTaskAC = (payload: { taskId: string, todolistId: string; }) => {
  return {
    type: 'REMOVE-TASK',
    payload,
  } as const;
};

export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string; status: TaskStatus; }) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload
  } as const;
};
export const changeTaskTitleAC = (payload: { taskId: string, todolistId: string; title: string; }) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload
  } as const;
};
export const updateTaskAC = (payload: { taskId: string, todolistId: string; title?: string, status?: TaskStatus; }) => {
  return {
    type: "UPDATE-TASK",
    payload
  } as const;
};


export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;


type ActionsType = SetTasksActionType | AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | UpdateTaskActionType;



export const tasksReducer = (
  state: TasksState = initialState,
  action: ActionsType
): TasksState => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const newTask = action.payload.task;
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] };
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)],
      };
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t)],
      };
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)],
      };
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ?
          {
            ...t,
            title: action.payload?.title || t.title,
            status: action.payload?.status !== undefined ? action.payload.status : t.status

          }
          : t)],
      };
    }
    default: {
      return state;
    }
  }
};


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.getTasks(todolistId).then(res => {
    // dispatch(setAppStatus('succeeded'));
    // const tasks = res.data.items;
    // dispatch(setTasksAC({ todolistId, tasks }));
    const tasks = DomainTaskSchema.array().parse(res.data.items);
    dispatch(setAppStatus({ status: 'succeeded' }));
    return { tasks };
  }).catch((error) => {
    handleServerNetworkError(error, dispatch);
  });
};

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string; }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    tasksApi.deleteTask(arg).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(arg));
        dispatch(setAppStatus({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    }).catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
  };

export const addTaskTC = (arg: { title: string, todolistId: string; }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(addTaskAC({ task: res.data.data.item }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const changeTaskStatusTC =
  (arg: { taskId: string; status: TaskStatus; todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, status } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          status,
          title: task.title,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model }).then(() => {
          dispatch(changeTaskStatusAC(arg));
        });
      }
    };

export const changeTaskTitleTC =
  (arg: { taskId: string; title: string; todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, title } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          title,
          status: task.status,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model }).then(() => {
          dispatch(changeTaskTitleAC(arg));
        });
      }
    };
export const updateTaskTC =
  (arg: { taskId: string; title?: string; status?: TaskStatus, todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      dispatch(setAppStatus({ status: 'loading' }));
      const { taskId, todolistId, title, status } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          title: title || task.title,
          status: status !== undefined ? status : task.status,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model })
          .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
              if (res.data.resultCode === ResultCode.Success) {
                dispatch(updateTaskAC(arg));
              } else {
                if (res.data.messages.length) {
                  dispatch(setAppError(res.data.messages[0]));
                } else {
                  handleServerAppError(res.data, dispatch);
                }

              }
              dispatch(setAppStatus({ status: 'succeeded' }));
            } else {
              handleServerAppError(res.data, dispatch);
            }

          })
          .catch(error => {
            handleServerNetworkError(error, dispatch);
          });
      }
    };

