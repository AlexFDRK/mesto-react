import "../index.css";
import { POPUP_OPENED } from "../utils/constants";

const ImagePopup = (props) => {
  return (
    <section
      className={`popup popup_type_picture ${
        props.card.link === "" ? "" : POPUP_OPENED
      }`}
    >
      <div className="popup__overlay">
        <button
          type="button"
          className="popup__close"
          aria-label="Выход"
          onClick={props.onClose}
        ></button>
        <div className="view" name="viewForm" noValidate>
          <img
            className="view__picture"
            src={props.card.link}
            alt={props.card.name}
          />
          <p className="view__description">{props.card.name}</p>
        </div>
      </div>
    </section>
  );
};

export default ImagePopup;
