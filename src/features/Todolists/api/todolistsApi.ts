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
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`);
    },
  }),
  endpoints: build => ({
    getTodolists: build.query<DomainTodolist[], void>({
      // query: () => {
      //   return {
      //     url: 'todo-lists',
      //     method: 'GET',
      //   };
      // },
      query: () => 'todo-lists',
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
      },
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist; }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title }
        };
      },
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        };
      },
    }),
    updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string; }>({
      query: ({ id, title }) => {
        return {
          method: "PUT",
          url: `todo-lists/${id}`,
          body: {
            title,
          },
        };
      },
    }),
  })
});

export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } = todolistsApi;

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
