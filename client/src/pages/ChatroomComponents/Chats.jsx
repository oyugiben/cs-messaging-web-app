import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Parse from "../../ParseInitialize";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentAgent } = useContext(AuthContext);
    console.log("🚀 ~ Chats ~ currentAgent:", currentAgent.id)
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
      console.log("🚀 ~ useEffect ~ Effect is running");
      getChats(currentAgent.id)

        return () => {};
    }, [currentAgent]);

    const getChats = async (agentId) => {
      const chats = await Parse.Cloud.run('getChatRooms', { agentId })
      console.log("🚀 ~ getChats ~ chats:", chats[2].get('customer'));
      setChats(chats)
    }

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_CUSTOMER", payload: u });
      };
    
      return (
        <div className="chats">
          {chats.length > 0 && Object.entries(chats)?.sort((a, b) => b[1].get('updatedAt') - a[1].get('updatedAt')).map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].get('customer'))}
            >
              <img src='' alt="" />
              <div className="userChatInfo">
                <span>{chat[1].get('customer').get('username')}</span>
                {/* Display the last message with a maximum of 20 characters */}
                <p>{chat[1].get('messages').length > 0
                  ? `${chat[1].get('messages')[0].get('messageBody').substring(0, 20)}${chat[1].get('messages')[0].get('messageBody').length > 20 ? '...' : ''}`
                  : ''}</p>
              </div>
            </div>
          ))}
        </div>
      );
    
}

export default Chats;