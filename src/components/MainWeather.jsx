import React from "react";

import "./main-weather.scss";
import { useSelector } from "react-redux";
import moment from "moment";

export default function MainWeather() {
  const { marsWeather, error } = useSelector(state => state.marsReducer);
  const today = marsWeather[0];
  return (
    <div className="main-weather-wrapper">
      <h1 className="main-header">Latest Weather From Mars</h1>
      {error ? (
        <p className="error">Uh oh, something happened - {error}</p>
      ) : (
        <div className="weather">
          <div className="current-date">
            <h2 className="sol">
              sol: <span>{today?.sol_key}</span>
            </h2>
            <p>{moment(today?.Last_UTC).format("MMMM Do, YYYY")}</p>
          </div>

          <div className="divider" />

          <div className="current-weather">
            <h2 className="temp">{today?.AT.av} &deg;F</h2>
            <p>
              High: {today?.AT.mx} &deg;F | Low: {today?.AT.mn} &deg;F
            </p>
          </div>

          <div className="divider" />

          <div className="current-wind">
            <h2 className="temp">
              {today && Math.round(today.HWS.av * 2.236937 * 10) / 10} mph
            </h2>
            <p>Direction: {today?.WD.most_common.compass_point}</p>
          </div>
        </div>
      )}
      <p className="season">
        Current season:{" "}
        {`${today?.Season.charAt(0).toUpperCase()}${today?.Season.slice(1)}`}
      </p>
    </div>
  );
}
