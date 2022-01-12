import axios from "axios";
import io from 'socket.io-client';
const BASE_URL = 'http://localhost:3005/v1';
const URL_ACCOUNT = `${BASE_URL}/account`;
const URL_LOGIN = `${URL_ACCOUNT}/login`;
const URL_REGISTER = `${URL_ACCOUNT}/register`;
const URL_USER = `${BASE_URL}/user`;
const URL_USER_BY_EMAIL = `${URL_USER}/byEmail/`;
const URL_USER_ADD = `${URL_USER}/add`;
const URL_GET_CHANNELS = `${BASE_URL}/channel`;


const headers = { 'Content-Type': 'application/json' };

class User {
  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.avatarName = 'avatarDefault.png';
    this.avatarColor = '';
    this.isLogedIn = false;
  }

  setUserData(userData) {
    const { _id, name, email, avatarName, avatarColor } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.avatarName = avatarName;
    this.avatarColor = avatarColor;
  }
}

export class AuthService extends User {
  constructor() {
    super();
    this.authToken = '';
    this.bearerHeader = {};
  }

  logoutUser() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.avatarName = 'avatarDefault.png';
    this.avatarColor = '';
    this.isLoggedIn = false;
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
    this.isLoggedIn = loggedIn;
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

  async registerUser(email, password) {
    const body = { 'email': email.toLowerCase(), 'password': password }
    try {
      await axios.post(URL_REGISTER, body);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createUser(name, email, avatarName, avatarColor) {
    const headers = this.getBearerHeader();
    const body = {
      'name': name,
      'email': email,
      'avatarName': avatarName,
      'avatarColor': avatarColor
    }
    try {
      const response = await axios.post(URL_USER_ADD, body, {headers});
      this.setUserData(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
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
      throw(error);
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

export class ChatService {
  constructor(authHeader) {
    this.getAuthHeader = authHeader;
    this.channels = [];
    this.selectedChannel = {};
    // this.headers = {};
  }
  //
  // logOutHeaders = () => {
  //   this.headers = this.getAuthHeader;
  // }

  addChannel = (channel) => this.channels.push(channel);
  setSelectedChannel = (channel) => this.selectedChannel = channel;
  getAllChannels = () => this.channels;

  async findAllChannels() {
    //const headers = this.getAuthHeader();
    try {
      let response = await axios.get(URL_GET_CHANNELS, {
        // headers
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDkzNDM1ZDVlYjMyOTA1ZTM3N2Y2MCIsImlhdCI6MTY0MTkxNzU5MiwiZXhwIjoxNjQ5NjkzNTkyfQ.aXd_nvSyu9bamBDhxSCC7wn7F2dK-85cRg0iF8izVls`,
        }
      });
      response = response.data.map((channel) => ({
        name: channel.name,
        description: channel.description,
        id: channel._id,
      }));
      this.channels = [...response];
      return response;
    } catch (e) {
      // this.logOutHeaders();
      console.error(e);
      throw e;
    }
  }
}

export class SocketService {
  socket = io('http://localhost:3005/')
  constructor(socketAddChannel, getChannelList) {
    this.socketAddChannel = socketAddChannel;
    this.getChannelList = getChannelList;
  }

  establishConnection() {
    console.log('client connected');
    this.socket.connect();
  }

  closeConnection() {
    console.log('client disconnected');
    this.socket.disconnect();
  }

  addChannel(name, description) {
    this.socket.emit('newChannel', name, description);
  }

  getChannel(cb) {
    this.socket.on('channelCreated', (name, description, id) => {
      const channel = { name, description, id };
      this.socketAddChannel(channel);
      const channelList = this.getChannelList();
      cb(channelList);
    })
  }

}
