import React, { useState, useContext } from "react";
import {Link} from "react-router-dom";
import './UserCreate.css';
import Modal from "../Modal/Modal";
import {AVATARS} from "../../constants";
import {UserContext} from "../../App";
import {logDOM} from "@testing-library/react";
import Alert from "../Alert/Alert";

const UserCreate = ({ history }) => {
  const { authService } = useContext(UserContext);
  const INIT_STATE = {
    userName: '',
    email: '',
    password: '',
    avatarName: 'avatarDefault.png',
    avatarColor: 'none',
  }
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark')

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

  const chooseAvatarTheme = (v) => {
    setTheme(v);
  }

  const createUser = (e) => {
    e.preventDefault();
    console.log("Submit tapped");
    console.log(userInfo);
    const { userName, email, password, avatarName, avatarColor } = userInfo;
    console.log(userName, email, password, avatarName, avatarColor);
    if (userName && email && password) {
      setIsLoading(true);
      authService.registerUser(email, password).then(() => {
        authService.loginUser(email, password).then(() => {
          authService.createUser(userName, email, avatarName, avatarColor).then(() => {
            setUserInfo(INIT_STATE);
            history.push('/');
          }).catch((e) => {
            console.log('Creating user', e);
            setError(e);
          })
        }).catch((e) => {
          console.log('Loging user', e);
          setError(e);
        }).catch((e) => {
        console.log('Registering user', e);
        setError(e);
      })
      setIsLoading(false);
      })
    }
  }

  const { userName, email, password, avatarName, avatarColor } = userInfo;
  const errorMsg = 'Error creating account. Please try again.'

  return(
      <>
        <div className="center-display">
          {error ? <Alert message={errorMsg} type="alert-danger"/> : null}
          {isLoading ? <div>Loading...</div> : null}
          <h3 className="title">Create an account</h3>
          <form onSubmit={createUser} className="form">
            <input
                type="text"
                onChange={onChange}
                value={userName}
                className="form-control"
                name="userName"
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

        <Modal theme={theme} title="Choose Avatar" isOpen={modal} close={() => setModal(false)}>
          <div className="toggleLayer">
            {Object.keys(AVATARS).map((themeName) => (
                <div
                    className={'toggle' + (themeName === theme ? ' active' : '')}
                    onClick={() => setTheme(themeName)}>{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</div>
            ))}
          </div>
          <div className="avatar-list">
            {AVATARS[`${theme}`].map((img) => (
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
