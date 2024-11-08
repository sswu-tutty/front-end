import NoteItem from "./NoteItem";

const Summary = ({ mockData }) => {
    return (
        <div>
            {mockData.map((it) => (
                <NoteItem key={it.id} {...it} />
            ))}
        </div>
    );
}

export default Summary;
