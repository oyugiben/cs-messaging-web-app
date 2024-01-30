/* global Parse */
/* eslint-disable no-undef */
import { createContext, useEffect, useState } from 'react';
import Parse from '../ParseInitialize';
console.log('🚀 ~ Parse:', Parse);

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentAgent, setCurrentAgent] = useState(null);

  useEffect(() => {
    console.log('Before getting current user');
    const currentUser = Parse.User.current();
    console.log('🚀 ~ useEffect ~ currentUser:', currentUser);
    setCurrentAgent(currentUser);

    return () => {};
  }, []);

  const logout = () => {
    Parse.User.logOut();
    setCurrentAgent(null);
  }

  return <AuthContext.Provider value={{ currentAgent }}>{children}</AuthContext.Provider>;
};
