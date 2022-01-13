import React, { useContext } from 'react';
import {UserContext} from "../../App";


import './Chats.css';
import UserAvatar from "../UserAvatar/UserAvatar";

const Chats = () => {

  const { appSelectedChannel } = useContext(UserContext);

  return (
      <div className="chat">
        <div className="chat-header">
          <h3>#{appSelectedChannel.name} &mdash;</h3>
          <h4>{appSelectedChannel.description}</h4>
        </div>
        <div className="chat-list">

          <div className="chat-message">
            <UserAvatar size="md"/>
            <div className="chat-user">
              <strong>User Name</strong>
              <small>Some date</small>
              <div className="message-body">
                Some cool message
              </div>
            </div>
          </div>
          <form className="chat-bar">
            <div className="typing">User is typing...</div>
            <div className="chat-wrapper">
              <textarea
                value="Hello"
                placeholder="Type your message..."
              />
              <input type="submit" className="submit-btn" value="Send" />
            </div>
          </form>
        </div>

      </div>
  )
}

export default Chats;
