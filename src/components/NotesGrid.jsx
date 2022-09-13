import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    const navigate = useNavigate();
    
    const [savedNotes, setSavedNotes] = useState([]);

    const [erasedNote, setErasedNote] = useState(false);

    useEffect(() => {
        setErasedNote(false)
        let savedArr = props.notes;
        setSavedNotes(savedArr);
    }, [erasedNote, savedNotes])

    const handleKeyPress = useCallback((event) => {
        if (event.shiftKey === true) {
          event.key === 'n' || event.key === 'N' && navigate('/new', {replace:true});
          event.key === 'f' || event.key === 'F' && navigate('/fav', {replace:true})
        }
      }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);
    
        return(  
            <div className="notes-grid">
                {savedNotes.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} favs={props.favs}/>
                        )
                })}
            </div>
            )
    }
  

export default NotesGrid;