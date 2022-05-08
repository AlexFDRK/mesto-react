import "../index.css";
import { POPUP_OPENED, BTTN_INACTIVE } from "../utils/constants";

const PopupWithForm = ({
  name,
  isOpen,
  onClose,
  title,
  children,
  btnText,
  onSubmit,
  isBtnDisabled,
  isShowLoadingDesc,
}) => {
  return (
    <section className={`popup popup_type_${name} ${isOpen && POPUP_OPENED}`}>
      <div className="popup__overlay">
        <button
          type="button"
          className="popup__close"
          aria-label="Выход"
          onClick={onClose}
        ></button>
        <form className="form" name={name} noValidate onSubmit={onSubmit}>
          <h3 className="form__title">{title}</h3>
          <div className="form__fields">{children}</div>
          <button
            type="submit"
            className={`form__button ${!isBtnDisabled && BTTN_INACTIVE}`}
          >
            {isShowLoadingDesc ? 'Сохранение...' : btnText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
