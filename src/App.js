import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import "./App.css";

const initialState = [
  { name: "1/1/24", lbs: 400 },
  { name: "1/2/24", lbs: 200 },
  { name: "1/4/24", lbs: 250 },
];

function App() {
  const [state, setState] = useState(initialState);

  const handleClick = (e) => {
    
  }

  return (
    <div className="App">
      <LineChart
        width={600}
        height={300}
        data={state}
        onClick={(e) => console.log(e)}
      >
        <Line type="monotone" dataKey="lbs" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default App;
