import { BrowserRouter as Router, Routes, Route } from "react-router-dom";// Importar BrowserRouter, Routes y Route desde react-router-dom
import Header from "../../components/Header";

// Importar componentes de las rutas
import Daycare from "../Daycare";
import Gallery from "../views/Gallery";
import Reservations from "../views/Reservations";
import Walks from "../views/Walks";

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Daycare />} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/walks" element={<Walks />} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}