/* This component acts as a context provide that holds all 
the current chats in the state */
import React from 'react';
import io from 'socket.io-client';

export const Context = React.createContext();

const initState = {
  general: [
    {from: 'leo', msg: 'yo'},
    {from: 'leo', msg: 'yo'},
    {from: 'leo', msg: 'yo'},
    {from: 'leo', msg: 'yo'},
  ],
  topic1: [
    {from: 'ivi', msg: 'yo'},
    {from: 'ivi', msg: 'yo'},
    {from: 'ivi', msg: 'yo'}, 
    {from: 'ivi', msg: 'yo'},
  ] 
}

// Reataining the the existing/current state while mapping
// over a chat that is received and re-rendering the page
const reducer = (state, action) => {
  const {from, msg, topic} = action.payload;

  switch(action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        // bring forward the entire state
        ...state,
        // destructuring to get the topic key
        // and topic array
        [topic]: [
          // bringing forward the old messeages
          ...state[topic],
          { from, msg }
        ]
      }
    
    default:
      return state; 
  }
}

let socket;

const sendChatAction = (value) => {
  socket.emit('chat message', value)
}

// a higher order component that wraps around the rest of 
// the application
const Store = (props) => {

  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', (msg) => {
      dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
    });
  }

  const user = 'leo' + Math.random(100).toFixed();

  return (
    <div>
      <Context.Provider value={{allChats, sendChatAction, user}}>
        {props.children}
      </Context.Provider>
    </div>
  )
}

export default Store;
