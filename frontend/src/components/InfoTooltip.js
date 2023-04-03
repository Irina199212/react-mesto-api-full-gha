import error from "../images/error.svg";
import success from "../images/success.svg";

export default function InfoTooltip(props) {
  const classes = props.isOpen ? `popup popup_opened` : `popup`;
  const icon = props.isError ? error : success;
  return (
    <div className={classes}>
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия"
          onClick={props.onClose}
        ></button>
        <div className="info">
          <img src={icon} className="info__img" alt="Иконка тултипа"/>
          <div>{props.message}</div>
        </div>
      </div>
    </div>
  );
}
