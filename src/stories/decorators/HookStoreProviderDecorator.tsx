/*import React from "react";
import { Provider } from "react-redux";
import { store } from "../../state/store";

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={store}>{storyFn()}</Provider>
);*/

import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../../state/tasks-reducer";
import { todolistsReducer } from "../../state/todolists-reducer";
import { AppRootStateType } from "../../state/store";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const HookStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
