import React, { useEffect } from "react";
import "./App.css";
import Loader from "react-loader-spinner";
import MainWeather from "./components/MainWeather";
import WindHistory from "./components/WindHistory";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from "./store/action-types";

function App() {
  const { isFetching } = useSelector(state => state.marsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWeather = async () => {
      dispatch({ type: FETCH_WEATHER_START });
      const res = await fetch(
        "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0"
      );
      if (res.status >= 200 && res.status <= 299) {
        const weatherData = await res.json();
        dispatch({ type: FETCH_WEATHER_SUCCESS, payload: weatherData });
      } else {
        dispatch({
          type: FETCH_WEATHER_FAILURE,
          payload: `${res.status}: ${res.statusText}`
        });
      }
    };
    getWeather();
  }, [dispatch]);

  return (
    <div className="App">
      <main>
        {isFetching ? (
          <Loader
            className="loader"
            type="MutatingDots"
            color="#0d0a0b"
            height={100}
            width={100}
            timeout={30000} //3 secs
          />
        ) : (
          <>
            <MainWeather />
            <WindHistory />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
