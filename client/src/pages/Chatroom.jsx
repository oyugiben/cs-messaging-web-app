import React, { useEffect, useContext } from 'react'
import Sidebar from './ChatroomComponents/Sidebar'
import Chat from './ChatroomComponents/Chat'
import { AuthContext } from '../context/AuthContext';

const Chatroom = () => {
    const { currentAgent } = useContext(AuthContext);
    console.log('Empty user length' + Object.keys(currentAgent).length);
    console.log("🚀 ~ Chatroom ~ currentAgent:", currentAgent);

  return (
    <div className='chatroom'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Chatroom;