import React from 'react';
import './App.css';
import Home from "./components/Home";
import GameBoard from './components/GameBoard/gameBoard';


function App() {
  return (
    <div className="app-container">
        <Home />
        <GameBoard  />
    </div>
  );
}

export default App;
