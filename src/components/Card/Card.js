import React from "react";
import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="frontCard" src={card.src} alt="cover"></img>
        <img
          className="backCard"
          src="/img/cover.jpg"
          alt="front"
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}
