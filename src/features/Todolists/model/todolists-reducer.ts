import { RootState } from "@/app/providers/store/store";
import { FilterValues, TodolistType } from "./types/todolist";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: TodolistType[] = [
  { id: "todolistId1", title: "What to learn", filter: "all" },
  { id: "todolistId2", title: "What to buy", filter: "all" },
];

export const removeTodolistAC = createAction<{ id: string; }>('todolists/removeTodolist');
export const createTodolistAC = createAction<{ id: string, title: string; }>('todolists/createTodolist');
export const changeTodolistTitleAC = createAction<{ id: string, title: string; }>('todolists/changeTodolistTitle');
export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues; }>('todolists/changeTodolistFilter');


export const todolistsReducer = createReducer(initialState, builder => {
  builder
    .addCase(removeTodolistAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
  builder
    .addCase(createTodolistAC, (state, action) => {
      state.push({ id: action.payload.id, title: action.payload.title, filter: "all" });
    });
  builder
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    });
  builder
    .addCase(changeTodolistFilterAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    });
});

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;

// export const removeTodolistAC = (id: string) => {
//   return {
//     type: "remove_todolist",
//     payload: {
//       id: id
//     }
//   } as const;
// };

// export const createTodolistAC = ({ id, title }: { id: string, title: string; }) => {
//   return {
//     type: "create_todolist",
//     payload: {
//       title: title,
//       id: id
//     }
//   } as const;
// };
// export const changeTodolistTitleAC = ({ id, title }: { id: string, title: string; }) => {
//   return {
//     type: "change_todolist_title",
//     payload: {
//       title: title,
//       id: id
//     }
//   } as const;
// };
// export const changeTodolistFilterAC = ({ id, filter }: { id: string, filter: FilterValues; }) => {
//   return {
//     type: "change_todolist_filter",
//     payload: {
//       filter: filter,
//       id: id
//     }
//   } as const;
// };

// export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
// export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
// type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
// type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;







// type ActionsType = RemoveTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction;



// export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
//   switch (action.type) {
//     case "remove_todolist":
//       return state.filter(tl => tl.id !== action.payload.id);
//     case "create_todolist":
//       return [...state, { id: action.payload.id, title: action.payload.title, filter: "all" }];
//     case "change_todolist_title":
//       return [...state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)];
//     case "change_todolist_filter":
//       return [...state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)];
//     default:
//       return state;
//   }
// };
