import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import DefaultAgent from '../img/default_agent.png'
import DefaultCustomer from '../img/default_customer.png'

const Message = ({ message }) => {    
    const { currentAgent } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    console.log("🚀 ~ Message ~ message:", message.className)

    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message.id]);
    
    return (
        <div
          ref={ref}
          className='message'
        >
          <div className="messageInfo">
            <img
              src={
                message.className === 'AgentMessages'
                  ? DefaultAgent
                  : DefaultCustomer
              }
              alt=""
            />
          </div>
          <div className="messageContent">
            <p>{message.get('messageBody')}
            <hr />
            <span className="date">{message.get('createdAt').toLocaleString()}</span>
            </p>
            {message && <img src={message} alt='' />}
          </div>
        </div>
      );
    
}

export default Message;