import React from 'react';
import Header from "./head";
import { auth, provider, db} from "../firebase-config";
import {setDoc,  doc, getDoc } from "firebase/firestore";
import { signInWithPopup } from  "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Homepage(props) {

    const { setIsAuth } = props;

    const signInWithGoogle = async() => {

        
        try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        const docRef = doc(db, "userChats", result.user.uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()) {
            await setDoc(doc(db,"userChats", result.user.uid),{});
        }
        await setDoc(doc(db, "users", result.user.uid), {
            userName: result.user.displayName,
            photo: result.user.photoURL,
            email: result.user.email,
            userID: result.user.uid,
          });
                    
        setIsAuth(true);
        }catch(err) {
            console.error(err);
        }
    }

    return <div>
            <div className="home-container">
                <Header />
                <div class="images-container">
                    <h1 className='HeadContent'>DHEE -CHAT</h1>
                    <p className='Content'>Your Number one messaging app.<br/>Get to connect with your friends and family.</p>
                    <img src="message-rm.png" alt="Messaging1" className="image1"/>
                    <img src="Pic.jpg" alt="Messaging3" className="image2"/>
                    <div className='homepage-btn'>
                        <button type="button" class="btn btn-primary btn1" onClick={signInWithGoogle}><GoogleIcon />  GOOGLE SIGN IN</button>
                    </div>
                </div>
            </div>
        </div>
}



export default Homepage;