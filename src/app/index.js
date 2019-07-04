import React, { Component } from "../../node_modules/react";
import "./styles/main.scss";
import Wow from "./components/Wow";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wow />
      </div>
    );
  }
}

export default App;
