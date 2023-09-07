'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from 'pocketbase'
import Loading from "./loading";

import NotesList from "./NotesList";

export default function NotesClient(props) {
    interface Note {
        id: string;
        note_title: string;
        note_text: string;
        note_date?: string | Date;
    }

    const pb = new PocketBase('http://127.0.0.1:8090');
    const router = useRouter()
    const notes = props.notes;
    const newNote = { "id": "new", "note_title": "", "note_text": "" } as Note;
    let initNote = newNote;

    const [activeNoteId, setActiveNoteId] = useState(initNote.id);
    const [title, setTitle] = useState(initNote.note_title);
    const [text, setText] = useState(initNote.note_text)
    const [loading, setLoading] = useState(false);

    const handleNoteClick = (item) => {
        setTitle(item.note_title);
        setText(item.note_text);
        setActiveNoteId(item.id);
    }

    const createNote = async (e) => {
        e.preventDefault()

        let data = {
            "note_title": title,
            "note_text": text,
            "note_date": new Date(),
        }

        try {
            if (activeNoteId === "new") {
                setLoading(true);
                await pb.collection('Notes').create(data);
            } else {
                setLoading(true);
                await pb.collection('Notes').update(activeNoteId, data)
            }
        } catch (error) {
            alert(error);
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 750)
        }

        setText(' ');
        setTitle('');
        setActiveNoteId('new');
        router.refresh();
    }

    const removeNote = async (e, noteId) => {
        try {
            setLoading(true);
            await pb.collection('Notes').delete(noteId);
        } catch (error) {
            alert(error);
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 750)
        }

        setText(' ');
        setTitle('');
        setActiveNoteId('new');
        router.refresh();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-12">
            <div>
                <form className="flex justify-between flex-col items-center w-[85vw]" onSubmit={createNote}>
                    <div className="bg-slate-900 w-full h-[70vh] m-5 p-4 rounded-lg border border-gray-400">
                        {loading ? <Loading /> : <></>}
                        <div className="w-full flex flex-col lg:flex-row">
                            <div className="lg:flex-1">
                                <input
                                    id="note_title"
                                    name="note_title"
                                    placeholder="Write your Title here!"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    required={true}
                                    className="w-full py-1 text-xl font-extrabold bg-slate-900 outline-none resize-none border-transparent focus:border-transparent focus:ring-0" type="text" value={title} />
                            </div>
                            <div className="flex flex-row">
                                <button className="min-w-[10%] mx-1 px-3 py-2 text-white font-extrabold outline-none border-none rounded-2xl duration-300 hover:bg-cyan-700 bg-cyan-500" type="submit">Save</button>
                                <button className="min-w-[10%] mx-1 px-3 py-2 text-black font-extrabold outline-none border-none rounded-2xl duration-300 bg-yellow-50 hover:bg-yellow-500" onClick={(e) => {
                                    e.preventDefault();
                                }}>Clear Note</button>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <textarea
                            className="w-full font-['Consolas'] min-h-[80%] lg:min-h-[87%] bg-slate-900 outline-none border-transparent focus:border-transparent focus:ring-0 resize-none"
                            value={text}
                            placeholder="Write your note here!"
                            id="note_text"
                            name="note_text"
                            onChange={(e) => { setText(e.target.value) }}
                            autoFocus
                        />
                    </div>
                </form>
            </div>
            <div>
                <ul className="mb-16 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
                    <NotesList notes={notes} handleNoteClick={handleNoteClick} removeNote={removeNote} activeId={activeNoteId} />
                </ul>
            </div>
        </main>

    )
}