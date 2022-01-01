import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChatApp from './components/ChatApp/ChatApp';
import UserCreate from './components/UserCreate/UserCreate';
import UserLogin from './components/UserLogin/UserLogin';

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
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <ChatApp />
            </Route>
            <Route path="/login">
              <UserLogin />
            </Route>
            <Route path="/register">
              <UserCreate />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
