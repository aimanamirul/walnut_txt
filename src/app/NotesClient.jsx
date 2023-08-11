'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import NotesList from "./NotesList";
import NoteBox from "./NoteBox";

export default function NotesClient(props) {
    const router = useRouter()
    const notes = props.notes;
    const newNote = {"id" : "new", "note_title" : "New Note!", "note_text": "Here is a new note."}
    
    let noteBoxInit = notes ? <NoteBox note={notes[0]} saveNote={saveNote} /> : <NoteBox note={newNote} saveNote={saveNote} />
    const [noteBoxContent, setNoteBoxContent] = useState(noteBoxInit)

    let activeNoteInit = notes ? notes[0] : newNote;
    const [activeNoteId, setActiveNoteId] = useState(activeNoteInit.id);
    
    function handleNoteClick(item) {
        setNoteBoxContent(<NoteBox note={item} saveNote={saveNote} />)
        setActiveNoteId(item.id)
    }

    function saveNote(e) {
        e.preventDefault()
        router.refresh()
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-12">
            <div>
                {noteBoxContent}
            </div>
            <div>
                <ul className="mb-16 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
                    <NotesList notes={notes} handleNoteClick={handleNoteClick} activeId={activeNoteId} />
                </ul>
            </div>
        </main>

    )
}