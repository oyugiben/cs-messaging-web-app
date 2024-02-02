import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import Parse from "../../ParseInitialize";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentAgent } = useContext(AuthContext);

  const markMessagesAsRead = async (messages) => {
    for (const message of messages) {
      const isCustomerMessage = message.className === 'CustomerMessages';
      console.log("🚀 ~ markMessagesAsRead ~ isCustomerMessage:", isCustomerMessage)
      if (isCustomerMessage) {
        const customerMessageId = message.id
        await Parse.Cloud.run('readCustomerMessage', { customerMessageId })
      }
    }
  }

  useEffect(() => {
    const chatRoomId = data.chatRoomId;
    console.log("🚀 ~ useEffect ~ chatRoomId:", chatRoomId)

    const fetchData = async () => {
      const chatRoom = currentAgent.get('chatrooms')?.find((chatroom) => chatroom.id === chatRoomId);

      if (chatRoom) {
        await markMessagesAsRead(chatRoom.get('messages'));
        setMessages(chatRoom.get('messages'));
      }
    };

    fetchData();

    return () => {};
  }, [data.chatRoomId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
