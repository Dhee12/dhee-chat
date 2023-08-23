import React from "react";
import DM from "./dm";
import Message from "./message";
import Header from "./head";
import Search from "./search";


function MainRoom() {
    return<div>
        <Header />
        <div className="side-chat">
            <Search />
            <DM />
        </div>
        <Message />
    </div>



}

export default MainRoom;