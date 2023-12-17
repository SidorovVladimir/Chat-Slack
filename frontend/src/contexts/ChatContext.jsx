/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext } from "react";
import useSocket from "../hooks/useSocket";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const socket = useSocket();

  const addNewMessage = (message) => {
    socket.emit("newMessage", message);
  };

  const addNewChannel = (channel) => {
    socket.emit("newChannel", channel);
  };
  const removeChannel = (id) => {
    socket.emit("removeChannel", { id });
  };
  const renameChannel = (channel) => {
    socket.emit("renameChannel", { id: channel.id, name: channel.name });
  };

  const value = {
    socket,
    addNewChannel,
    addNewMessage,
    removeChannel,
    renameChannel,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
