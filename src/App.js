import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaPartidos from "./components/ListaPartidos/ListaPartidos.jsx";
import DetallePartidoPage from "./components/DetallePartido/DetallePartidoPage.jsx";
import Login from './components/Login/Login.js';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal';
import ListaPartidos from './components/ListaResultados/ListaResultados';
import Wallet from './components/Wallet/Wallet';
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/pagina-principal" element={<PaginaPrincipal />} />
        <Route path="/partidos" element={<ListaPartidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" component={<Login/>} />
        <Route path="/signin" component={<Signin/>} />
      </Routes>
    </Router>
  );
}
export default App;
