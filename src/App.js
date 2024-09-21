import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaPartidos from './components/ListaPartidos';
import ListaResultados from './components/ListaResultados';
import Login from './components/Login';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/partidos" component={ListaPartidos} />
      <Route path="/login" component={Login} />
      <Route path="/resultados" component={ListaResultados} />
    </Switch>
  </Router>
  );
}

export default App;
