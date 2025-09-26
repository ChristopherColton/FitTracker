import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import React from 'react';
import WorkoutForm from './WorkoutForm';

function App() {
  

  return (
    <div className="App">
      <h1>Welcome to FitTrack</h1>
      <p>Your personal fitness tracking application.</p>
      <UserList />
    
      <h2>Workouts</h2>
      <WorkoutForm />
    </div>
  );
}

export default App;
