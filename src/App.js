import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./componentes/Header";
import { Paginas } from "./componentes/Paginas";
import { DataProvider } from "./context/Dataprovider";
import { Carrito } from "./componentes/Carrito";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Header />
          <Paginas />
          <Carrito />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;