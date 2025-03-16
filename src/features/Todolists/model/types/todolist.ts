import { DomainTask } from "../../api/tasksApi.types";


export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};
export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}
export type TasksType = Record<string, Task[]>;

export type FilterValues = "all" | "active" | "completed";


export type TasksState = Record<string, DomainTask[]>;
