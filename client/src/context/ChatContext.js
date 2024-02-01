/* global Parse */
/* eslint-disable no-undef */
import { createContext, useReducer, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentAgent } = useContext(AuthContext);
  currentAgent && console.log("🚀 ~ ChatContextProvider ~ currentAgent:", currentAgent)

  const INITIAL_STATE = {
    chatRoomId: null,
    customer: null,
  };

  let chatReducer = (state, action) => {};
  currentAgent &&
    (chatReducer = (state, action) => {
      switch (action.type) {
        case 'CHANGE_USER':
          const { payload } = action;
          const chatRooms = currentAgent.get('chatrooms');
          console.log('🚀 ~ chatReducer ~ chatRooms:', chatRooms);

          // Find the chatRoom where the customer field matches the payload
          const matchingChatRoom = chatRooms.find(
            chatRoom => chatRoom.get('customer').id === payload.id
          );
          console.log("🚀 ~ ChatContextProvider ~ matchingChatRoom:", matchingChatRoom)

          return {
            customer: payload,
            chatRoomId: matchingChatRoom ? matchingChatRoom.id : 'null',
          };

        default:
          return state;
      }
    });

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
