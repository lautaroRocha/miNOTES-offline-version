import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/new_note.css'
import { useEffect, useCallback } from "react";

function NewNote(props){
    const navigate = useNavigate();

    const cancel = () =>{
        navigate('/', {replace:true})
    }
    const add = () =>{
        let notes = props.notes;
        let title = document.querySelector('.new-note-title').value;
        let body = document.querySelector('.new-note-body').value;
        let col = document.querySelector('#colorPicker').value
        let note = {
            title, body, col
        };
        if(!title || !body){
            alert('vacío')
        }else{
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes));
        navigate('/', {replace:true})
        }
    }
    function colourCard(e){
        let card = document.querySelector(".new-note")
        card.style.backgroundColor = e.target.value;
    }

    const handleKeyPress = useCallback((event) => {
        if (event.shiftKey === true) {
          event.key === 's' || event.key === 'S' && add();
          event.key === 'Backspace' && cancel();
        }
      }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);



    return(
    <>
        <div className="new-note">
           <textarea form="usrform" className="new-note-title">
           </textarea>
           <textarea  form="usrform" className="new-note-body">
           </textarea>
           <div className="new-note-btns">
            <button className="cancel" onClick={cancel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </button>
            <input type="color" id="colorPicker" onChange={colourCard} list="presetColors" defaultValue='#455a64'/>
                <datalist id="presetColors">
                    <option>#455a64</option>
                    <option>#C8566B</option>
                    <option>#E78963</option>
                    <option>#F2D48F</option>
                    <option>#9D75BF</option>
                    <option>#9EC299</option>
                    <option>#6661AB</option>
                </datalist>
            <button className="add" onClick={add}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg>
                


            </button>
           </div>
        </div>
    </>
    )
}


export default NewNote;