import React, { Component } from "react";
import { SVG } from "../img/icons";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxLives: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      lives: Array.from({ length: this.props.maxLives }),
      guessed: new Set(),
      answer: "apples",
      left: this.props.maxLives
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (<span>{this.state.guessed.has(ltr) ? ltr : ''}</span>));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(ps => ({
      guessed: ps.guessed.add(ltr),
      left: ps.left - (ps.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <div className="stats">
          <span className="title">GW</span>
          <span className="lives">
            {
              this.state.lives.map((l, i) => {
                let icon = i < this.state.left ? "heartFull" : "heart";
                return <SVG key={"lives" + i} icon={icon}/>
              })
            }
          </span>
        </div>

        {/* <img src={this.props.images[this.state.nWrong]} /> */}
        <div className='Hangman-board'>
          <p className='Hangman-word'>{this.guessedWord()}</p>
        </div>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
      </div>
    );
  }
}

export default Hangman;
