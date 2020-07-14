import { FilterValType, TodoListType } from "../App";
import { v1 } from "uuid";

/*type ActionType = {
  type: string;
  [key: string]: any;
};*/
type IRemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type IAddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type IChangeTitleTodoListActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type IChangeFilterTodoListActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValType;
};

export type IActionsType =
  | IChangeFilterTodoListActionType
  | IAddTodoListActionType
  | IChangeTitleTodoListActionType
  | IRemoveTodoListActionType;

export const RemoveTodoListAC = (
  todoListId: string
): IRemoveTodoListActionType => {
  return {
    type: "REMOVE-TODOLIST",
    id: todoListId,
  };
};

export const ChangeTitleTodoListAC = (
  todoListId: string,
  title: string
): IChangeTitleTodoListActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId,
    title,
  };
};

export const ChangeFilterTodoListAC = (
  todoListId: string,
  filter: FilterValType
): IChangeFilterTodoListActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListId,
    filter,
  };
};

export const AddTodoListAC = (title: string): IAddTodoListActionType => {
  return { type: "ADD-TODOLIST", title };
};
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (
  state: Array<TodoListType>,
  action: IActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((l) => l.id !== action.id);
    case "ADD-TODOLIST":
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.title,
        filter: "all",
      };
      return [...state, newTodoList];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      throw new Error("I don't understand this type");
  }
};
