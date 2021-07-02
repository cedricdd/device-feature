import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlaceNavigator from "./navigation/PlaceNavigator";
import placeReducer from "./store/places-reducers";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Database Initiated!");
  })
  .catch((error) => {
    console.log("Database init failed!");
    console.log(error);
  });

const rootReducer = combineReducers({
  places: placeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}
