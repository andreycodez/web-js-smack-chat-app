import React, {useContext} from "react";
import {UserContext} from "../../App";
import './ChatApp.css';

const ChatApp = () => {
  const { authService } = useContext(UserContext);
  return(
      <div className="chat-app">
        <nav>
          <h1>Smack Chat</h1>
          <div className="user-avatar">
            <img
                style={{backgroundColor: authService.avatarColor}}
                src={authService.avatarName}
                alt="avatar"/>
            <div>{authService.name}</div>
          </div>
        </nav>
      </div>
  )
}
export default ChatApp;
