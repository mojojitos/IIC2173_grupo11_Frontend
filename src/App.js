import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Partidos from "./pages/partidos/partidos.jsx";
import DetallePartidoPage from "./pages/DetallePartido/DetallePartidoPage.jsx";
import Home from "./pages/Home/Home.jsx";
import React from 'react';
import Login from './components/Login/Login.js';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal';
import ListaPartidos from './components/ListaPartidos/ListaPartidos';
import ListaResultados from './components/ListaResultados/ListaResultados';
import Wallet from './components/Wallet/Wallet';
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partido/:fixtureId" element={<DetallePartidoPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" component={<Login/>} />
      </Routes>
      <Switch>
        <Route exact path="/" component={PaginaPrincipal} />
        <Route path="/pagina-principal" component={PaginaPrincipal} />
        <Route path="/partidos" component={ListaPartidos} />
        <Route path="/resultados" component={ListaResultados} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/login" component={Login} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}
export default App;
