import React, { useState, createContext, useContext } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ChatApp from "./components/ChatApp/ChatApp";
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from "./components/UserCreate/UserCreate";

export const UserContext = createContext();
const AuthProvider = ({ children }) => {
  const context = {
    // authService
    // messageService
    appSelectedChannel: {},
    appSetChannel: (ch) => {
      setAuthContext({...authContext, appSelectedChannel: ch});
      // update messageService selectedChannel,
    }
  }

  const [authContext, setAuthContext] = useState(context);

  return (
      <UserContext.Provider value={authContext}>
        { children }
      </UserContext.Provider>
  )
}

const PrivateRoute = ({ children, ...props }) => {
  const isLoggedIn = false;
  return (
      <Route {...props} render={({ location }) => isLoggedIn
        ? (children)
        : (<Redirect to={{ pathname: '/login', state: { from: location }}} />)
      }
      />
  )
}


function App() {
  return (
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserCreate} />
            <PrivateRoute>
              <ChatApp />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;
