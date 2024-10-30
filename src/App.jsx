import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Partidos from "./components/Partidos/PartidosPage.jsx";
import DetallePartidoPage from "./components/DetallePartido/DetallePartidoPage.jsx";
import Login from './components/Login/Login.jsx';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal.jsx';
import Wallet from './components/Wallet/Wallet.jsx';
import Signup from './components/Signup/Signup.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import HistorialNotificacion from './components/HistorialNotificacion/HistorialNotificacion.jsx';
import HistorialCompra from './components/HistorialCompra/HistorialCompra.jsx';
import DetallePartidoTerminado from './components/PartidosTerminados/DetallePartidoTerminado.jsx';
import PartidosTerminados from './components/PartidosTerminados/PartidosTerminados.jsx';
import WebpayRedirect from './components/Webpay/WebpayRedirect.jsx';
import WalletRedirect from './components/Wallet/WalletRedirect.jsx';
import CompraResultado from './components/CompraResultado/CompraResultado.jsx';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/pagina-principal" element={<PaginaPrincipal />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
        <Route path="/partido-terminado/:fixtureId" element={<DetallePartidoTerminado />} />
        <Route path="/resultado/:state/:requestId" element={<CompraResultado />} />
        <Route path="/resultados" element={<PartidosTerminados />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/webpay/:requestId" element={<WebpayRedirect/>} />
        <Route path="/wallet/:requestId" element={<WalletRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/historial-notificacion" element={<HistorialNotificacion />} />
        <Route path="/historial-compra" element={<HistorialCompra />} />
      </Routes>
    </Router>
  );
}
export default App;
