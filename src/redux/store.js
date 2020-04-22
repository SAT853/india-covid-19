import {
  FetchGlobalDataReducers,
  FetchCountryConfirmedReducers,
  FetchCountryDeathsReducers,
  FetchCountryRecoveredReducers
} from "./FetchGlobalData/FetchReducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const root = combineReducers({
  globalState: FetchGlobalDataReducers,
  countryStateConfirmed: FetchCountryConfirmedReducers,
  countryStateDeaths: FetchCountryDeathsReducers,
  countryStateRecovered: FetchCountryRecoveredReducers
});

const store = createStore(root, applyMiddleware(thunk));

export { store };
