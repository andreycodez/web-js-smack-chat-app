import React, { useState, useContext } from "react";
import {Link} from "react-router-dom";
import './UserCreate.css';
import Modal from "../Modal/Modal";
import {AVATARS} from "../../constants";
import {UserContext} from "../../App";

const UserCreate = () => {
  const { authService } = useContext(UserContext);
  const INIT_STATE = {
    username: '',
    email: '',
    password: '',
    avatarName: 'avatarDefault.png',
    avatarColor: 'none',
  }
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);

  const onChange = ({ target: {name, value}}) => {
    setUserInfo( { ...userInfo, [name]: value } )
  }

  const chooseAvatar = (avatar) => {
    setUserInfo( { ...userInfo, avatarName: avatar } )
    setModal(false);
  }

  const generateBgColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setUserInfo({...userInfo, avatarColor: `#${randomColor}`});
  }

  const { userName, email, password, avatarName, avatarColor } = userInfo;

  return(
      <>
        <div className="center-display">
          <h3 className="title">Create an account</h3>
          <form className="form">
            <input
                type="text"
                onChange={onChange}
                value={userName}
                className="form-control"
                name="username"
                placeholder="enter user name"/>
            <input
                type="email"
                onChange={onChange}
                value={email}
                className="form-control"
                name="email"
                placeholder="enter email"/>
            <input
                type="password"
                onChange={onChange}
                value={password}
                className="form-control"
                name="password"
                placeholder="enter password"/>
            <div className="avatar-container">
              <img style={{ backgroundColor: avatarColor }} className="avatar-icon avatar-b-radius" src={avatarName} alt="avatar"/>
              <div className="avatar-text" onClick={() => setModal(true)}>Choose Avatar</div>
              <div className="avatar-text" onClick={generateBgColor}>Generate background color</div>
            </div>
            <input type="submit" value="Create account" className="submit-btn"/>
          </form>
          <div className="footer-text">
            Already have an account? Login&nbsp;
            <Link to="/login">Here</Link>
          </div>
        </div>

        <Modal title="Choose Avatar" isOpen={modal} close={() => setModal(false)}>
          <div className="avatar-list">
            {AVATARS.map((img) => (
                <div role="presentation" key={img} className="avatar-icon" onClick={() => chooseAvatar(img)}>
                  <img src={img} alt="avatar"/>
                </div>
            ))}

            {/*{Array.from({ length: 28 }, (v, i) => (*/}
            {/*    <div key={v} className="avatar-icon">*/}
            {/*      <img src={`/dark${i}.png`} alt="avatar"/>*/}
            {/*    </div>*/}
            {/*))}*/}

          </div>
        </Modal>
      </>
  )
}

export default UserCreate;
