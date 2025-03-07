import { instance } from "@/common/instance";
import { BaseResponse } from "@/common/types";
import { DomainTodolist } from "../model/todolists-reducer";
import { Todolist } from "../api/todolistsApi.types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: headers => {
      headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`);
      headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`);
    },
  }),
  endpoints: build => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => {
          return {
            url: 'todo-lists',
            method: 'GET',
          };
        },
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
        },
      }),
    };
  },
});

export const { useGetTodolistsQuery } = todolistsApi;

export const _todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>("/todo-lists");
  },

  changeTodolistTitle(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: DomainTodolist; }>>(`/todo-lists`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
};
