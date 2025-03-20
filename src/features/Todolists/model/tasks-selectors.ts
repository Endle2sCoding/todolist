import type { TasksState } from "./types/todolist";
import type { RootState } from "@/app/providers/store/store";

export const selectTasks = (state: RootState): TasksState => state.tasks;
