import "./App.css";
import "./Nodes/Draw";
import "./Nodes/Math";
import "./Nodes/System";
import "./Nodes/Vector";
import "./Nodes/Inputs";
import { Grid } from "./Components/Grid";
import { Router } from "./Components/Router";

function App() {
  return (
    <div className="App">
      <Grid></Grid>
      <Router />
    </div>
  );
}

export default App;
