import React from "react"
import { Link } from "react-router-dom"
import '../styles/notes_grid.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/swal.css'

function MinNote(props){

    const MySwal = withReactContent(Swal)

    let notesArray = props.notes;
    let noteIdx = props.notes.indexOf(props.note);

    let current = window.location.pathname;
    let heart
    let noteIsFav;
    if(window.location.pathname !== '/fav'){
        noteIsFav = props.favs.some( oneNote =>oneNote.title === props.note.title)
        if(noteIsFav){
            heart = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>
        }else{
            heart = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>;
        }
    }


    const dispose = (e) => {
        let setErasedNotes = props.set;

        if(current !== "/fav"){
        e.preventDefault();
        MySwal.fire({
            customClass: {
                confirmButton: "confirm-btn",
                popup : "swal-cont",
                
            },
            confirmButtonText : <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg> ,
                cancelButtonText :<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg> ,
            title : '¿🗑️?',
            showCancelButton: true })
            .then( (result) =>{
                if(result.isConfirmed){
                    notesArray.splice(noteIdx, 1);
                    localStorage.setItem('notes', JSON.stringify(notesArray));
                    setErasedNotes(true)
                } 
            });

               }else{
            props.addOrRemoveFav();
        }
    }

   

    return(
      
        <Link  to={`/notes?title=${props.note.title}&&from=${current}`} style={{textDecoration: "none"}} >
                    <div className="note"  style={{backgroundColor:`${props.note.col}`}}>
                    <div className="note-actions">
                       { window.location.pathname !== '/fav' &&
                       <button onClick={dispose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                        </button>}
                        <button onClick={props.addOrRemoveFav}>
                            {window.location.pathname !== '/fav' ?
                            heart
                             :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z"/></svg>}
                        </button>
                    </div>
                        <span className="new-note-title">{props.note.title}</span>
                        <textarea value={
                        props.note.body.length < 100 ? 
                        props.note.body:
                        props.note.body.substring(0, 100)+"... "} disabled form="usrform"  className="new-note-body" ></textarea>
                    </div>
                    </Link>
    )
}

export default MinNote; 

