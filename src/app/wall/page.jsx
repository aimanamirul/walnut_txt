
import NotesClient from "./components/NotesClient";

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/Notes/records', { cache: 'no-store' })
    const data = await res.json()

    console.log(data.items)

    const items = data.items ? data.items : "";
    
    return items;
}

export default async function NotesWall() {
    const notes = await getNotes();
    
    return (
        <>
            <NotesClient notes={notes} />
        </>
    )
}