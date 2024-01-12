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

  const handleClick = (e) => {};

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
            onClick={(e) => {
              console.log("onClick", e);
            }}
          >
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              strokeWidth={5}
              activeDot={{ stroke: "red", strokeWidth: 2, r: 10 }}
              onMouseDown={(e) => {
                console.log("onMouseDown", e);
              }}
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
