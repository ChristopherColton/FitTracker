import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <h1>Welcome to FitTrack</h1>

      {!user ? (
        <>
        {showRegister ? (
          <RegisterForm onRegister = {setUser} />
        ) : (
        <LoginForm onLogin = {setUser} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Back to Login' : 'Register'}
        </button>
        </>
      ) : (
        <div>
          <h2>Hello, {user.username}</h2>
          <WorkoutForm user={user} />
        </div>
      )}
    </div>
  );
}
  export default App;