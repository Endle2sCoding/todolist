import type { TasksState } from "./types/todolist";
import type { RootState } from "@/app/store";

export const selectTasks = (state: RootState): TasksState => state.tasks;
