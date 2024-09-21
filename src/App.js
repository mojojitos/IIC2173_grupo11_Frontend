
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Partidos from "./pages/partidos/partidos.jsx";
import DetallePartidoPage from "./pages/DetallePartido/DetallePartidoPage.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
