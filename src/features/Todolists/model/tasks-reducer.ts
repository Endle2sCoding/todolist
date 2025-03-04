// import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

import type { TasksState } from "@/app/App";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, DomainTaskSchema, UpdateTaskModel } from "../api/tasksApi.types";
import { ResultCode, TaskStatus } from "@/common/enums";
import { RootState } from "@/app/store";
import { setAppError, setAppStatus } from "@/app/app-reducer";
import { handleServerAppError } from "@/common/utils/handleServerAppError";
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError";
import { addTodolist, removeTodolist } from "./todolists-reducer";


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[]; }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string; }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }),
    addTask: create.reducer<{ task: DomainTask; }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{
      taskId: string;
      todolistId: string;
      domainModel: UpdateTaskModel;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    }),
    clearTasks: create.reducer(() => {
      return {};
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const { addTask, clearTasks, removeTask, setTasks, updateTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

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
        dispatch(removeTask(arg));
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
      dispatch(addTask({ task: res.data.data.item }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
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
                dispatch(updateTask({
                  taskId,
                  todolistId,
                  domainModel: model
                }));
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

