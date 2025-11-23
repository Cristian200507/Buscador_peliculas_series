import { createContext, useEffect, useState, useCallback } from "react";
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
  const [order, setOrder] = useState("");

  // estados de carga y error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Cargar datos desde el backend ---
  const loadContenidos = useCallback(async (pageNumber = 1) => {
    const token = localStorage.getItem("access");
    if (!token) return; // ⛔ Evita llamadas sin token

    setLoading(true);
    setError("");

    const params = {
      page: pageNumber,
      search: search || undefined,
      genero: genero || undefined,
      tipo: tipo || undefined,
      productora: productora || undefined,
      director: director || undefined,
      ordering: order === "asc" ? "anio" : order === "desc" ? "-anio" : undefined,
    };

    try {
      const data = await getContenidos(params);

      setContenidos(data.results);
      setFiltered(data.results);

      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalPages(Math.ceil(data.count / data.results.length));
    } catch (err) {
      console.error(err);
      setError("Error al cargar los contenidos. Intenta recargar.");
    } finally {
      setLoading(false);
    }
  }, [search, genero, tipo, productora, director, order]);

  // --- Cuando cambia la página ---
  useEffect(() => {
    loadContenidos(page);
  }, [page, loadContenidos]);

  // --- Cuando cambian los filtros ---
  useEffect(() => {
    setPage(1);
    loadContenidos(1);
  }, [search, genero, tipo, productora, director, order, loadContenidos]);

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
      order, setOrder,

      // carga y errores
      loading,
      error,
      loadContenidos,
    }}>
      {children}
    </ContenidosContext.Provider>
  );
}
