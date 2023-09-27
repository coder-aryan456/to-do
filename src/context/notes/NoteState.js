import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:3000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [loggedinStatus, setLoggedinStatus] = useState(false);
    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODU4ZDZmZmM2OWU3MzZjMWI0OWVjIn0sImlhdCI6MTY4Njg0OTY3N30.pllu3B7MR6x0Ma0bzFfe7sZ217aF66-ixw6usUSvPas"
            }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json);
    }
    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODU4ZDZmZmM2OWU3MzZjMWI0OWVjIn0sImlhdCI6MTY4Njg0OTY3N30.pllu3B7MR6x0Ma0bzFfe7sZ217aF66-ixw6usUSvPas"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes((prev)=>{
            // console.log([...prev,note]);
            return [...prev,note];
        })
    }
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODU4ZDZmZmM2OWU3MzZjMWI0OWVjIn0sImlhdCI6MTY4NzIwMjk0MH0.vCmV4amjZGBv9ggsvh7ow7YoofrCQ69sKczI-njlJ7Q"
            }
        });
        const json = response.json(); 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        console.log("hm hai nawab")
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODU4ZDZmZmM2OWU3MzZjMWI0OWVjIn0sImlhdCI6MTY4NzIwMjk0MH0.vCmV4amjZGBv9ggsvh7ow7YoofrCQ69sKczI-njlJ7Q"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log("hm hai nawab")
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag; 
                break; 
            }
        }
        console.log("hot gya update")
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, loggedinStatus, addNote, deleteNote, editNote, getNotes, setLoggedinStatus }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;