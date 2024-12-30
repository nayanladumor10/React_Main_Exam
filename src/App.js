import './App.css';
import Navbar from './Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';  // Use Navigate for redirecting
import MovieDetails from './MovieDetails';
import Movielist from './Movielist';
import Moviesearch from './Moviesearch';
import Login from './Redux/Login';
import { useState } from 'react';

function App() {
  const [login, setLogin] = useState(false);  // Track if the user is logged in

  return (
    <div className="App">
      <Navbar />
      
      {/* Conditionally render routes based on login state */}
      {login ? (
        <Routes>
          <Route path="/" element={<MovieDetails />} />
          <Route path="/Movielist" element={<Movielist />} />
          <Route path="/Moviesearch" element={<Moviesearch />} />
        </Routes>
      ) : (
        <Navigate to="/login" />  // Redirect to login if not logged in
      )}

      {/* If not logged in, render the login component */}
      {!login && <Login onLogin={setLogin} />}
    </div>
  );
}

export default App;
