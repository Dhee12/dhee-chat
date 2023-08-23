import { createContext, useReducer } from "react";
import { auth } from "../firebase-config";


export const ChatContext = createContext();


export const ChatContextProvider = ({children}) => {
    const currentUser = auth.currentUser?.uid;
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state,action) => {
        switch(action.type){
            case"CHANGE_USER":
                return {
                    chatId: currentUser > action.payload.uid ? currentUser + action.payload.uid : action.payload.uid + currentUser,
                    user: action.payload,
                };


            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
    <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
    </ChatContext.Provider>
    );
};