import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType,} from "./todolists-reducer";
import {TasksPriorities, TasksStateType, TasksStatuses} from "../api/tasks-api";

export type RemoveTaskType = {
  type: "REMOVE_TASK";
  taskId: string;
  todolistId: string;
};
export type AddTaskType = {
  type: "ADD_TASK";
  title: string;
  todolistId: string;
};
export type ChangeTaskStatusType = {
  type: "CHANGE_STATUS_TASK";
  id: string;
  status:TasksStatuses
  todolistId: string;
};
export type ChangeTaskTitleType = {
  type: "CHANGE_TITLE_TASK";
  id: string;
  title: string;
  todolistId: string;
};

export type ActionsType =
  | RemoveTaskType
  | AddTaskType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
):TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK":
      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId]].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "ADD_TASK":
      const newTask = {
        id: v1(),
        title: action.title,
            todoListId: action.todolistId,
            status: TasksStatuses.New,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TasksPriorities.Low,
            completed: true,
            description: '',
      };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    case "CHANGE_STATUS_TASK":
      return {
        ...state,
        [action.todolistId]:state[action.todolistId].map(el=>(el.id===action.id)? {...el,status: action.status}:el)
      /*  [action.todolistId]: newArr(
          state[action.todolistId],
          action.id,
          action.status
        ),*/
      };
    case "CHANGE_TITLE_TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el=>(el.id===action.id)? {...el,title: action.title}:el)
          //   newArr(
          // state[action.todolistId],
          // action.id,
          // action.title
        // ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };
    case "REMOVE-TODOLIST":
      const newState = { ...state };
      delete newState[action.id];

      return newState;
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskType => {
  return { type: "REMOVE_TASK", taskId, todolistId };
};
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
  return { type: "ADD_TASK", title, todolistId };
};

export const changeTaskStatusAC = (
  id: string,
  status:TasksStatuses,
  todolistId: string
): ChangeTaskStatusType => {
  return { type: "CHANGE_STATUS_TASK", id, status, todolistId };
};
export const changeTaskTitleAC = (
  id: string,
  title: string,
  todolistId: string
): ChangeTaskTitleType => {
  return { type: "CHANGE_TITLE_TASK", id, title, todolistId };
};

// const newArr = (
//   tasks: Array<ITaskType>,
//   taskId: string,
//   property: boolean | string |TasksStatuses |TasksPriorities
// ): Array<ITaskType> => {
//   let propName = typeof property === "boolean" ? "isDone" : "title";
//
//   return tasks.map((t) =>
//     t.id === taskId ? { ...t, [propName]: property } : t
//   );
// };
