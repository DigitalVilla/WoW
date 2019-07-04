import React from 'react'
import { SVG } from "../img/icons";

export default function Menu(props) {
  const { livesLeft, reset, nextGame } = props.state;
  const gameOver = livesLeft === 0;
  const value = nextGame ? 'Next Word' : "New Game"
  return (
    <div>
      {
        (gameOver || nextGame || reset) && <div className="wow-menu">
          {
            gameOver ? <span>Game<SVG icon="heartBroken" />Over</span> :
              nextGame ? <span>You<SVG icon="heartFull" />Win</span> : ''
          }
          <button value={value} onClick={this.handleMenuButton}>{value}</button>
        </div>
      }
    </div>
  )
}
