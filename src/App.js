import "./App.css";

import { useEffect, useState } from "react";
import Card from "./components/Card/Card";


const cardsImages = [
  { "src": "/img/elector.jpg", matched: false },
  { "src": "/img/nidoking.jpg", matched: false },
  { "src": "/img/pikachu.jpg", matched: false },
  { "src": "/img/ronflex.jpg", matched: false },
  { "src": "/img/simularbre.jpg", matched: false },
  { "src": "/img/tygnon.jpg", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice =  (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card;
              }
            })
        })
        reset()
      } else {
        setTimeout(() => reset(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)


  const reset = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1);
      setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns : {turns}</p>
      </div>
      <div className="grid">
        {cards.map(card => (
          <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
        ))}
      </div>
      
    </div>
  );
}

export default App;
