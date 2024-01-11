import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./App.css";

const initialState = [
  { x: new Date(2024, 0, 1), y: 232.52 },
  { x: new Date(2024, 0, 2), y: 232 },
  { x: new Date(2024, 0, 3), y: 230 },
  { x: new Date(2024, 0, 4), y: 231 },
  { x: new Date(2024, 0, 5), y: 235 },
  { x: new Date(2024, 0, 6), y: 230 },
  { x: new Date(2024, 0, 7), y: 231 },
  { x: new Date(2024, 0, 8), y: 230 },
  { x: new Date(2024, 0, 9), y: 229 },
  { x: new Date(2024, 0, 10), y: 232 },
  { x: new Date(2024, 0, 11), y: 230 },
  { x: new Date(2024, 0, 12), y: 231 },
];

function App() {
  const [state, setState] = useState(initialState);
  const options = {
    animationEnabled: true,
    title: {
      text: "Weight Tracker",
    },
    axisX: {
      valueFormatString: "M/D",
    },
    axisY: {
      title: "Pounds",
      prefix: "",
    },
    data: [
      {
        yValueFormatString: "###.##",
        xValueFormatString: "M/D",
        type: "spline",
        dataPoints: state,
        click: function (e) {
          // TODO: changing value by dragging the dataPoint
          console.log(
            e.dataSeries.type + " x:" + e.dataPoint.x + ", y: " + e.dataPoint.y
          );
        },
        mouseover: function (e) {
          e.dataPoint.y = 235;
          setState(
            state.map((dataPoint) => {
              if (dataPoint.x === e.dataPoint.x) {
                const updatedDataPoint = e.dataPoint;
                updatedDataPoint.y = 235;
                return updatedDataPoint;
              }
              return dataPoint;
            })
          );
        },
      },
    ],
  };

  let CanvasJS = CanvasJSReact.CanvasJS;
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="App">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default App;
