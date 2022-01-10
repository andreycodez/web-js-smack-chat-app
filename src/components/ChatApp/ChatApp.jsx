import React, { useState, useContext} from "react";
import {UserContext} from "../../App";
import './ChatApp.css';
import UserAvatar from "../UserAvatar/UserAvatar";
import Modal from "../Modal/Modal";
import { useHistory } from "react-router-dom";

const ChatApp = () => {
  const { authService } = useContext(UserContext);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const logoutUser = () => {
    authService.logoutUser();
    setModal(false);
    history.push('/login');
  }
  return(
      <div className="chat-app">
        <nav>
          <h1>Smack Chat</h1>
          <div className="user-avatar" onClick={() => setModal(true)}>
            <UserAvatar className="nav-avatar" size="sm" />
            <div>{authService.name}</div>
          </div>
        </nav>
        <Modal title="Profile" isOpen={modal} close={() => setModal(false)}>
          <div className="profile">
            <UserAvatar />
            <h4>Username: {authService.name}</h4>
            <h4>Email: {authService.email}</h4>
          </div>
          <button onClick={logoutUser} className="submit-btn logout-btn">Logout</button>
        </Modal>
      </div>
  )
}
export default ChatApp;
