import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import rootReducer from "./reducers/root"; // Import the combined root reducer

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer, // Use the combined root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)// Add saga middleware and ignore serializable check for sagas
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export the configured store
export default store;
