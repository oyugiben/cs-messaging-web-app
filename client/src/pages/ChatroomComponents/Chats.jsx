import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Parse from "../../ParseInitialize";
import DefaultAgent from '../img/default_agent.png'
import DefaultCustomer from '../img/default_customer.png'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentAgent } = useContext(AuthContext);
    console.log("🚀 ~ Chats ~ currentAgent:", currentAgent.id)
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
      console.log("🚀 ~ useEffect ~ Effect is running");
      getChats(currentAgent.id);
      //Load the first conversation
      if (chats.length > 0) {
        handleSelect(chats[0].get('customer'));
      }

        return () => {};
    }, [currentAgent]);

    const getChats = async (agentId) => {
      try {
        const chats = await Parse.Cloud.run('getChatRooms', { agentId })
      setChats(chats)
      } catch (err) {
        setChats([])
       }
    }

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_CUSTOMER", payload: u });
      };
    
      return (
        <div className="chats">
          {chats.length > 0 &&
            Object.entries(chats)
              .sort((a, b) => b[1].get('updatedAt') - a[1].get('updatedAt'))
              .map((chat) => {
                const message = chat[1].get('messages')[chat[1].get('messages').length - 1];
    
                return (
                  <div
                    className={`userChat ${message.className === 'CustomerMessages' && !message.get('isRead') ? 'unread' : ''}`}
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].get('customer'))}
                  >
                    <img src={DefaultCustomer} alt="" />
                    <div className="userChatInfo">
  <div className="infoContainer">
    <span>{chat[1].get('customer').get('username')}</span>
    <p>
      {message
        ? `${message.get('messageBody').substring(0, 20)}${
            message.get('messageBody').length > 20 ? '...' : ''
          }`
        : ''}
    </p>
  </div>
  {message && message.className === 'CustomerMessages' && !message.get('isRead') && <div className="greenDot"></div>}
</div>
                  </div>
                );
              })}
        </div>
      );
    
}

export default Chats;