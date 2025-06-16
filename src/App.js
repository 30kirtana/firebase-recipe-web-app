import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";

// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';
// // eslint-disable-next-line no-unused-vars
// import firebase from './FirebaseConfig';

function App() {
  const [ user, setUser ] = useState(null);
  FirebaseAuthService.subscribeToAuthChanges(setUser);
  
  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
      <LoginForm existingUser={ user }></LoginForm>
      </div>
    </div>
  );
}

export default App;
