import React, { useContext } from "react";
import "./Card.css";
import UserContext from "../context";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src}></img>
        <img className="back" src="/img/cover.png" onClick={handleClick}></img>
      </div>
    </div>
  );
};

// <---------------------------------------------- using context api ------------------------------------------------>
// const Card = () => {
//   const { card, handleChoice } = useContext(UserContext);

//   const handleClick = () => {
//     handleChoice(card);
//   };

//   return (
//     <div className="card">
//       <div>
//         <img className="front" src={card.src}></img>
//         <img className="back" src="/img/cover.png" onClick={handleClick}></img>
//       </div>
//     </div>
//   );
// };

export default Card;
