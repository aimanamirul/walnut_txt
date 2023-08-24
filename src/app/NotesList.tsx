'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesList(props) {

    //const [localNotes, setlocalNotes] = useState(props.notes)
    const localNotes = props.notes
    const router = useRouter()

    const defineClass = (id = "new") => {
        let activeId = props.activeId;
        let itemClass = "my-2 mx-2 group rounded-lg border border-gray-400  transition-colors hover:bg-neutral-800/30 px-4 py-3 "
        let bgColor = (activeId === id) ? "bg-gray-400" : "bg-neutral-800" ;
        return itemClass + bgColor;
    }

    const newNoteSticky = <li
        className={defineClass()}
        onClick={() => { props.handleNoteClick({"id" : "new" ,"note_title": "New Note!", "note_text": ""}) }}
    >
        <h1 className={`mb-3 text-2xl font-semibold`} >Create A New Note +</h1>
        <p className={`m-0 w-m-[30ch] text-sm opacity-50`}>
            Click here to add a new note!
        </p>
    </li>


    if (!props.notes) {
        return (<>
            {newNoteSticky}
        </>)
    } else {
        return (
            <>
                {localNotes.map((item, i) => {
                    return (
                        <li
                            className={defineClass(item.id)}
                            key={item.id}
                            onClick={() => { props.handleNoteClick(item) }}
                        >
                            <h1 className={`mb-3 text-2xl font-semibold`} >{item.note_title}</h1>
                            <p className={`m-0 w-m-[30ch] text-sm opacity-50`}>
                                {item.note_text}
                            </p>
                        </li>
                    )
                })
                }

                {newNoteSticky}
            </>
        )
    }

}