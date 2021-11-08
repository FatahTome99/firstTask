import firebase from "firebase";
import React, { useState } from "react";
import { db , auth} from "../../firebase";

import '../../style/theme.scss';
import styles from "../messages/message.module.scss"

interface setShowChat{
    setShowChat:React.Dispatch<React.SetStateAction<boolean>>
}
export default function SendMessages(props:setShowChat){
    
    const [message , setMessage] =useState('');

    async function handleSend(event :any){
        event.preventDefault()
        const id =auth.currentUser?.uid;
        await db.collection('Messages').add({
            text: message,
            id,
            // photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMessage('')
        //scroll.current.scrollIntoView({ behavior: 'smooth' })
        console.log('done')
    }
    function handleTextChange(event :any){
        setMessage(event.target.value)
    }
    function handleClose(event :any){
        props.setShowChat(false);
    }

    return (
        <div className={styles.sendMsg}>
            <form onSubmit={handleSend}>
                <input type="text" placeholder='Type Message ...' value={message} onChange={handleTextChange} data-cy="test message"/>
                <button type='submit' data-cy="send message">Send</button>
                <button onClick={handleClose}>close</button>
            </form>

        </div>
    )
}