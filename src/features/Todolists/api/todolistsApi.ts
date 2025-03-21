import { instance } from "@/common/instance/instance";
import type { Todolist } from "./api";
import { BaseResponse } from "./api";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists");
  },
  changeTodolistTitle(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist; }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`);
  },
};
