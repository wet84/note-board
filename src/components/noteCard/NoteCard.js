
import React from 'react'
import './noteCard.scss'

const CARD = "card ID";

function NoteCard({deleteCard, item, onChange}) {
    
    function onTextAreaChange(e) {
        const { name, value } = e.target;
        onChange(item.id, { [name]: value });
    }

    return (
        // <div className="card" style={getCardStyle()}>
        <div className="card">
            <div className="card_header">
                <span className="card_title">{CARD} : {item.id}</span>
                <span className="card_close-button" onClick={deleteCard.bind(null, item.id)}>x</span>
            </div>
            {/* <span className="card_dragging-area" onMouseDown={handleMouseDown}></span> */}
            {/* <span className="card_dragging-area"></span> */}
            <div className="card_body">
                <textarea onChange={onTextAreaChange} value={item.value} name="value"></textarea>
            </div>
        </div>
    )
}

export default NoteCard
