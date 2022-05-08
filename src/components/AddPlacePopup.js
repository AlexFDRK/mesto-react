import "../index.css";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { ERR_ACTIVE } from "../utils/constants";

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlace,
  validateValue,
  isShowLoadingDesc,
}) => {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [validate, setValidate] = useState({ name: false, link: false });

  useEffect(() => {
    if (!isOpen) {
      setLink("");
      setName("");
      setValidate({ name: false, link: false });
    } 
  }, [isOpen]);

  const handleLinkChange = (e) => {
    setValidate({ name: validate.name, link: validateValue(e.target) });
    setLink(e.target.value);
  };

  const handleNameChange = (e) => {
    setValidate({ name: validateValue(e.target), link: validate.link });
    setName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
      isBtnDisabled={validate.name && validate.link}
      isShowLoadingDesc={isShowLoadingDesc}
    >
      <input
        id="place-input"
        type="text"
        className="form__field form__field_text_name"
        name="strName"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span
        className={`place-input-error form__input-error ${
          !validate.name && ERR_ACTIVE
        }`}
      >
        Необходимо заполнить данное поле
      </span>
      <input
        id="link-input"
        type="url"
        className="form__field form__field_text_description"
        name="strDescription"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link || ""}
      />
      <span
        className={`link-input-error form__input-error ${
          !validate.link && ERR_ACTIVE
        }`}
      >
        Необходимо заполнить URL
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;