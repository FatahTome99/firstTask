import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import SendMessages from "./SendMessage";
import styles from "../messages/message.module.scss"
import "../messages/message.module.scss"
import '../../style/theme.scss';
import ReactDOM from "react-dom";


// import ChatBox, { ChatFrame } from 'react-chat-plugin';

import { MessageBox } from 'react-chat-elements';
// import { ChatBubble, Message } from 'react-chat-ui';
import { MessageList } from 'react-chat-elements'
import { useTheme } from "../../context/ThemeProvider";
interface  message{
    text:string,
    userId:string,
}

interface setShowChat{
    setShowChat:React.Dispatch<React.SetStateAction<boolean>>
}

function Message (props : message){
    const isUser = auth.currentUser?(auth.currentUser.uid==props.userId?true:false):false

    return (
        <div>
            <p className={styles.id}>{auth.currentUser ? (auth.currentUser.uid == props.userId ? '' : props.userId) : ''}</p>
            <div key={props.userId} className={`msg ${isUser ? styles.sent : styles.received}`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default function Messages(props:setShowChat) {
    const [messages, setMessages] = useState<any[]>([]);
    const [messages2, setMessages2] = useState<any[]>([]);

    const { Theme, ChangeTheme } = useTheme();
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        db.collection('Messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
        db.collection('Users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        })

    }, [])

    console.log("theme "+Theme)

    function handleonBlue(){
        console.log("bluer ")
        props.setShowChat(false)
    }

    return ReactDOM.createPortal (
        // <div className={`chat ${Theme}`}>
        <div className={styles.chat}>
            {/* <div className={styles.chatMessages}
            //  onMouseLeave={handleonBlue}
             > */}
            <ul id="messages" className={styles.chatMessages} >
            
            {messages.slice().reverse().map(({ id, text }) => (<li data-cy="messages">
            <div>
                
                <Message userId={id}  text={text}></Message>
                
                </div></li>
            ))
            }
            </ul>
            {/* </div> */}
            
            
            <SendMessages setShowChat={props.setShowChat}></SendMessages>
       
        </div>
        // </div>
    , document.body)
}