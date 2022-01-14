import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from "../../App";


import './Chats.css';
import UserAvatar from "../UserAvatar/UserAvatar";

const Chats = () => {

  const { authService, chatService, appSelectedChannel } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (appSelectedChannel.id) {
      chatService.findAllMessagesForChannel(appSelectedChannel.id, authService.getBearerHeader())
          .then((res) => { setMessages(res)});
    }
  }, [appSelectedChannel]);

  return (
      <div className="chat">
        <div className="chat-header">
          <h3>#{appSelectedChannel.name} &mdash;</h3>
          <h4>{appSelectedChannel.description}</h4>
        </div>
        <div className="chat-list">
          {!!messages.length
              ? messages.map((msg) => (
                  <div key={msg.id} className="chat-message">
                    <UserAvatar avatar={{avatarName: msg.userAvatar, avatarColor: msg.userAvatarColor}} size="md"/>
                    <div className="chat-user">
                      <strong>{msg.userName}</strong>
                      <small>{msg.timestamp}</small>
                      <div className="message-body">
                        {msg.messageBody}
                      </div>
                    </div>
                  </div>
              ))
              : <div>No messages</div>

          }


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
