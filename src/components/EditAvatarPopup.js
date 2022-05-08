import "../index.css";
import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect, useState } from "react";
import { ERR_ACTIVE } from "../utils/constants";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  validateValue,
  isShowLoadingDesc,
}) => {
  const avatarRef = useRef("");
  const [link, setLink] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    setLink("");
    setValidate(false);
  }, [isOpen]);

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setValidate(validateValue(e.target));
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар?"
      isOpen={isOpen}
      onClose={onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
      isBtnDisabled={validate}
      isShowLoadingDesc={isShowLoadingDesc}
    >
      <input
        id="link-avatar"
        type="url"
        className="form__field form__field_text_avatar"
        name="strAvatar"
        placeholder="Ссылка на аватар"
        value={link || ""}
        required
        ref={avatarRef}
        onChange={handleLinkChange}
      />
      <span
        className={`link-avatar-error form__input-error ${
          !validate && ERR_ACTIVE
        }`}
      >
        Необходимо заполнить URL
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
