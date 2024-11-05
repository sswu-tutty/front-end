import NoteItem from "./NoteItem";

const Summary = ({ mockData }) => {
    return (
        <div>
            {mockData.map((it) => ( // 중괄호로 감싸기
                <NoteItem key={it.id} {...it} />
            ))}
        </div>
    );
}

export default Summary;
