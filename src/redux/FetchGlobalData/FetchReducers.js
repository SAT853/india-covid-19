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

import {
  fetchGlobalDataSuccess,
  fetchGlobalDataFailed,
  fetchCountryConfimredSuccess,
  fetchCountryConfirmedFailed,
  fetchCountryDeathsSuccess,
  fetchCountryDeathsFailed,
  fetchCountryRecoveredSuccess,
  fetchCountryRecoveredFailed
} from "./FetchActions";

import axios from "axios";

// Global wise case state
const globalState = {
  data: [],
  error: ""
};

const FetchGlobalDataReducers = (state = globalState, { type, payload }) => {
  switch (type) {
    case FETCH_GLOBAL_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload]
      };
    case FETCH_GLOBAL_DATA_FAILED:
      return {
        ...state,
        data: [],
        error: payload
      };

    default:
      return state;
  }
};

// Country wise case State
const countryStateConfirmed = {
  data: [],
  error: ""
};

const FetchCountryConfirmedReducers = (
  state = countryStateConfirmed,
  { type, payload }
) => {
  switch (type) {
    case FETCH_COUNTRY_CONFIRMED_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case FETCH_COUNTRY_CONFIRMED_FAILED:
      return {
        ...state,
        data: [],
        error: payload
      };

    default:
      return state;
  }
};

const countryStateDeaths = {
  data: [],
  error: ""
};

const FetchCountryDeathsReducers = (
  state = countryStateDeaths,
  { type, payload }
) => {
  switch (type) {
    case FETCH_COUNTRY_DEATHS_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case FETCH_COUNTRY_DEATHS_FAILED:
      return {
        ...state,
        data: [],
        error: payload
      };

    default:
      return state;
  }
};

const countryStateRecovered = {
  data: [],
  error: ""
};

const FetchCountryRecoveredReducers = (
  state = countryStateRecovered,
  { type, payload }
) => {
  switch (type) {
    case FETCH_COUNTRY_RECOVERED_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case FETCH_COUNTRY_RECOVERED_FAILED:
      return {
        ...state,
        data: [],
        error: payload
      };

    default:
      return state;
  }
};

const fetchGlobal = () => {
  return dispatch => {
    axios
      .get("https://covid19.mathdro.id/api")
      .then(res => {
        const data = {
          confirmed: res.data.confirmed.value,
          deaths: res.data.deaths.value,
          recovered: res.data.recovered.value,
          lastUpdate: res.data.lastUpdate
        };

        dispatch(fetchGlobalDataSuccess(data));
      })
      .catch(error => {
        dispatch(fetchGlobalDataFailed(error.message));
      });
  };
};

const fetchCountryConfirmed = () => {
  return dispatch => {
    axios
      .get("https://covid19.mathdro.id/api/confirmed")
      .then(res => {
        const data = res.data.map(item => {
          return {
            countryRegion: item.countryRegion,
            confirmed: item.confirmed
          };
        });
        dispatch(fetchCountryConfimredSuccess(data));
      })
      .catch(error => {
        dispatch(fetchCountryConfirmedFailed(error.message));
      });
  };
};

const fetchCountryDeaths = () => {
  return dispatch => {
    axios
      .get("https://covid19.mathdro.id/api/deaths")
      .then(res => {
        const data = res.data.map(item => {
          return {
            countryRegion: item.countryRegion,
            deaths: item.deaths
          };
        });
        dispatch(fetchCountryDeathsSuccess(data));
      })
      .catch(error => {
        dispatch(fetchCountryDeathsFailed(error.message));
      });
  };
};

const fetchCountryRecovered = () => {
  return dispatch => {
    axios
      .get("https://covid19.mathdro.id/api/recovered")
      .then(res => {
        const data = res.data.map(item => {
          return {
            countryRegion: item.countryRegion,
            recovered: item.recovered
          };
        });
        dispatch(fetchCountryRecoveredSuccess(data));
      })
      .catch(error => {
        dispatch(fetchCountryRecoveredFailed(error.message));
      });
  };
};

export {
  FetchGlobalDataReducers,
  fetchGlobal,
  FetchCountryConfirmedReducers,
  fetchCountryConfirmed,
  FetchCountryDeathsReducers,
  fetchCountryDeaths,
  FetchCountryRecoveredReducers,
  fetchCountryRecovered
};
