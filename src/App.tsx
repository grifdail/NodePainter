import "./App.css";
import { Graph } from "./Components/Graph/Graph";

import { Router } from "./Components/Router";

function App() {
  return (
    <div className="App">
      <Graph></Graph>
      <Router />
    </div>
  );
}

export default App;
