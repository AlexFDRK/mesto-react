import "../index.css";
import penPath from "../images/pen.svg";
import Card from "../components/Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) => {
  const currentContextData = useContext(CurrentUserContext);
  const currentUser = currentContextData.currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__frame" onClick={onEditAvatar}>
            <img className="profile__overlay" src={penPath} alt="pen" />
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            onCardClick={onCardClick}
            handleCardLike={onCardLike}
            handleCardDelete={onCardDelete}
            card={item}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
