import type { RootState } from "@/app/providers/store/store";
import { DomainTodolist } from "../slices/todolists-reducer";

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
