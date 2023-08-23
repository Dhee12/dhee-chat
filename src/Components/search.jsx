import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, serverTimestamp, updateDoc, setDoc, getDoc } from "firebase/firestore";
import {db, auth} from "../firebase-config";

function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const handleSearch = async() => {
        const q = query(collection(db, "users"), where("userName", "==", username));
        try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    }catch(err) {
        setErr(true);
    }
    }

    const handleSelect = async() => {
        // Check whether the group exist.//
        const combinedID = auth.currentUser.uid > user.userID ? auth.currentUser.uid + user.userID : user.userID + auth.currentUser.uid;
        try {
            const res = await getDoc(doc(db, "messages", combinedID));
            if (!res.exists()) {
                await setDoc(doc (db, "messages", combinedID),{messages:[]});

                //create User Chats
                await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
                    [combinedID+".userInfo"]: {
                        uid: user.userID,
                        userName: user.userName,
                        photo: user.photo
                    },
                    [combinedID+".date"]: serverTimestamp()
    
                });

                await updateDoc(doc(db, "userChats", user.userID), {
                    [combinedID+".userInfo"]: {
                        uid: auth.currentUser.uid,
                        userName: auth.currentUser.displayName,
                        photo: auth.currentUser.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
    
                });
            }
        }catch(err) {

        }
        setUser(null);
        setUsername("");
        //Create User Chat for Two people
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }
    return <div className='search'>
        <div class="input-group flex-nowrap searchForm">
            <input type="text" 
            class="form-control" 
            placeholder="Find a User.." 
            aria-label="Username" 
            aria-describedby="addon-wrapping" 
            onKeyDown={handleKey} 
            onChange={e => setUsername(e.target.value)}
            value={username}    
            />
        </div>
        {err && <span className="userChat">User not found!</span>}
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photo} alt="user"/>
            <div className="userChatInfo">
                <h6>{user.userName}</h6>
                <p>What just talked recently</p>
            </div>
        </div>}
    </div>
}



export default Search;