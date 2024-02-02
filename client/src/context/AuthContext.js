/* global Parse */
/* eslint-disable no-undef */
import { createContext, useEffect, useState } from 'react';
import Parse from '../ParseInitialize';

export const AuthContext = createContext();

// AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setUserLoading(true);
        console.log('Before getting current user');
        
        const currentUser = Parse.User.current();
        
        if (!currentUser) {
          console.error('No current user found.');
          return;
        }

        console.log('🚀 ~ useEffect ~ currentUser:', currentUser);
        setCurrentAgent(currentUser);

        // Subscribe to LiveQuery for changes in the current user's chatrooms
        const chatroomsQuery = new Parse.Query('ChatRooms');

        // Check if currentUser is not null before using it in the query
        chatroomsQuery.equalTo('agent', currentUser.toPointer());

        // Log the query conditions for debugging
        console.log('🚀 ~ getCurrentUser ~ chatroomsQuery:', chatroomsQuery.toJSON());

        const chatroomsSubscription = chatroomsQuery.subscribe();

        chatroomsSubscription.on('create', (chatroom) => {
          // Handle new chatroom creation
          console.log('New chatroom created:', chatroom.toJSON());
          // Fetch the user afresh when a new chatroom is created
          updateCurrentAgent();
        });

        chatroomsSubscription.on('update', (chatroom) => {
          console.log('Chatroom updated:', chatroom.toJSON());
          updateCurrentAgent();
        });
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setUserLoaded(true);
        setUserLoading(false);
      }
    };

    getCurrentUser();

    return () => {
      // Unsubscribe from LiveQuery when component unmounts
      Parse.LiveQuery.close();
    };
  }, []);

  // Function to update currentAgent when a user logs in
  const updateCurrentAgent = async () => {
    try {
      setUserLoading(true);
      console.log('Before getting current user');
      const currentUser = Parse.User.current();
      
      if (!currentUser) {
        console.error('No current user found.');
        return;
      }

      console.log('🚀 ~ useEffect ~ currentUser:', currentUser);
      setCurrentAgent(currentUser);
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setUserLoaded(true);
      setUserLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentAgent, userLoaded, updateCurrentAgent, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
