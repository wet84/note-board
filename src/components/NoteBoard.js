import React, { useState, useEffect } from 'react'
import NoteCard from './noteCard/NoteCard'
import apiService from '../noteBoardService'
import './noteBoard.scss'

const BUTTON_TITLE = 'create new card';

function NoteBoard() {
    const [cards, setNewCards] = useState([]);

    useEffect(() => {
        apiService.get().then(({ data }) => setNewCards(data));
    }, []);

    function createNewCard(){
        // const newCard = [
        //     ...cards,
        //     {
        //         id: Date.now(),
        //         value: '',
        //     }
        // ];
        //setNewCards(newCard);

        apiService.post('', {
            value: '',
        }).then(({ data }) => setNewCards([...cards, data]));
    }

    function deleteCards(id){
        setNewCards([...cards.filter((card) => card.id !== id )]);
        apiService.delete(id);
    }

    function updCard(id, updatedData) {
        let card = cards.find(el => el.id === id);
        card = { ...card, ...updatedData };
        const newCards = cards.map( item => item.id === card.id ? card : item );
        setNewCards(newCards);
        
        // apiService.put(id, {...updatedData }).then(({ data }) =>
        //     setNewCards(
        //         cards.map(item => item.id === data.id ? data : item)
        //     )
        // );
    }

    function saveCard(id){
        const card = cards.find((el) => el.id === id);
        apiService.put(id, card);
    }
    
    return (
        <div className="note-board">
            <div className="note-board_header">
                <button onClick={createNewCard}>{BUTTON_TITLE}</button>
            </div>
            <div className="note-board_card-area">
                {
                    cards.map((item) => (
                        <NoteCard
                            key={item.id}
                            item={item} 
                            deleteCard={deleteCards}
                            onChange={updCard}
                            onSave={saveCard}
                        ></NoteCard>
                    )) 
                }
            </div>
        </div>
    )
}

export default NoteBoard
