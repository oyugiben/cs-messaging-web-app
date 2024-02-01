import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import DefaultAgent from '../img/default_agent.png'
import DefaultCustomer from '../img/default_customer.png'

const Message = ({ message }) => {
    console.log("🚀 ~ Message ~ message:", message)
    const { currentAgent } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

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
                message.get('agent').id === currentAgent.id
                  ? currentAgent.get('photoURL')
                  : data.customer.get('photoURL')
              }
              alt=""
            />
            <span>{message.get('createdAt').toLocaleString()}</span>
          </div>
          <div className="messageContent">
            <p>{message.get('messageBody')}</p>
            {message && <img src={message} alt='' />}
          </div>
        </div>
      );
    
}

export default Message;