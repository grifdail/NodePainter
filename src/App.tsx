import React, { useState } from "react";
import "./App.css";
import "./Nodes/Math";
import "./Nodes/System";
import { Grid } from "./Components/Grid";

function App() {
  var [viewbox, setViewbox] = useState({ x: 0, y: 0, scale: 1 });

  return (
    <div className="App">
      <Grid viewbox={viewbox} setViewBox={(x, y, scale) => setViewbox({ x, y, scale })}></Grid>
    </div>
  );
}

export default App;
