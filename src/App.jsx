import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Partidos from "./components/Partidos/Partidos.jsx";
import DetallePartidoPage from "./components/DetallePartido/DetallePartidoPage.jsx";
import Login from './components/Login/Login.jsx';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal.jsx';
import Wallet from './components/Wallet/Wallet.jsx';
import Signup from './components/Signup/Signup.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Notificacion from './components/Notificacion/Notificacion.jsx';
import HistorialCompra from './components/HistorialCompra/HistorialCompra.jsx';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/pagina-principal" element={<PaginaPrincipal />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notificacion" element={<Notificacion />} />
        <Route path="/historial-compra" element={<HistorialCompra />} />
      </Routes>
    </Router>
  );
}
export default App;
