import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../App";


import './Chats.css';
import UserAvatar from "../UserAvatar/UserAvatar";

const Chats = () => {

  const { authService, chatService, appSelectedChannel, socketService } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (appSelectedChannel.id) {
      chatService.findAllMessagesForChannel(appSelectedChannel.id)
          .then((res) => { setMessages(res)});
    }
  }, [appSelectedChannel]);

  useEffect(() => {
    socketService.getChatMessage(() => {
      setMessages([...chatService.messages]);
    })
  }, []);

  useEffect(() => {
    socketService.getUserTyping((users) => {
      let names = '';
      let usersTyping = 0;
      for (const [typingUser, chId] of Object.entries(users)) {
        if (typingUser !== authService.name && appSelectedChannel.id === chId) {
          names = (names === '' ? typingUser : `${names}, ${typingUser}`);
          usersTyping += 1;
        }
      }
      if (usersTyping > 0) {
        const verb = (usersTyping > 1) ? 'are' : 'is';
        setTypingMessage(`${names} ${verb} typing a message...`);
      } else {
        setTypingMessage('');
      }
    })
  }, [appSelectedChannel])

  const onTyping = ({target: { value }}) => {
    if (!value.length) {
      setIsTyping(false);
      socketService.stopTyping(authService.name)
    } else if (!isTyping) {
      socketService.startTyping(authService.name, appSelectedChannel.id)
    } else {
      setIsTyping(true);
    }

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
    socketService.stopTyping(authService.name);
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
            <div className="typing">{typingMessage}</div>
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
