import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from "../../App";


import './Chats.css';
import UserAvatar from "../UserAvatar/UserAvatar";

const Chats = () => {

  const { authService, chatService, appSelectedChannel, socketService } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    if (appSelectedChannel.id) {
      chatService.findAllMessagesForChannel(appSelectedChannel.id, authService.getBearerHeader())
          .then((res) => { setMessages(res)});
    }
  }, [appSelectedChannel]);

  const onTyping = ({target: { value }}) => {
    setMessageBody(value);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const { name, id, avatarName, avatarColor } = authService;
    const user = {
      userName: name,
      userId: id,
      userAvatar: avatarName,
      userAvatarColor: avatarColor,
    }
    socketService.addMessage(messageBody, appSelectedChannel.id, user);
    setMessageBody('');
  }

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


          <form onSubmit={sendMessage} className="chat-bar">
            <div className="typing">User is typing...</div>
            <div className="chat-wrapper">
              <textarea
                onChange={onTyping}
                value={messageBody}
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
