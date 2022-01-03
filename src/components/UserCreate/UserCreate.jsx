import {Link} from "react-router-dom";
import './UserCreate.css';
import Modal from "../Modal/Modal";
import {AVATARS} from "../../constants";

const UserCreate = () => {
  return(
      <>
        <div className="center-display">
          <h3 className="title">Create an account</h3>
          <form className="form">
            <input type="text" className="form-control" name="username" placeholder="enter user name"/>
            <input type="email" className="form-control" name="email" placeholder="enter email"/>
            <input type="password" className="form-control" name="password" placeholder="enter password"/>
            <div className="avatar-container">
              <img className="avatar-icon avatar-b-radius" src="/avatarDefault.png" alt="avatar"/>
              <div className="avatar-text">Choose Avatar</div>
              <div className="avatar-text">Generate background color</div>
            </div>
            <input type="submit" value="Create account" className="submit-btn"/>
          </form>
          <div className="footer-text">
            Already have an account? Login&nbsp;
            <Link to="/login">Here</Link>
          </div>
        </div>

        <Modal title="Choose Avatar" isOpen={true}>
          <div className="avatar-list">
            {/*{AVATARS.map((img) => (*/}
            {/*    <div key={img} className="avatar-icon">*/}
            {/*      <img src={img} alt="avatar"/>*/}
            {/*    </div>*/}
            {/*))}*/}

            {Array.from({ length: 28 }, (v, i) => (
                <div key={v} className="avatar-icon">
                  <img src={`/dark${i}.png`} alt="avatar"/>
                </div>
            ))}

          </div>
        </Modal>
      </>
  )
}

export default UserCreate;
