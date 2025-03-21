import { TaskStatus, TaskPriority } from "@/common/enums";
import { z } from "zod";

export const TodolistSchema = z.object({
    id: z.string(),
    title: z.string(),
    addedDate: z.string(),
    order: z.number()
  });
  export type Todolist = z.infer<typeof TodolistSchema>;
  
  export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = object> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
}; export type DomainTask = z.infer<typeof DomainTaskSchema>;

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export const DomainTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  description: z.string().nullable(),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
});

export type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;
};


