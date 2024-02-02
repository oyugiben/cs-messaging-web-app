import React, { useContext, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);
    console.log("🚀 ~ Chat ~ data:", data.customer?.get('username'))
    
    return (
        <div className="chat">
          <div className="chatInfo">
          {data.customer && (
          <span>{data.customer && data.customer?.get('username')}</span>
        )}
          </div>
          <Messages />
          <Input/>
        </div>
      );
    
}

export default Chat;