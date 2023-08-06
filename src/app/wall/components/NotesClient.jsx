'use client'

import { useState } from "react";

import NotesList from "./NotesList";
import NoteBox from "./NoteBox";

export default function NotesClient(props) {
    const notes = props.notes;
    
    let noteBoxInit = <NoteBox note={notes[0]} />

    const [noteBoxContent, setNoteBoxContent] = useState(noteBoxInit)

    function handleNoteClick(item) {
        setNoteBoxContent(<NoteBox note={item} />)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-12">
            <div>
                {noteBoxContent}
            </div>
            <div>
                <ul className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                    <NotesList notes={notes} handleNoteClick={handleNoteClick} />
                </ul>
            </div>
        </main>

    )
}