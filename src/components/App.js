import "../index.css";
import { EMTY_CARD } from "../utils/constants";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [ProfileIsVisible, setProfileIsVisible] = useState(false);
  const [AddPlaceIsVisible, setAddPlaceIsVisible] = useState(false);
  const [AvatarIsVisible, setAvatarIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(EMTY_CARD);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [showLoadingDesc, setShowLoadingDesc] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [delCard, setDelCard] = useState({});

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(cardsArray =>
          cardsArray.map(c => (c._id === card._id ? newCard : c))
        );
      })
      .catch(err => {
        alert(err);
      });
  }

  const validateValue = target => {
    if (target === "" || target === null || target.length === 0) {
      return false;
    }

    if (target.type === "url") {
      try {
        new URL(target.value);
        return true;
      } catch (_) {
        return false;
      }
    }

    let minFlag = true,
      maxFlag = true;

    if (target.minLength > 0) {
      minFlag = target.value.length >= Number(target.minLength) ? true : false;
    }

    if (target.maxLength > 0) {
      maxFlag = target.value.length <= Number(target.maxLength) ? true : false;
    }

    return minFlag && maxFlag;
  };

  const handleEditProfileClick = () => {
    setProfileIsVisible(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceIsVisible(true);
  };

  const handleEditAvatarClick = () => {
    setAvatarIsVisible(true);
  };

  const handleCardClick = value => {
    setSelectedCard(value);
  };

  const closeAllPopups = () => {
    setProfileIsVisible(false);
    setAddPlaceIsVisible(false);
    setAvatarIsVisible(false);
    setConfirmationVisible(false);
    setSelectedCard(EMTY_CARD);
  };

  const handleUpdateUser = ({ name, about }) => {
    setShowLoadingDesc(true);
    api
      .patchProfile({ name, about })
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setShowLoadingDesc(false);
      });
  };

  const handleUpdateAvatar = link => {
    setShowLoadingDesc(true);
    api
      .patchAvatar({
        avatar: link
      })
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setShowLoadingDesc(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setShowLoadingDesc(true);
    api
      .postCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setShowLoadingDesc(false);
      });
  };

  function handleCardDelete(card) {
    setConfirmationVisible(true);
    setDelCard(card);
  }

  function handleConfirmationSubmit(e) {
    e.preventDefault();
    setShowLoadingDesc(true);
    api
      .deleteCard(delCard._id)
      .then(() => {
        setCards(cardsArray => {
          return cardsArray.filter(item => {
            return item !== delCard;
          });
        });
      })
      .catch(err => {
        alert(err);
      });
    setShowLoadingDesc(false);
    setConfirmationVisible(false);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={ProfileIsVisible}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            validateValue={validateValue}
            isShowLoadingDesc={showLoadingDesc}
          />
          <EditAvatarPopup
            isOpen={AvatarIsVisible}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            validateValue={validateValue}
            isShowLoadingDesc={showLoadingDesc}
          />
          <AddPlacePopup
            isOpen={AddPlaceIsVisible}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            validateValue={validateValue}
            isShowLoadingDesc={showLoadingDesc}
          />
          <PopupWithForm
            onSubmit={handleConfirmationSubmit}
            isOpen={isConfirmationVisible}
            onClose={closeAllPopups}
            isBtnDisabled={true}
            isShowLoadingDesc={showLoadingDesc}
            name="alert"
            title="Вы уверены?"
            btnText="Удалить"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
