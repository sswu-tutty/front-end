import "./styles/Button.css";

const Button = ({ type, text }) => {
    return (
        <div className="ButtonContainer">
            <div className={`Button Button_${type}`}>
                {text}
            </div>
        </div>
    );
}




export default Button;
