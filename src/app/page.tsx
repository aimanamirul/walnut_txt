
import NotesClient from "./NotesClient";

import './background.css'

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/Notes/records', { cache: 'no-store'})
    const data = await res.json()
    const items = data.items ? data.items : "";
    return items;
}

export default async function NotesWall() {
    const notes = await getNotes();

    return (
        <div className="background">
            <NotesClient notes={notes} />
        </div>
    )
}