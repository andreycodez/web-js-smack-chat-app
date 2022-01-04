class User {
  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.avatarname = '';
    this.avatarColor = '';
    this.isLogedIn = false;
  }

  setUserData(userData) {
    const { _id, name, email, avatarName, avatarColor } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.avatarname = avatarName;
    this.avatarColor = avatarColor;
  }

  logoutUser() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.avatarname = '';
    this.avatarColor = '';
    this.isLogedIn = false;
  }
}
