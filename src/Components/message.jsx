import React, { useState, useEffect, useContext } from 'react';
import {updateDoc, onSnapshot, doc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import {db, auth, storage} from "../firebase-config";
import ChatMessage from './chatmessage';
import SendIcon from '@mui/icons-material/Send';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { ChatContext } from '../context/ChatContext';
import { v4 as uuidv4 } from 'uuid';
import Search from './search';
import DM from './dm';


function Message() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [Img, setImg] = useState(null);
    const { data } = useContext(ChatContext);

   useEffect(() => {
        const unSubscribe = onSnapshot(doc(db,"messages", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSubscribe();
        }
   }, [data.chatId]);

    const handleSendMessage = async(e) => {
        e.preventDefault();
     if(Img) {
        try{
            const storageRef = ref(storage, uuidv4());
            const uploadTask = uploadBytesResumable(storageRef, Img);

            uploadTask.on(
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "messages", data.chatId), {
                        messages: arrayUnion({
                            id: uuidv4(),
                            SenderId: auth.currentUser.uid,
                            text: newMessage,
                            img: downloadURL,
                            createdAt: Timestamp.now(),
                            user: auth.currentUser.displayName,
                            photo: auth.currentUser.photoURL,
                        }),
                    });
                });
            });
        }catch(err){
            console.log("err");
        }

        }else {
            if (newMessage.trim() !== '') {
                await updateDoc(doc(db, "messages", data.chatId), {
                  messages: arrayUnion({
                      id: uuidv4(),
                      SenderId: auth.currentUser.uid,
                      text: newMessage,
                      createdAt: Timestamp.now(),
                      user: auth.currentUser.displayName,
                      photo: auth.currentUser.photoURL,
                  })
                  
                });
      
                await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
                  [data.chatId + ".lastMessage"]: {
                      text: newMessage
                  },
                  [data.chatId+".date"]: serverTimestamp(),
                });
      
                await updateDoc(doc(db, "userChats", data.user.uid), {
                  [data.chatId + ".lastMessage"]: {
                      text: newMessage
                  },
                  [data.chatId+".date"]: serverTimestamp(),
                });
      
              }
        }    

        setNewMessage("");
        setImg(null);
      };
    
    return<div>
        <div className='main-container'>
                <div className='user-container'>
                </div>
                <div className='message-container'>

                <div className="side-chat1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Chats</button>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Chat Room</h5>
                        </div>
                        <div class="offcanvas-body mobile-chats">
                            <Search />
                            <DM />
                        </div>
                    </div>
                </div>

            <div className="user-head">
                <img className='user-img' src={data.user?.photo} alt="DP"/>
                <h2>{data.user?.userName}</h2>
            </div>
                <div>
                    {messages?.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                </div>
                <input className='input' type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..."></input>
                <span className='sendBtn' type= "submit"><SendIcon onClick={handleSendMessage}/></span>
                <div className='emoji'>
                    <EmojiEmotionsIcon className='emoji2' />
                    <AttachFileIcon />
                    <input type="file" style={{ display: "none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
                    <label htmlFor='file'><ImageIcon /></label>                                                                                                                         
                </div>
            </div>
        </div>
    </div>
}

export default Message;