import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Publicaciones from "./Publicaciones";
import Usuarios from "./Usuarios";

const Tareas = () => <div>Tareas</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/publicaciones/:key" element={<Publicaciones />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
