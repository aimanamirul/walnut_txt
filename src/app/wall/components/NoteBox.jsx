'use client'

import { useState } from "react" 

function NoteBox(props) {
    return(
        <form className="flex justify-between flex-col items-center w-[85vw]"> 
            
            <div className="bg-slate-900 w-full h-[65vh] m-5 p-5 rounded-lg border border-gray-400">
                <input className="w-[70%] py-1 text-xl font-extrabold bg-slate-900 outline-none resize-none" type="text" defaultValue={props.note.note_title} />
                <hr className="my-3" />
                <textarea 
                className="w-full font-['Consolas'] min-h-[90%] bg-slate-900 outline-none resize-none"
                defaultValue={props.note.note_text}
                placeholder="Write your note here!"
                key={props.note.note_text} autoFocus
                />
            </div>
        </form>
    )  
}

export default NoteBox