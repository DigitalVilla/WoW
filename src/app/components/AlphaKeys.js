import React from 'react';

export default function AlphaKeys(props) {
  /** generateButtons: return array of letter buttons to render */
  const keys = props.keys || "abcdefghijklmnopqrstuvwxyz";

  return (
    <div className={props.className}>
      {
        keys.split("").map((ltr, i) => (<button key={'letterBtn-' + i}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}>
          {ltr}
        </button>))
      }
    </div>
  )
}
