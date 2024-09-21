import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Partidos from "./pages/partidos/partidos.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/partidos" element={<Partidos />} />
      </Routes>
    </Router>
  );
}

export default App;
