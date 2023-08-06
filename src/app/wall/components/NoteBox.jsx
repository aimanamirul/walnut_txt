'use client'

import { useState } from "react" 

function NoteBox(props) {
    return(
        <form className="flex justify-between flex-col items-center w-[85vw]"> 
            
            <div className="bg-slate-900 w-full h-[60vh] m-5 p-5 rounded-lg border border-gray-400">
                <h1>{props.note.note_title}</h1>
                <textarea 
                className="w-full min-h-[95%] bg-slate-900 outline-none resize-none"
                defaultValue={props.note.note_text}
                key={props.note.note_text}
                />
            </div>


            
        </form>
    )  
}

export default NoteBox