import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import Parse from '../../ParseInitialize';

const Input = () => {
    const [text, setText] = useState("");
    const { currentAgent } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
      const agentUserId = currentAgent.id;
      const messageBody = text;
      const chatRoomId = data.chatRoomId;
        await Parse.Cloud.run('sendMessageToCustomer', { chatRoomId, agentUserId, messageBody });
    
        setText("");
      };
    
      return (
        <div className="input">
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="send">
            <img src={Attach} alt="" />
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => {}}
            />
            <label htmlFor="file">
              <img src={Img} alt="" />
            </label>
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      );
}

export default Input;