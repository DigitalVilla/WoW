import React, { Component } from "../../node_modules/react";
import "./styles/main.scss";
import Hangman from "./components/Hangman";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hangman />
      </div>
    );
  }
}

export default App;
