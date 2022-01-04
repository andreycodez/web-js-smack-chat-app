import axios from "axios";
const BASE_URL = 'http://localhost:3005/v1';
const URL_ACCOUNT = `${BASE_URL}/account`;
const URL_LOGIN = `${URL_ACCOUNT}/login`;
const URL_REGISTER = `${URL_ACCOUNT}/register`;
const URL_USER = `${BASE_URL}/user`;
const URL_USER_BY_EMAIL = `${URL_USER}/byEmail/`


const headers = { 'Content-Type': 'application/json' };

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

export class AuthService extends User {
  constructor() {
    super();
    this.authToken = '';
    this.bearerHeader = {};
  }

  setUserEmail(email) {
    this.email = email
  }


  setAuthToken(token) {
    this.authToken = token;
  }

  setIsLoggedIn(loggedIn) {
    this.isLogedIn = loggedIn;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`,
    }
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  async loginUser(email, password) {
    const body = {'email': email.toLowerCase(), 'password': password}
    try {
      const response = await axios.post(URL_LOGIN, body, { headers });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setUserEmail(response.data.user);
      this.setIsLoggedIn(true);
      await this.findUserByEmail();
    } catch(error) {
      console.log(error);
    }
  }

  async findUserByEmail() {
    const headers = this.getBearerHeader();
    try {
      const response = await axios.get(URL_USER_BY_EMAIL + this.email, { headers });
      this.setUserData(response.data);
    } catch (e) {
      console.log(e)
    }
  }
}
