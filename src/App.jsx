import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SnakeGame from "./pages/SnakeGame.jsx";
import Navigation from "./components/Navigation.jsx";
import TicTacToe from "./pages/TicTacToe.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route exact path="/" element={<Index />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
