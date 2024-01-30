import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";

const Chat = () => {
    const { data } = useContext(ChatContext);
    console.log("🚀 ~ Chat ~ data:", data)
    
    return (
        <div className="chat">
          <div className="chatInfo">
          {data.customer && (
          <span>{data.customer.get('username')}</span>
        )}
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages />
          <Input/>
        </div>
      );
    
}

export default Chat;