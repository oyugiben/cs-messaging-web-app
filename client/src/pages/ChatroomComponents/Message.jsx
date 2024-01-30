import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
    const { currentAgent } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();
    
    return (
        <div
          ref={ref}
          className={`message ${message.get('agent').id === currentAgent.id && "owner"}`}
        >
          <div className="messageInfo">
            <img
              src={
                message.get('agent').id === currentAgent.id
                  ? currentAgent.get('photoURL')
                  : data.customer.get('photoURL')
              }
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="messageContent">
            <p>{message}</p>
            {message && <img src={message} alt="" />}
          </div>
        </div>
      );
    
}

export default Message;