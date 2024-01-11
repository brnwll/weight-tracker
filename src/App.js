import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-dragdata";

import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialState = [
  { name: "1/1", weight: 232.52 },
  { name: "1/2", weight: 229 },
  { name: "1/3", weight: 230 },
  { name: "1/4", weight: 231 },
  { name: "1/5", weight: 229 },
  { name: "1/6", weight: 229.5 },
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    dragData: {
      round: 1,
      showTooltip: true,
      onDragStart: function (e, datasetIndex, index, value) {
        console.log(e);
      },
      onDrag: function (e, datasetIndex, index, value) {
        e.target.style.cursor = "grabbing";
        console.log(e, datasetIndex, index, value);
      },
      onDragEnd: function (e, datasetIndex, index, value) {
        e.target.style.cursor = "default";
        console.log(datasetIndex, index, value);
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const weights = [235, 234, 232, 233, 230, 231, 228];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: weights,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   data: [230, 229, 228, 227, 226, 225, 224],
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

function App() {
  //const [state, setState] = useState(initialState);

  return (
    <div className="App">
      <Line options={options} data={data} />
    </div>
  );
}

export default App;
