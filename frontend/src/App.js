import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome to FitTrack</h1>
      <p>Your personal fitness tracking application.</p>
      <UserList />
    </div>
  );
}

export default App;
