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
    this.winCondition = this.winCondition.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
  }

  componentWillMount() {
    this.init();
  }

  init(lives, score, rounds) {
    const liv = lives || this.props.lives
    const random = quotes[~~(Math.random() * quotes.length)].quote;
    // const random = quotes[0].quote;

    this.answer = Array.from(new Set(random.split(" ").join("").toLowerCase())).sort().join('');
    this.lives = Array.from({ length: liv });
    this.validGuess = '';
    this.quote = random;

    this.setState({
      livesLeft: liv,
      guessed: new Set(),
      score: score || 0,
      rounds: rounds || 1,
      nextGame: false
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
    this.setState(ps => {
      const livesLeft = ps.livesLeft - (this.quote.toLowerCase().includes(ltr) ? 0 : 1);
      const guessed = ps.guessed.add(ltr);
      return !this.winCondition(ltr) ? { livesLeft, guessed } :
        { nextGame: true, score: ps.score += ps.livesLeft * 100, livesLeft, guessed }
    })

  }

  winCondition(ltr) {
    if (this.answer.includes(ltr)) this.validGuess += ltr
    return this.answer === this.validGuess.split("").sort().join('');
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, i) => (
      <button value={ltr} key={'letterBtn-' + i} onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}> {ltr} </button>
    ));
  }
  handleMenuButton() {
    if (this.state.nextGame) {
      const { livesLeft, score, rounds } = this.state;
      this.init(livesLeft, score, rounds + 1);
    }
    else this.init();
  }

  render() {
    return (
      <div className='wow noSelect'>
        <Header state={this.state} lives={this.lives} />
        <Menu state={this.state} />
        <div className='wow-board'> {this.guessedWord()} </div>
        <p className='wow-alphaKeys'>{this.generateButtons()}</p>
      </div>
    );
  }
}

export default WOW;
