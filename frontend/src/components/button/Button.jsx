import "../button/Button.css";

const Button = ({ onClick, label, className }) => {
  return (
    <div className="btn-container">
      <button type="submit" onClick={onClick} className={className}>
        {label}
      </button>
    </div>
  );
};

export default Button;
