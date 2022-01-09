import React, { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import './UserAvatar.css';

const UserAvatar = ({ className, size = 'lg' } ) => {
  const { authService } = useContext(UserContext);
  return (
      <img
          className={`avatar-icon ${className} ${size}`}
          style={{backgroundColor: authService.avatarColor}}
          src={authService.avatarName}
          alt="avatar"/>
  )
}

UserAvatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
}

UserAvatar.defaultProps = {
  className: '',
  size: 'lg',
}

export default UserAvatar;
