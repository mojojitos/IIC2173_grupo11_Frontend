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
import Recomendaciones from './components/Recomendaciones/Recomendaciones.jsx';
import WebpayRedirect from './components/Webpay/WebpayRedirect.jsx';
import WalletRedirect from './components/Wallet/WalletRedirect.jsx';
import CompraResultado from './components/CompraResultado/CompraResultado.jsx';
import BullData from './components/BullData/BullData.jsx';
import ReservaInfo from './components/ReservaInfo/ReservaInfo.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import ShowAuctions from './components/ShowAuctions/ShowAuctions.jsx';
import ShowProposal from './components/ShowProposal/ShowProposal.jsx';


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
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/arena" element={<BullData />} />
        <Route path="/reserva-info" element={<ReservaInfo />} />
        <Route path="/subastas" element={<ShowAuctions />} />
        <Route path="/propuestas" element={<ShowProposal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
