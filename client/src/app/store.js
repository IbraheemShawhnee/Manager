import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import billsReducer from "../features/Bills/billsSlice";
import workersReducer from "../features/Workers/workersSlice";
import logsReducer from "../features/Logs/logsSlice";
import payeesReducer from "../features/Payees/payeesSlice";
import chequesReducer from "../features/Cheques/chequesSlice";

const store = configureStore({
    reducer: {
        bills: billsReducer,
        workers: workersReducer,
        logs: logsReducer,
        payees: payeesReducer,
        cheques: chequesReducer,
    }
}, applyMiddleware(thunk))

export default store;