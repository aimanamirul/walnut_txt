'use client'

import { useState } from "react"

function NoteBox(props) {
    return (
        <form className="flex justify-between flex-col items-center w-[85vw]">

            <div className="bg-slate-900 w-full h-[70vh] m-5 p-5 rounded-lg border border-gray-400">
                <div className="flex flex-row">
                    <input
                        id="note_title"
                        name="note_title"
                        className="flex-1 py-1 text-xl font-extrabold bg-slate-900 outline-none resize-none" type="text" defaultValue={props.note.note_title} />
                    <button className="flex-3 min-w-[10%] mx-1 text-white font-extrabold outline-none border-none rounded-2xl bg-cyan-500" type="submit">Save</button>
                    <button className="flex-3 min-w-[10%] mx-1 text-black font-extrabold outline-none border-none rounded-2xl bg-white" onClick={(e) => {
                        e.preventDefault();
                    }}>Cancel</button>
                </div>
                <hr className="my-3" />
                <textarea
                    className="w-full font-['Consolas'] min-h-[87%] bg-slate-900 outline-none resize-none"
                    defaultValue={props.note.note_text}
                    placeholder="Write your note here!"
                    id="note_text"
                    name="note_text"
                    key={props.note.note_text} autoFocus
                />
            </div>
        </form>
    )
}

export default NoteBox