import React, { useState, useEffect } from "react";
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
  const [movingDot, setMovingDot] = useState(null); // x
  // { x: 1/2/24, y: 232, previousY: 232 }

  const startMoveDot = (e) => {
    const weightEntry = state.find((weight) => weight.x === e.payload.x);
    weightEntry.previousY = weightEntry.y;
    setMovingDot(weightEntry);
  };

  const moveDot = (e) => {
    if (!movingDot) return;
    const x = movingDot.x;
    const y = convertToWeight(e.chartY);
    setState(state.map((entry) => (entry.x === x ? { x, y } : entry)));
  };

  const endMoveDot = (e) => setMovingDot(null);

  const handleMouseLeaveDuringWeightChange = (e) => {
    if (!movingDot) return;
    const x = movingDot.x;
    const y = movingDot.previousY;
    setState(state.map((entry) => (entry.x === x ? { x, y } : entry)));
    setMovingDot(null);
  };

  const convertToWeight = (y) => {
    return Math.round(((chartHeight - y) / chartHeight) * (yMax - yMin) + yMin);
  };

  useEffect(() => {
    const canvas = document.getElementById("yo-chart").getBoundingClientRect();
    setChartHeight(canvas.height);
  }, []);

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
        <ResponsiveContainer width={700} height="100%">
          <LineChart
            className="custom-y-axis"
            data={state}
            onMouseMove={moveDot}
            onMouseUp={endMoveDot}
            onMouseLeave={handleMouseLeaveDuringWeightChange}
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
                onMouseDown: startMoveDot,
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
