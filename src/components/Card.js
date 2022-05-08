import "../index.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ onCardClick, handleCardLike, handleCardDelete, card }) => {
  const currentContextData = useContext(CurrentUserContext);
  const currentUser = currentContextData.currentUser;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__bin ${
    isOwn ? "element__bin_state_visible" : ""
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_state_active" : ""
  }`;

  return (
    <article className="element">
      <img
        className="element__picture"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => {
          handleCardDelete(card);
        }}
        aria-label="Удалить"
      ></button>
      <div className="element__group">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => {
              handleCardLike(card);
            }}
            aria-label="Лайк"
          ></button>
          <p className="element__quantity">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
