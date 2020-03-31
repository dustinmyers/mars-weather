import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from "./action-types";

const initialState = {
  marsWeather: [],
  isFetching: false,
  error: ""
};

export const marsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_WEATHER_SUCCESS:
      const weatherArr = [];
      action.payload.sol_keys.forEach(v =>
        weatherArr.push({ ...action.payload[v], sol_key: v })
      );
      return {
        ...state,
        isFetching: false,
        marsWeather: weatherArr.reverse()
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
