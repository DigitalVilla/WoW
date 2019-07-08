import React, { Component } from "react";
import quotes from "../../data/db";
import Header from "./Header";
import Menu from "./Menu";


class WOW extends Component {
  static defaultProps = {
    lives: 5
  };

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
  }

  componentWillMount() {
    this.init();
  }

  init(lives = this.props.lives, score = 0, rounds = 1) {
    const filteredQuotes = quotes.filter(quo => quo.length <= rounds * 30);
    const randomQuote = filteredQuotes[~~(Math.random() * filteredQuotes.length)].quote;
    this.answer = Array.from(new Set(randomQuote.split(" ").join("").toLowerCase())).sort().join('');
    this.lives = Array.from({ length: lives });
    this.quote = randomQuote;
    this.validGuess = '';

    this.setState({
      guessed: new Set(),
      livesLeft: lives,
      rounds,
      score,
    })
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.quote.split(" ").map((word, i) => (
      <span className="word" key={'word-' + i}>
        {
          word.split("").map((ltr, i) => (
            <span key={'ltr-' + i}>
              {this.state.livesLeft === 0 || this.state.guessed.has(ltr.toLowerCase()) ? ltr : ''}
            </span>
          ))
        }
      </span>
    ))
  }


  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, decrease number of livesLeft
  */
  handleGuess(e) {
    let ltr = e.target.value;
    if (this.answer.includes(ltr))
      this.validGuess = (this.validGuess += ltr).split("").sort().join('');

    this.setState(ps => ({
      score: this.answer === this.validGuess ? ps.score + ps.livesLeft * 100 : ps.score,
      livesLeft: ps.livesLeft - (this.quote.toLowerCase().includes(ltr) ? 0 : 1),
      guessed: ps.guessed.add(ltr)
    }))

  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, i) => (
      <button value={ltr} key={'letterBtn-' + i} onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}> {ltr} </button>
    ));
  }

  handleMenuButton() {
    console.log("handleMenuButton");
    if (this.answer === this.validGuess) {
      const { livesLeft, score, rounds } = this.state;
      this.init(livesLeft, score, rounds + 1);
    }
    else this.init();
  }

  render() {
    const { livesLeft, reset } = this.state;
    return (
      <div className='wow noSelect'>
        <Header
          state={this.state}
          lives={this.lives} />
        <Menu
          reset={livesLeft === 0 || reset}
          win={this.answer === this.validGuess}
          buttonHandler={this.handleMenuButton} />

        <div className='wow-board'>
          <div className="quote">
            {this.guessedWord()}
          </div>
        </div>

        <div className='wow-keyboard'>
          <div className="alphaKeys">
            {this.generateButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default WOW;
