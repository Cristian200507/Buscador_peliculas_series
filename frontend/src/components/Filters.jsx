import { useContext } from "react";
import { ContenidosContext } from "../context/ContenidosContext";

export default function Filters() {
  const {
    contenidos,
    setGenero, setTipo, setProductora, setDirector, setOrder
  } = useContext(ContenidosContext);

  // Obtener valores únicos
  const generos = [...new Set(contenidos.flatMap(c => c.generos))];
  const tipos = [...new Set(contenidos.map(c => c.tipo))];
  const productoras = [...new Set(contenidos.map(c => c.productora))];
  const directores = [...new Set(contenidos.map(c => c.director))];

  return (
    <div className="filters">
      {/* GÉNERO */}
      <select onChange={(e) => setGenero(e.target.value)}>
        <option value="">Género</option>
        {generos.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      {/* TIPO */}
      <select onChange={(e) => setTipo(e.target.value)}>
        <option value="">Tipo</option>
        {tipos.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* PRODUCTORA */}
      <select onChange={(e) => setProductora(e.target.value)}>
        <option value="">Productora</option>
        {productoras.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* DIRECTOR */}
      <select onChange={(e) => setDirector(e.target.value)}>
        <option value="">Director</option>
        {directores.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* ORDEN */}
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="">Ordenar por año</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
}