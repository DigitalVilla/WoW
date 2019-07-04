import React from 'react';
import Logo from "../img/icon.png";
import { SVG } from "../img/icons";

export default function Header(props) {
  const {rounds, score, livesLeft} = props.state;
  return (
    <div className="wow-header">
      <img className="main-logo" src={Logo} alt="DigitalVilla"/>
      <span className="lives-text">Round: {rounds}</span>
      <span className="lives-text">Score: {score}</span>
      <span className="lives">
        {
          props.lives.map((l, i) => {
            let icon = i < livesLeft ? "heartFull" : "heart";
            let iClass = icon === "heart" ? "empty" : '';
            return <SVG className={iClass} key={"lives" + i} icon={icon} />
          })
        }
      </span>
    </div>
  )
}
