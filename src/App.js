
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
