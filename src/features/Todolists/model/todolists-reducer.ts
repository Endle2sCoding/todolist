// import { FilterValues, Todolist } from "../../../app/App";
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

import { Dispatch } from 'redux';
import { FilterValues } from "@/app/App";
import { Todolist } from "../api/todolistsApi.types";
import { _todolistsApi } from '../api/todolistsApi';
import { RequestStatus, setAppStatus } from '@/app/app-reducer';
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError';
import { handleServerAppError } from '@/common/utils/handleServerAppError';
import { ResultCode } from '@/common/enums';
import { createSlice } from '@reduxjs/toolkit';


export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};

const initialState: DomainTodolist[] = [];




export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: create => ({
    removeTodolist: create.reducer<{ id: string; }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist; }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string; }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValues; }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus; }>(
      (state, action) => {
        const todolist = state.find(tl => tl.id === action.payload.id);
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus;
        }
      }
    ),
    setTodolists: create.reducer<{ todolists: Todolist[]; }>((state, action) => {
      // 1 variant
      // return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
      // 2 variant
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      });
    }),
    clearTodolists: create.reducer(() => {
      return [];
    }),
  }),
});
export const { addTodolist, changeTodolistEntityStatus, changeTodolistTitle, clearTodolists, removeTodolist, setTodolists, changeTodolistFilter } = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;


export const fetchTodolistsThunk = (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  _todolistsApi.getTodolists().then(res => {
    dispatch(setAppStatus({ status: 'succeeded' }));
    dispatch(setTodolists({ todolists: res.data }));
  }).catch((error) => {
    handleServerNetworkError(error, dispatch);
  });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  _todolistsApi.createTodolist(title).then(res => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(addTodolist({ todolist: res.data.data.item }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  }).catch((error) => {
    handleServerNetworkError(error, dispatch);
  });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }));
  _todolistsApi.deleteTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(removeTodolist({ id: id }));
    } else {
      handleServerAppError(res.data, dispatch);

    }
  })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
      setTimeout(() => {
        dispatch(changeTodolistEntityStatus({ id, entityStatus: 'succeeded' }));
      }, 3000);
    });
};

export const updateTodolistTitleTC =
  (arg: { id: string; title: string; }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    _todolistsApi.changeTodolistTitle(arg).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(changeTodolistTitle(arg));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    }
    ).catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
  };