import React, { useContext, useEffect, useRef } from 'react';
import { auth } from '../firebase-config';
import { ChatContext } from '../context/ChatContext';


function ChatMessage({message}) {
    const currentUserId = auth.currentUser.uid;
    const currentUserPhoto = auth.currentUser.photoURL;
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message]);

    return <div ref={ref} className={`message ${message.SenderId === currentUserId && "owner"}`}>
            <div className="messageInfo">
                <img src={message.SenderId === currentUserId ? currentUserPhoto : data.user.photo} alt= "D.P"/>
            </div>
            <div className="messageContent">
                {message.img && <img className="messageImg" src={message.img} alt=""/>}
                <p className="messageText">{message.text}</p>
            </div>
            </div>

};

export default ChatMessage;