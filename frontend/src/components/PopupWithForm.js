export default function PopupWithForm(props) {
  const classes = props.isOpen
    ? `popup popup_${props.name} popup_opened`
    : `popup popup_${props.name}`;

  return (
    <div className={classes}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></button>
        <form className="form" action="./" method="post" name={props.name}>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <input
            type="submit"
            className="form__button"
            onClick={props.onSubmit}
            value={props.buttonText}
          />
        </form>
      </div>
    </div>
  );
}
