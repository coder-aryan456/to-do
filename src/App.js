
import './App.css';
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notestate from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <>
    <Notestate>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup"element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
      </Notestate>
    </>
  );
}

export default App;
