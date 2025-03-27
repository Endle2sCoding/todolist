import { instance } from "@/shared/instance";

import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./api";
import { BaseResponse } from "./api";


export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask({ todolistId, title }: { todolistId: string; title: string; }) {
    return instance.post<BaseResponse<{ item: DomainTask; }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask({ todolistId, taskId, model }: { todolistId: string; taskId: string; model: UpdateTaskModel; }) {
    return instance.put<BaseResponse<{ item: DomainTask; }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },

  deleteTask({ todolistId, taskId }: { todolistId: string; taskId: string; }) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
