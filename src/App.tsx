import "./App.css";
import "./Nodes";
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
