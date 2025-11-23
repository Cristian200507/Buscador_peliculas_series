import { Routes, Route } from "react-router-dom";
import { ContenidosProvider } from "./context/ContenidosContext";
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";

function App() {
  return (
    <ContenidosProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
    </ContenidosProvider>
  );
}

export default App;
