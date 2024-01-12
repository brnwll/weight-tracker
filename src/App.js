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
  const [state, setState] = useState(initialState);

  const handleChartClick = (e) => {
    console.log("handleLineChartClick", e);
  };

  const onMouseDownOverLine = (e) => {
    console.log("onMouseDownOverLine", e);
  };

  const handleDotClick = (e) => {
    // e.payload.x, y
    const { x, y } = e.payload;
    setState(state.map((item) => (item.x === x ? { x, y: 190 } : item)));
    console.log("handleDotClick", e);
  };

  return (
    <div className="App">
      <div id="y-axis">
        <ResponsiveContainer width={80} height="100%">
          <LineChart className="custom-y-axis" data={state}>
            <Line className="hide" dataKey="y" />
            <XAxis className="hide" dataKey="x" />
            <YAxis domain={[170, 240]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div id="yo-chart">
        <ResponsiveContainer width={1000} height="100%">
          <LineChart
            className="custom-y-axis"
            data={state}
            onClick={handleChartClick}
          >
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              strokeWidth={5}
              dot={{
                stroke: "red",
                strokeWidth: 2,
                r: 5,
                onClick: handleDotClick,
              }}
              onMouseDown={onMouseDownOverLine}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="x" />
            <YAxis className="hide" domain={[170, 240]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;

// activeDot={{ stroke: "red", strokeWidth: 2, r: 10 }}
