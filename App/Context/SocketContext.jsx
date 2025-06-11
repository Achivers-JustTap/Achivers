import React,{ createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io('http://192.168.29.13:5000');

console.log('SocketContext: socket instance created:', socket);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('charithas Socket connected');
        });

        socket.on('disconnect', () => {
            console.log('charithas Socket disconnected');
        });

    
    }, []);

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketProvider;