import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentAgent } = useContext(AuthContext);

  useEffect(() => {
    const chatRoomId = data.chatRoomId;
    console.log("🚀 ~ useEffect ~ chatRoomId:", chatRoomId)
    const chatRoom = currentAgent.get('chatrooms')?.find((chatroom) => chatroom.id === chatRoomId);

    if (chatRoom) {
      setMessages(chatRoom.get('messages'));
    }

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
