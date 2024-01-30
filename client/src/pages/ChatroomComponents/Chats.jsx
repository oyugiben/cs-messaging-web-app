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

      const chatArrays = Object.entries(chats);
      console.log("🚀 ~ Chats ~ chatArrays:", chatArrays)
    
    
      return (
        <div className="chats">
          {Object.entries(chats).map(([chatId, chat]) => (
            <div
              className="chatRoom"
              key={chatId}
              onClick={() => handleSelect(chat)}
            >
              <div className="chatRoomInfo">
                {/* Replace with your actual Parse Server API function to fetch the most recent message */}
                <span>
                  {chat.get('messages').length > 0
                    ? new Date(chat.get('messages')[0]._created_at.get('$date')).toLocaleString()
                    : new Date(chat._created_at.get('$date')).toLocaleString()}
                </span>
                {/* Display other chat information as needed */}
              </div>
            </div>
          ))}
        </div>
      );
    
}

export default Chats;