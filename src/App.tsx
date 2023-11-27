import React, { useState } from "react";
import "./App.css";
import "./Nodes/Math";
import "./Nodes/System";
import { Grid } from "./Components/Grid";
import { useToggle } from "@uidotdev/usehooks";
import { AddModal } from "./Components/AddModal";
import { GridUi } from "./Components/GridUi";

function App() {
  var [viewbox, setViewbox] = useState({ x: 0, y: 0, scale: 1 });
  var [addModelOpen, toggleAddModal] = useToggle(false);

  return (
    <div className="App">
      <Grid viewbox={viewbox} setViewBox={(x, y, scale) => setViewbox({ x, y, scale })}></Grid>
      <GridUi visible={!addModelOpen} openAddModal={toggleAddModal}></GridUi>
      <AddModal visible={addModelOpen} close={toggleAddModal}></AddModal>
    </div>
  );
}

export default App;
