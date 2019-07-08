import React from 'react'
import { SVG } from "../img/icons";

export default function Menu(props) {
  const gameOver = props.reset;
  const nextGame = props.win;

  return (
    <div>
      {
        (gameOver || nextGame) && <div className="wow-menu">
          {
            gameOver ? <span>Game<SVG icon="heartBroken" />Over</span> :
              nextGame ? <span>You<SVG icon="heartFull" />Win</span> : ''
          }
          <button onClick={props.buttonHandler}>
            {nextGame ? 'Next Word' : "New Game"}
          </button>
        </div>
      }
    </div>
  )
}
