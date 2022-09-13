import React from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/notes_grid.css'

import MinNote from "./MinNote";

function Favs(props){
    const navigate = useNavigate();

    const handleKeyPress = useCallback((event) => {
        if (event.shiftKey === true) {
          event.key === 'n' || event.key === 'N' && navigate('/new', {replace:true});
          event.key === 'f' || event.key === 'F' && navigate('/', {replace:true})
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
                {props.favs.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={props.setErasedNote} addOrRemoveFav={props.addOrRemoveFav}/>
                    )
                })}
            </div>
            )
}

export default Favs;