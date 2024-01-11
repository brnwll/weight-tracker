import React, { useState } from "react";

import "./App.css";

const initialState = [
  { name: "1/1", weight: 232.52 },
  { name: "1/2", weight: 229 },
  { name: "1/3", weight: 230 },
  { name: "1/4", weight: 231 },
  { name: "1/5", weight: 229 },
  { name: "1/6", weight: 229.5 },
];

function App() {
  const [state, setState] = useState(initialState);
  return <div className="App"></div>;
}

export default App;
