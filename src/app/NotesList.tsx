'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesList(props) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    interface parsedDate {
        time: string | number;
        dayString: string;
        dayNumber: number;
        month: string;
        year: string | number;
    }

    function parseDate<Date>(noteDate): parsedDate {
        let parsingDate = new Date(noteDate);
        let day = days[parsingDate.getDay()];
        let month = months[parsingDate.getMonth()];
        let year = parsingDate.getFullYear();

        let min = parsingDate.getMinutes() < 10 ? "0" + parsingDate.getMinutes() : parsingDate.getMinutes();
        let time = `${parsingDate.getHours()}:${min}`

        let parsedDate = {
            time: time,
            dayString: day,
            dayNumber: parsingDate.getUTCDate(),
            month: month,
            year: year,
        };

        return parsedDate as parsedDate;
    }

    //const [localNotes, setlocalNotes] = useState(props.notes)
    const localNotes = props.notes
    const router = useRouter()

    const defineClass = (id = "new") => {
        let activeId = props.activeId;
        let itemClass = "flex flex-col my-2 mx-2 group rounded-lg border border-gray-400  transition-colors hover:bg-neutral-800/30 px-4 py-3 "
        let bgColor = (activeId === id) ? "bg-zinc-700" : "bg-neutral-900";
        return itemClass + bgColor;
    }

    const newNoteSticky = <li
        className={defineClass()}
        onClick={() => { props.handleNoteClick({ "id": "new", "note_title": "New Note!", "note_text": "" }) }}
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
                    let itemParsedDate: parsedDate = parseDate(item.note_date);

                    return (
                        <li
                            className={defineClass(item.id)}
                            key={item.id}
                            onClick={() => { props.handleNoteClick(item) }}
                        >
                            <div className="flex-grow mb-2">
                                <h1 className={`mb-1 break-words text-2xl font-semibold`} >{item.note_title}</h1>
                                <p className={`mb-1 w-m-[25ch] text-sm opacity-80`}>
                                    {`${itemParsedDate.time} ${itemParsedDate.dayString} - ${itemParsedDate.dayNumber} ${itemParsedDate.month} ${itemParsedDate.year}`}
                                </p>
                                <p className={`w-m-[25ch] text-sm opacity-50`}>
                                    {item.note_text} {'\u00A0'}
                                </p>
                            </div>
                            <div className="flex-none">
                                <button onClick={e => { e.stopPropagation(); if (confirm('Delete this note?')) props.removeNote(e, item.id); }} className="w-1/3 my-1 mt-2 bg-red-800 border rounded-md px-2 duration-300 hover:bg-red-500">Delete </button>
                            </div>
                        </li>
                    )
                })
                }

                {newNoteSticky}
            </>
        )
    }

}