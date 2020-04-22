import {
  FETCH_GLOBAL_DATA_SUCCESS,
  FETCH_GLOBAL_DATA_FAILED,
  FETCH_COUNTRY_CONFIRMED_SUCCESS,
  FETCH_COUNTRY_CONFIRMED_FAILED,
  FETCH_COUNTRY_DEATHS_SUCCESS,
  FETCH_COUNTRY_DEATHS_FAILED,
  FETCH_COUNTRY_RECOVERED_SUCCESS,
  FETCH_COUNTRY_RECOVERED_FAILED
} from "./FetchTypes";

const fetchGlobalDataSuccess = data => {
  return {
    type: FETCH_GLOBAL_DATA_SUCCESS,
    payload: data
  };
};

const fetchGlobalDataFailed = error => {
  return {
    type: FETCH_GLOBAL_DATA_FAILED,
    payload: error
  };
};

const fetchCountryConfimredSuccess = data => {
  return {
    type: FETCH_COUNTRY_CONFIRMED_SUCCESS,
    payload: data
  };
};

const fetchCountryConfirmedFailed = error => {
  return {
    type: FETCH_COUNTRY_CONFIRMED_FAILED,
    payload: error
  };
};

const fetchCountryDeathsSuccess = data => {
  return {
    type: FETCH_COUNTRY_DEATHS_SUCCESS,
    payload: data
  };
};

const fetchCountryDeathsFailed = error => {
  return {
    type: FETCH_COUNTRY_DEATHS_FAILED,
    payload: error
  };
};

const fetchCountryRecoveredSuccess = data => {
  return {
    type: FETCH_COUNTRY_RECOVERED_SUCCESS,
    payload: data
  };
};

const fetchCountryRecoveredFailed = error => {
  return {
    type: FETCH_COUNTRY_RECOVERED_FAILED,
    payload: error
  };
};

export {
  fetchGlobalDataSuccess,
  fetchGlobalDataFailed,
  fetchCountryConfimredSuccess,
  fetchCountryConfirmedFailed,
  fetchCountryDeathsSuccess,
  fetchCountryDeathsFailed,
  fetchCountryRecoveredSuccess,
  fetchCountryRecoveredFailed
};
