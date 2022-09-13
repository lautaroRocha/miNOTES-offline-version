import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Note(props){
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [savedNotes, setSavedNotes] = useState(props.notes);

    useEffect(() => {
        let savedArr = props.notes;
        setSavedNotes(savedArr);
    }, [savedNotes])

    
    let params = new URLSearchParams(document.location.search)
    let title = params.get('title')
    let origin = params.get('from')
    
    let notesArray = props.notes;

    let note = props.notes.find(note => note.title === title);
    let noteIdx = props.notes.indexOf(note);

    if(origin === "/fav"){
        note = props.favs.find(note => note.title === title)
        noteIdx = props.favs.indexOf(note);
    }  
    
    const edit = () =>{
        const titleToEdit = document.querySelector('.new-note-title')
        const editableTitle = document.createElement("textarea");
        editableTitle.className = "new-note-title"
        editableTitle.textContent= note.title;

        const bodyToEdit = document.querySelector('.new-note-body')
        const editableBody = document.createElement("textarea");
        editableBody.setAttribute('form', "usrform")
        editableBody.className = "new-note-body"
        editableBody.textContent= note.body;

        titleToEdit.replaceWith(editableTitle)
        bodyToEdit.replaceWith(editableBody)        
    }
    const save = () => {
        let title = document.querySelector('.new-note-title').value;
        let body = document.querySelector('.new-note-body').value;
        let col = note.col;
        let editedNote = {
            title, body,col
        };
        if(!title || !body){
            origin !== '/fav' && navigate('/', {replace:true});
            origin === '/fav' && navigate('/fav', {replace:true})

        }else{
        notesArray.splice(noteIdx, 1, editedNote);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        navigate('/', {replace:true})}
    }
    const dispose = () => {
        MySwal.fire({
            customClass: {
                confirmButton: "confirm-btn",
                popup : "swal-cont"
            },
            title : '¿🗑️?',
            showCancelButton: true,
            confirmButtonText : <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg> ,
            cancelButtonText :<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg> ,
            denyButtonText: `Don't save`
        })
            .then( (result) =>{
                if(result.isConfirmed){
                    notesArray.splice(noteIdx, 1);
                    localStorage.setItem('notes', JSON.stringify(notesArray));
                    navigate('/', {replace:true})
                } 
            })
        
    }

    const handleKeyPress = useCallback((event) => {
        if (event.shiftKey === true) {
          event.key === 's' || event.key === 'S' && save();
          event.key === 'e' || event.key === 'E' && edit();
          event.key === 'd' || event.key === 'D' && dispose();
          event.key === 'Backspace' && navigate('/', {replace:true});
        }

      }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);

    while(note !== null & note !== undefined){
        return(
            <>
      
             <div  className="new-note" style={{backgroundColor:`${note.col}`}}  > 
               <textarea disabled value={note.title} className="new-note-title">
               </textarea>
               <textarea disabled value={note.body} form="usrform" className="new-note-body">
               </textarea>
               <div className="new-note-btns">
               {origin !== "/fav" &&
                <button className="cancel" onClick={dispose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                </button>}
                {origin !== "/fav" &&
                <button className="cancel" onClick={edit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                </button>}
                <button className="add" onClick={save}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg>
                </button>
               </div>
            </div>
            </>
        )
    }

}

export default Note;