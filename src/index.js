import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter,RouterProvider } from "react-router-dom";
import Homepage from './Components/home';
import Message from './Components/message';
import App from './Components/app';
import DM from "./Components/dm";
import MainRoom from './Components/mainroom';
import { ChatContextProvider } from './context/ChatContext';



const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/message",
    element: <Message />
  },
  {
    path: "/home",
    element: <Homepage />
  },
  {
    path: "/dm",
    element: <DM />
  },
  {
    path: "/mainroom",
    element: <MainRoom />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatContextProvider>
    <RouterProvider router={router} /> 
  </ChatContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
