import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const initialState = [
  { x: "", y: null },
  { x: "1/1/24", y: 235 },
  { x: "1/2/24", y: 232 },
  { x: "1/3/24", y: 229 },
  { x: "1/4/24", y: 228 },
  { x: "1/5/24", y: 229 },
  { x: "1/6/24", y: 226 },
  { x: "1/7/24", y: 228 },
  { x: "1/8/24", y: 225 },
];

function App() {
  const [chartHeight, setChartHeight] = useState(0);
  const [yMin, setYMin] = useState(170);
  const [yMax, setYMax] = useState(240);
  const [state, setState] = useState(initialState);
  const [movingDot, setMovingDot] = useState(null); // [x, y]

  const handleChartClick = (e) => {
    console.log("handleLineChartClick", e);
    if (movingDot) {
      const { x, y } = movingDot;
      const newY = convertChartYToDotY(e.chartY);
      // What is the maximum and minimum chartY values?
      setState(state.map((item) => (item.x === x ? { x, y: newY } : item)));
      setMovingDot(null);
    }
  };

  const handleDotClick = (e) => {
    // e.payload.x, y
    //const { x, y } = e.payload;
    //setState(state.map((item) => (item.x === x ? { x, y: 190 } : item)));
    if (!movingDot) {
      setMovingDot({ x: e.payload.x, y: e.payload.y });
    } else {
      setMovingDot(null);
    }
  };

  const convertChartYToDotY = (chartY) => {
    //console.log("chartHeight", chartHeight);
    //console.log("chartY", chartY);
    //console.log("yMin", yMin);
    //console.log("yMax", yMax);
    const dotY = Math.round(
      ((chartHeight - chartY) / chartHeight) * (yMax - yMin) + yMin
    );
    console.log("dotY", dotY);
    return dotY;
  };

  const handleMouseMove = (e) => {
    if (movingDot) {
      const { x, y } = movingDot;
      const newY = convertChartYToDotY(e.chartY);
      // What is the maximum and minimum chartY values?
      setState(state.map((item) => (item.x === x ? { x, y: newY } : item)));
    }
    //console.log("handleMouseMove", e);
  };

  const handleChartMouseEnter = (e) => {
    // TODO: Move this to run once when app loads, and again when window is resized
    // This is used to set a new weight for a dot using the mouse
    const chartHeight = document
      .getElementById("yo-chart")
      .getBoundingClientRect().height;
    setChartHeight(chartHeight);
  };

  return (
    <div className="App">
      <div id="y-axis">
        <ResponsiveContainer width={80} height="100%">
          <LineChart className="custom-y-axis" data={state}>
            <Line className="hide" dataKey="y" />
            <XAxis className="hide" dataKey="x" />
            <YAxis domain={[yMin, yMax]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div id="yo-chart">
        <ResponsiveContainer width={1000} height="100%">
          <LineChart
            className="custom-y-axis"
            data={state}
            onClick={handleChartClick}
            onMouseEnter={handleChartMouseEnter}
            onMouseMove={handleMouseMove}
          >
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              strokeWidth={5}
              dot={{
                stroke: "#8884d8",
                strokeWidth: 1,
                fill: "#8884d8",
                r: 5,
                onClick: handleDotClick,
              }}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="x" />
            <YAxis className="hide" domain={[yMin, yMax]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;

// activeDot={{ stroke: "red", strokeWidth: 2, r: 10 }}
