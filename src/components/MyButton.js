import "./styles/MyButton.css";

const MyButton = ({ type, text, onClick }) => {
    return (
        <div className="ButtonContainer">
            <div onClick={onClick} className={`Button Button_${type}`}>
                {text}
            </div>
        </div>
    );
}




export default MyButton;
