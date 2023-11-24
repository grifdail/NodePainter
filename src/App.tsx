import React from "react";
import { Tree } from "./Tree";
import logo from "./logo.svg";
import "./App.css";
import "./Nodes/Math";
import { GraphNode } from "./Graph/GraphNode";

function Grid({ tree }: { tree: Tree }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <rect x="16" y="16" width="1" height="1" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)"></rect>

      {Object.keys(tree.nodes).map((treeId) => {
        return <GraphNode node={tree.getNode(treeId)} key={treeId} />;
      })}
    </svg>
  );
}

function App() {
  var t = new Tree();
  t.AddNode("AddNumber", 50, 200);
  return (
    <div className="App">
      <Grid tree={t}></Grid>
    </div>
  );
}

export default App;
