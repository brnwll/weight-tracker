import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./App.css";

// TODO: BUG FIX
// Solved with mouse, but if I drag off of chart on touchscreen while
// channging a weight entry bad thing happen. Need to figure out how to
// fix this

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
  { x: "", y: null },
  { x: "", y: null },
];

function App() {
  const [chartHeight, setChartHeight] = useState(0);
  const [yMin, setYMin] = useState(170);
  const [yMax, setYMax] = useState(240);
  const [state, setState] = useState(initialState);
  const [changingWeightValue, setChangingWeightValue] = useState(false);
  // { x: 1/2/24, y: 232, previousY: 232 }

  const startMoveDot = (e) => {
    const weightEntry = state.find((weight) => weight.x === e.payload.x);
    weightEntry.previousY = weightEntry.y;
    setChangingWeightValue(weightEntry);
  };
  const moveDot = (e) => {
    if (!changingWeightValue) return;
    const x = changingWeightValue.x;
    const y = convertToWeight(e.chartY);
    setState(state.map((entry) => (entry.x === x ? { x, y } : entry)));
  };
  const endMoveDot = (e) => setChangingWeightValue(false);
  const handleMouseLeaveDuringWeightChange = (e) => {
    if (!changingWeightValue) return;
    const x = changingWeightValue.x;
    const y = changingWeightValue.previousY;
    setState(state.map((entry) => (entry.x === x ? { x, y } : entry)));
    setChangingWeightValue(false);
  };

  const convertToWeight = (y) => {
    return Math.round(((chartHeight - y) / chartHeight) * (yMax - yMin) + yMin);
  };

  useEffect(() => {
    const canvas = document.getElementById("yo-chart").getBoundingClientRect();
    setChartHeight(canvas.height);
  }, []);

  const handleMouseDownOnChart = (e) => {
    console.log(e);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!(active && payload && payload.length)) return null;
    const { x, y } = payload[0].payload;
    if (changingWeightValue) {
      return (
        <div className="custom-tooltip">
          <p className="desc">Now we're editing</p>
        </div>
      );
    } else {
      return (
        <div className="custom-tooltip">
          <p className="desc">{`${x} ${y}`}</p>
        </div>
      );
    }
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
        <ResponsiveContainer width={700} height="100%">
          <LineChart
            className="custom-y-axis"
            data={state}
            // TODO: ADD A NEW ENTRIES
            // use onMouseDown to start a new entry
            onMouseDown={handleMouseDownOnChart}
            // use onTouchStart to start a new entry
            // this will give you an activeLabel (x-axis value)
            // if there is no entry for this label AND...
            // the label (date) is not in the future
            // then add a new entry to the state
            onMouseMove={moveDot}
            onMouseUp={endMoveDot}
            onMouseLeave={handleMouseLeaveDuringWeightChange}
            onTouchMove={moveDot}
            onTouchEnd={endMoveDot}
          >
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              strokeWidth={5}
              isAnimationActive={false}
              dot={{
                stroke: "#8884d8",
                strokeWidth: 3,
                r: 10,
                onMouseDown: startMoveDot,
                onTouchStart: startMoveDot,
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              isActiveAnimation={false}
              // TODO: Pin to dot, how?
              position={{ x: 0, y: 0 }}
            />
            <CartesianGrid stroke="#ccc" opacity={0.75} strokeDasharray="2 3" />
            <XAxis dataKey="x" />
            <YAxis className="hide" domain={[yMin, yMax]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
