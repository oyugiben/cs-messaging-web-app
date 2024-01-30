import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Chats = () => {
    const [chats, setChats] = useState([]);
    console.log("🚀 ~ Chats ~ chats:", chats[0])
    const { currentAgent } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const currentAgentChats = currentAgent.get('chatrooms');
            setChats(currentAgentChats);
        };

        return () => {getChats()};
        currentAgent.id && getChats();
    }, [currentAgent.id]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_CUSTOMER", payload: u });
      };
    
    
      return (
        <div className="chats">
          {chats && Object.entries(chats)?.sort((a,b)=>b[1].get('createdAt') - a[1].get('createdAt')).map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].get('customer'))}
            >
              <img src={chat[1].get('customer').photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].get('customer').displayName}</span>
                <p>{chat[1].get('messages').pop?.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
}

export default Chats;