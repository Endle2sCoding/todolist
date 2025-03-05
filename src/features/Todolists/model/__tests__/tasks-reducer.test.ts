import { beforeEach, expect, test } from "vitest";

// import { tasksReducer } from "../tasks-reducer";
// import { createTodolistAC, deleteTodolistAC } from "../todolists-reducer";
// import { DomainTask } from "../../api/tasksApi.types";
import { TaskPriority, TaskStatus } from "@/common/enums";
import { TasksState } from "@/app/App";
import { addTask, removeTask, tasksReducer, updateTask } from "../tasks-reducer";
export let startState: TasksState = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1", title: "CSS", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "2", title: "JS", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "3", title: "React",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      }
    ],
    todolistId2: [

      {
        id: "1", title: "bread", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "2", title: "milk", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "3", title: "tea",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      }
    ],
  };
});
test("test stub", () => {
});
// test("array should be created for new todolist", () => {
//   const endState = tasksReducer(startState, addTodolist("New todolist"));

//   const keys = Object.keys(endState);
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
//   if (!newKey) {
//     throw Error("New key should be added");
//   }

//   expect(keys.length).toBe(3);
//   expect(endState[newKey]).toEqual([]);
// });

// test("property with todolistId should be deleted", () => {
//   const endState = tasksReducer(startState, deleteTodolistAC({ id: "todolistId2" }));

//   const keys = Object.keys(endState);

//   expect(keys.length).toBe(1);
//   expect(endState["todolistId2"]).not.toBeDefined();
//   // or
//   expect(endState["todolistId2"]).toBeUndefined();
// });

// test("correct task should be deleted", () => {
//   const endState = tasksReducer(startState, deleteTaskAC({ todolistId: "todolistId2", taskId: "2" }));

//   expect(endState).toEqual({
//     todolistId1: [
//       { id: "1", title: "CSS", isDone: false },
//       { id: "2", title: "JS", isDone: true },
//       { id: "3", title: "React", isDone: false },
//     ],
//     todolistId2: [
//       { id: "1", title: "bread", isDone: false },
//       { id: "3", title: "tea", isDone: false },
//     ],
//   });
// });

test("correct task should be deleted", () => {
  const endState = tasksReducer(startState, removeTask({ todolistId: "todolistId2", taskId: "2" }));

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1", title: "CSS", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "2", title: "JS", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },
      {
        id: "3", title: "React",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      }
    ],
    todolistId2: [

      {
        id: "1", title: "bread", description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      },


      {
        id: "3", title: "tea",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
      }
    ],
  });
});

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    addTask({
      task: {
        todoListId: "todolistId2",
        id: "123",
        title: "juice",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
      }
    }),
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe("juice");
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New);
});

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      todolistId: "todolistId2", taskId: "2", domainModel: {
        title: "milk",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
      }
    }),
  );

  expect(endState.todolistId2[1].title).toBe("milk");
  expect(endState.todolistId2[1].status).toBe(TaskStatus.Completed);
});

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      todolistId: "todolistId2", taskId: "2", domainModel: {
        title: "New title",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
      }
    })

  );

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New);
  expect(endState.todolistId2[1].title).toBe("New title");
});
