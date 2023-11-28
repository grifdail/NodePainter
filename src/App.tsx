import React from "react";
import "./App.css";
import "./Nodes/Draw";
import "./Nodes/Math";
import "./Nodes/System";
import "./Nodes/Vector";
import { Grid } from "./Components/Grid";
import { useToggle } from "@uidotdev/usehooks";
import { AddModal } from "./Components/AddModal";
import { GridUi } from "./Components/GridUi";

function App() {
  var [addModelOpen, toggleAddModal] = useToggle(false);

  return (
    <div className="App">
      <Grid></Grid>
      <GridUi visible={!addModelOpen} openAddModal={toggleAddModal}></GridUi>
      <AddModal visible={addModelOpen} close={toggleAddModal}></AddModal>
    </div>
  );
}

export default App;
