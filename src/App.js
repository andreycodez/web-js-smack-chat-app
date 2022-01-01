import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChatApp from "./components/ChatApp/ChatApp";
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from "./components/UserCreate/UserCreate";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about" exact>
              <ChatApp />
            </Route>
            <Route path="/login" exact>
              <UserLogin />
            </Route>
            {/*{A shorter way to make a rout}*/}
            <Route path="/register" exact component={UserCreate} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
