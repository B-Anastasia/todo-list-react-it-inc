import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../components/App/App";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>;
let newTodolistTitle: string;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  newTodolistTitle = "New Todolist";
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todolistsReducer(
    startState,
    AddTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
  expect(endState[2].id).toBeDefined();
});

test("correct todolist should change its name", () => {
  const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const action = ChangeTodolistFilterAC(todolistId2, newFilter);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
