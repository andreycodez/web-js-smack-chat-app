import React, { useState, useContext } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";
import Alert from "../Alert/Alert";

const UserLogin = ({location, history}) => {
  const { authService } = useContext(UserContext);
  const [userLogins, setUserLogins] = useState({email: '', password: ''});
  const [error, setError] = useState(false);
  const onChange = ({ target: {name, value}}) => {
    setUserLogins( { ...userLogins, [name]: value } )
  }

  const onLoginUser = (e) => {
    e.preventDefault();
    const { email, password } = userLogins;
    if (!!email & !!password) {
      const { from } = location.state || { from: {pathname: '/'} }
      authService.loginUser(email, password)
          .then(() => history.replace(from))
          .catch(() => {
            setUserLogins({email: '', password: ''});
            setError(true);
          })
    }
  }

  const errorMsg = "Sorry you entered incorrect email or password";

  return(
      <div className="center-display">
        {error ? (<Alert message={errorMsg} type="alert-danger" />) : null}
        <form className="form" onSubmit={onLoginUser}>
          <label htmlFor="credentials">Enter you <strong>email address</strong> and <strong>password</strong></label>
          <input
              id="credentials"
              onChange={onChange}
              value={userLogins.email}
              type="email"
              className="form-control"
              name="email"
              placeholder="elonmask@tesla.com"
          />
          <input
              id="credentials"
              onChange={onChange}
              value={userLogins.password}
              type="password"
              className="form-control"
              name="password"
              placeholder="password" />
          <input type="submit" className="submit-btn" value="Sign in" />
        </form>
        <div className="footer-text">
          No account? Create one&nbsp;
          <Link to="/register">Here</Link>
        </div>
      </div>
  )
}

export default UserLogin;
