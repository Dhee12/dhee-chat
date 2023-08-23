import React, { useState } from 'react';
import Homepage from './home';
import Cookies from 'universal-cookie';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import MainRoom from './mainroom';

const cookies = new Cookies();



function App() {
    const [isAuth, setIsAuth ] = useState(cookies.get("auth-token"));

    const signUserOut = async() => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
    };

    if(!isAuth) {
        return(
            <Homepage setIsAuth={setIsAuth}/>
        );
    }

    return <>
         <MainRoom />
    <div className="sign-out">
        <button type="button" class="btn btn-secondary" onClick={signUserOut}>Sign Out</button>
    </div>
    </>
}

export default App;