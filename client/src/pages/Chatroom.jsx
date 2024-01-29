import React, { useEffect } from 'react';
import Sidebar from './ChatroomComponents/Sidebar';
import Chat from './ChatroomComponents/Chat';
import Parse from 'parse';
import { useNavigate } from 'react-router-dom';

const Chatroom = () => {
    const navigate = useNavigate();


    useEffect(() => {
        // Initialize Parse
    Parse.initialize(
        'branch-cs-messaging-web-app',
        'N9IcW9EFc^WUjFbe6(!!L#uqvg^k33AD9LL!4LnPT+VhkPPqNk'
      );
      Parse.serverURL = 'http://localhost:1337/branch-cs-messaging-web-app';
  
      // Enable local data storage (optional)
      Parse.enableLocalDatastore(true);
        //Get agent object
        let currentUser;
        try {
            currentUser = Parse.User.current();
            console.log("🚀 ~ useEffect ~ currentUser:", currentUser)

            if (!currentUser) navigate('/')
        } catch (err) {
            console.log("🚀 ~ useEffect ~ err:", err)
            Parse.User.logOut();
            navigate('/')
        }
    });


    return (
        <div className='chatroom'>
            <div className='container'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Chatroom;