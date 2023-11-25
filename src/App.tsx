import React, { useState } from "react";
import { Tree } from "./Tree";
import "./App.css";
import "./Nodes/Math";
import { useDrag } from "@use-gesture/react";
import { Grid } from "./Grid";

function App() {
  var t = new Tree();
  t.AddNode("AddNumber", 50, 200);
  var [viewbox, setViewbox] = useState({ x: 0, y: 0, scale: 1 });

  return (
    <div className="App">
      <Grid tree={t} viewbox={viewbox} setViewBox={(x, y, scale) => setViewbox({ x, y, scale })}></Grid>
    </div>
  );
}

export default App;
