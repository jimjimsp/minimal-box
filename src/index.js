import React from "react";
import ReactDOM from "react-dom";
import BlockSampler from "./components/BlockSampler.js";
import "./css/main.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BlockSampler />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
