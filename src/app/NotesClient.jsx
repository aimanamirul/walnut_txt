'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import NotesList from "./NotesList";

export default function NotesClient(props) {
    const router = useRouter()
    const notes = props.notes;
    const newNote = { "id": "new", "note_title": "New Note!", "note_text": "Here is a new note." }

    // let noteBoxInit = notes ? <NoteBox note={notes[0]} saveNote={saveNote} /> : <NoteBox note={newNote} saveNote={saveNote} />
    // const [noteBoxContent, setNoteBoxContent] = useState(noteBoxInit)

    // let activeNoteInit = notes ? notes[0] : newNote;
    
    let initNote = notes ? notes[0] : newNote;
    const [activeNoteId, setActiveNoteId] = useState(initNote.id);
    const [title, setTitle] = useState(initNote.note_title);
    const [text, setText] = useState(initNote.note_text)

    const handleNoteClick = (item) => {
        setTitle(item.note_title);
        setText(item.note_text);
        setActiveNoteId(item.id);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-12">
            <div>
                <form className="flex justify-between flex-col items-center w-[85vw]">
                    <div className="bg-slate-900 w-full h-[70vh] m-5 p-5 rounded-lg border border-gray-400">
                        <div className="flex flex-row">
                            <input
                                id="note_title"
                                name="note_title"
                                className="flex-1 py-1 text-xl font-extrabold bg-slate-900 outline-none resize-none" type="text" value={title} />
                            <button className="flex-3 min-w-[10%] mx-1 text-white font-extrabold outline-none border-none rounded-2xl bg-cyan-500" type="submit">Save</button>
                            <button className="flex-3 min-w-[10%] mx-1 text-black font-extrabold outline-none border-none rounded-2xl bg-white" onClick={(e) => {
                                e.preventDefault();
                            }}>Clear Note</button>
                        </div>
                        <hr className="my-3" />
                        <textarea
                            className="w-full font-['Consolas'] min-h-[87%] bg-slate-900 outline-none resize-none"
                            value={text}
                            placeholder="Write your note here!"
                            id="note_text"
                            name="note_text"
                            key={text} autoFocus
                        />
                    </div>
                </form>
            </div>
            <div>
                <ul className="mb-16 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
                    <NotesList notes={notes} handleNoteClick={handleNoteClick} activeId={activeNoteId} />
                </ul>
            </div>
        </main>

    )
}