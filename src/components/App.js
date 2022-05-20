import "../index.css";
import { EMTY_CARD } from "../utils/constants";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";
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
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import { TOKEN_KEY, getToken } from "../utils/token";
import PopupWithInfo from "../components/PopupWithInfo";

function App() {
  const [ProfileIsVisible, setProfileIsVisible] = useState(false);
  const [AddPlaceIsVisible, setAddPlaceIsVisible] = useState(false);
  const [AvatarIsVisible, setAvatarIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(EMTY_CARD);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [showLoadingDesc, setShowLoadingDesc] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isMisfortuneVisible, setMisfortuneVisible] = useState(false);
  const [delCard, setDelCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [linkTo, setLinkTo] = useState("");
  const [linkText, setLinkText] = useState("");
  let location = useLocation();
  const history = useHistory();
  const [loggedEmail, setLoggedEmail] = useState("");
  const [error, setError] = useState("");

  const tokenCheck = () => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    Auth.getContent(jwt).then(res => {
      if (res) {
        setLoggedIn(true);
        setLoggedEmail(res.data.email);
        history.push("/ducks");
      }
    });
  };

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  useEffect(
    () => {
      switch (location.pathname) {
        case "/sign-in":
          setLinkText("Регистрация");
          setLinkTo("/sign-up");
          break;
        case "/sign-up":
          setLinkText("Войти");
          setLinkTo("/sign-in");
          break;
        default:
          setLinkText("Выйти");
          setLinkTo("/sign-up");
      }
    },
    [location]
  );

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
    setSuccessVisible(false);
    setMisfortuneVisible(false);
    setError("");
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

  const WrappedMain = function(props) {
    return (
      <Main
        {...props}
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    );
  };

  const handleRegisterSubmit = (email, password) => {
    setLoggedIn(false);
    Auth.register(email, password).then(res => {
      if (!res.error && res.statusCode !== 400) {
        setSuccessVisible(true);
        history.push("/sign-in");
      } else {
        setError(res.error);
        setMisfortuneVisible(true);
      }
    });
  };

  const handleLoginSubmit = (email, password) => {
    Auth.authorize(email, password).then(data => {
      if (!data) {
        setMisfortuneVisible(true);
        setLoggedIn(false);
        setError("Что-то пошло не так! Попробуйте ещё раз.");
      } else if (data.token) {
        setLoggedEmail(email);
        setLoggedIn(true);
        history.push("/cards");
      }
    });
  };

  function signOut() {
    setLoggedIn(false);
    setLoggedEmail("");
    localStorage.removeItem(TOKEN_KEY);
    history.push("/sign-up");
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
      <div className="App">
        <div className="page">
          <Header
            linkTo={linkTo}
            signOut={signOut}
            linkText={linkText}
            loggedEmail={loggedEmail}
          />
          <Switch>
            <ProtectedRoute
              path="/cards"
              loggedIn={loggedIn}
              component={WrappedMain}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit} error={error} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit} error={error} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>
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
          <PopupWithInfo
            name="info"
            isOpen={isSuccessVisible}
            onClose={closeAllPopups}
            isItPositive={true}
          />
          <PopupWithInfo
            name="info"
            isOpen={isMisfortuneVisible}
            onClose={closeAllPopups}
            isItPositive={false}
            errorDescription = {error}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
