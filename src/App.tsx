import React from "react";
import "./App.css";
import "./Nodes/Draw";
import "./Nodes/Math";
import "./Nodes/System";
import "./Nodes/Vector";
import { Grid } from "./Components/Grid";
import { useToggle } from "@uidotdev/usehooks";
import { NodeCreationModal } from "./Components/NodeCreationModal";
import { GridUi } from "./Components/GridUi";

function App() {
  var [addModelOpen, toggleAddModal] = useToggle(false);

  return (
    <div className="App">
      <Grid></Grid>
      {!addModelOpen && <GridUi openAddModal={toggleAddModal} />}
      {addModelOpen && <NodeCreationModal close={toggleAddModal} />}
    </div>
  );
}

export default App;
