import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import UserContext from "./context";

const cardimages = [
  { src: "img/helmet-1.png", matched: false },
  { src: "img/potion-1.png", matched: false },
  { src: "img/ring-1.png", matched: false },
  { src: "img/scroll-1.png", matched: false },
  { src: "img/shield-1.png", matched: false },
  { src: "img/sword-1.png", matched: false },
];

function App() {
  //shuffle items
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardimages, ...cardimages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // to start the game automatically
  useEffect(()=>{
    shuffleCards();
  },[])

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p id="turn">Turns : {turn}</p>
    </div>

    // <div className="App">
    //   <h1>Magic Memory</h1>
    //   <button onClick={shuffleCards}>New Game</button>

    //   <div className="card-grid">
    //     {cards.map((card) => (
    //       <UserContext.Provider value={{card , handleChoice}}>
    //         <Card />
    //       </UserContext.Provider>
    //     ))}
    //   </div>
    // </div>
  );
}

export default App;
