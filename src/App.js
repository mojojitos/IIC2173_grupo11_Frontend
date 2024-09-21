import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Partidos from "./pages/partidos/partidos.jsx";
import DetallePartidoPage from "./pages/DetallePartido/DetallePartidoPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
