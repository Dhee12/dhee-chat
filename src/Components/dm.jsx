import React, { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { ChatContext } from "../context/ChatContext";


function DM() {
    const [chats, setChats] = useState([]);
    const currentUser = auth.currentUser?.uid;

    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            if (currentUser) {
                const unsub = onSnapshot(doc(db, "userChats", currentUser), (doc) => {
                    setChats(doc.data());
                });

                return unsub;
            }
        };

        return getChats();
    }, [currentUser]);

    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u})
    }
    return (
    <div className="sidebar">
        {Object.entries(chats)?.sort((a,b)=>b[1].date -a[1].date).map((chat) => (
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photo} alt= "DP"/>
            <div className="userChatInfo">
                <h6>{chat[1].userInfo.userName}</h6>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
        ))}
       
    </div>)
}

export default DM;