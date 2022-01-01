import {Link} from "react-router-dom";

const UserLogin = () => {
  return(
      <div className="center-display">
        <form className="form">
          <label htmlFor="credentials">Enter you <strong>email address</strong> and <strong>password</strong></label>
          <input id="credentials" type="email" className="form-control" name="email"/>
          <input id="credentials" type="password" className="form-control" name="password" />
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
