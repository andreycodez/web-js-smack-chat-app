import React, {useContext} from "react";
import {UserContext} from "../../App";
import './ChatApp.css';
import UserAvatar from "../UserAvatar/UserAvatar";

const ChatApp = () => {
  const { authService } = useContext(UserContext);
  return(
      <div className="chat-app">
        <nav>
          <h1>Smack Chat</h1>
          <div className="user-avatar">
            <UserAvatar className="nav-avatar" size="sm" />
            <div>{authService.name}</div>
          </div>
        </nav>
      </div>
  )
}
export default ChatApp;
