import "../index.css";
import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ERR_ACTIVE } from "../utils/constants";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  validateValue,
  isShowLoadingDesc,
}) => {
  const currentContextData = useContext(CurrentUserContext);
  const currentUser = currentContextData.currentUser;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validate, setValidate] = useState({ name: false, description: false });
  const [isItRedacting, setIsItRedacting] = useState(false);

  useEffect(() => {
    if (isOpen && !isItRedacting) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setValidate({
        name: true,
        description: true,
      });
    } else if (!isOpen) {
      setName("");
      setDescription("");
      setValidate({
        name: false,
        description: false,
      });
      setIsItRedacting(false);
    }
  }, [isOpen, isItRedacting, currentUser, validateValue]);

  const handleNameChange = (e) => {
    setIsItRedacting(true);
    setValidate({
      name: validateValue(e.target),
      description: validate.description,
    });
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setIsItRedacting(true);
    setValidate({
      name: validate.name,
      description: validateValue(e.target),
    });
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
      isBtnDisabled={validate.name && validate.description}
      isShowLoadingDesc={isShowLoadingDesc}
    >
      <input
        id="name-input"
        type="text"
        className="form__field form__field_text_name"
        name="strName"
        placeholder="имя"
        value={name || ""}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span
        className={`name-input-error form__input-error ${
          !validate.name && ERR_ACTIVE
        }`}
      >
        Необходимо заполнить данное поле
      </span>
      <input
        id="description-input"
        type="text"
        className="form__field form__field_text_description"
        name="strDescription"
        placeholder="описание"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span
        className={`description-input-error form__input-error ${
          !validate.description && ERR_ACTIVE
        }`}
      >
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
