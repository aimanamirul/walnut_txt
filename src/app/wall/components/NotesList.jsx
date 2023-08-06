'use client'

export default function NotesList(props) {
    return props.notes.map((item, i) => {
        return (
            <li  
            className="mx-2 group rounded-lg border border-gray-400 bg-neutral-800 transition-colors hover:bg-neutral-800/30 px-5 py-4 "
            key={item.id}
            onClick={() => {props.handleNoteClick(item)}}
            >
                <h1 className={`mb-3 text-2xl font-semibold`} >{item.note_title}</h1>
                <p className={`m-0 w-m-[30ch] text-sm opacity-50`}>
                    {item.note_text}
                </p>
            </li>
        )
    })
}