import { createContext, useEffect, useState } from "react";
import { getContenidos } from "../api/contenidos";

export const ContenidosContext = createContext();

export function ContenidosProvider({ children }) {

  const [contenidos, setContenidos] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  // filtros
  const [search, setSearch] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("");
  const [productora, setProductora] = useState("");
  const [director, setDirector] = useState("");
  const [order, setOrder] = useState(""); // asc - desc

  // --- Cargar datos desde el backend ---
  const loadData = async (page = 1) => {

    const params = {
      page,
      search: search || undefined,
      genero: genero || undefined,
      tipo: tipo || undefined,
      productora: productora || undefined,
      director: director || undefined,
      ordering: order === "asc" ? "anio" : order === "desc" ? "-anio" : undefined,
    };

    const data = await getContenidos(params);

    setContenidos(data.results);
    setFiltered(data.results);

    setNextPage(data.next);
    setPrevPage(data.previous);
    setTotalPages(Math.ceil(data.count / data.results.length));
  };

  // --- Cuando cambia la página ---
  useEffect(() => {
    loadData(page);
  }, [page]);

  // --- Cuando cambian los filtros, reinicia a página 1 ---
  useEffect(() => {
    setPage(1);
    loadData(1);
  }, [search, genero, tipo, productora, director, order]);

  // botones de paginación
  const goNext = () => {
    if (nextPage) setPage(prev => prev + 1);
  };

  const goPrev = () => {
    if (prevPage) setPage(prev => prev - 1);
  };

  return (
    <ContenidosContext.Provider value={{
      contenidos,
      filtered,

      // paginación
      page, setPage,
      totalPages,
      nextPage,
      prevPage,
      goNext,
      goPrev,

      // filtros
      search, setSearch,
      genero, setGenero,
      tipo, setTipo,
      productora, setProductora,
      director, setDirector,
      order, setOrder
    }}>
      {children}
    </ContenidosContext.Provider>
  );
}
