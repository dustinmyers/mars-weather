import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

import "./wind-history.scss";
import { useSelector } from "react-redux";

export default function WindHistory() {
  const [data, setData] = useState([]);
  const { marsWeather } = useSelector(state => state.marsReducer);
  const theme = {
    textColor: "#fff",
    axis: {
      textColor: "#fff",
      tickColor: "#fff",
      legend: {
        text: {
          fontSize: 16
        }
      }
    },
    grid: {
      stroke: "#888",
      strokeWidth: 1
    },
    legends: {
      text: {
        fill: "#fff"
      }
    },
    tooltip: {
      container: {
        background: "#0d0a0b",
        color: "#fff"
      }
    },
    crosshair: {
      line: {
        stroke: "#fff"
      }
    }
  };
  useEffect(() => {
    if (marsWeather) {
      setData([
        {
          id: "Temperature",
          color: "#e7e247",
          data: marsWeather.map(v => ({ x: v.sol_key, y: `${v.AT.av} &deg;F` }))
        }
      ]);
    }
  }, [marsWeather]);
  return (
    <div className="wind-history-wrapper">
      <h1 className="main-header">Temperature Summary</h1>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 24, bottom: 80, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Sol",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Temperature",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        theme={theme}
      />
    </div>
  );
}
