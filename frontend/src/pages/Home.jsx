import { useContext, useEffect } from "react";
import { ContenidosContext } from "../context/ContenidosContext";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CardItem from "../components/CardItem";
import "../styles/Home.css";

export default function Home({ onLogout }) {
  const { 
    filtered,
    page,
    totalPages,
    goNext,
    goPrev,
    setPage,
    loadContenidos,
    loading,
    error
  } = useContext(ContenidosContext);

  // Cargar contenidos al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) loadContenidos();
  }, [loadContenidos]);

  return (
    <div>
      {/* Botón de logout */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <SearchBar />
      <Filters />

      {/* Estado de carga */}
      {loading && <p>Cargando contenidos...</p>}

      {/* Mensaje de error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Grid de contenidos */}
      <div className="grid">
        {!loading && !error && filtered.map(item => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>

      {/* PAGINACIÓN */}
      {!loading && !error && (
        <div className="pagination">
          <button 
            onClick={goPrev} 
            disabled={page === 1}
          >
            ◀ Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button 
            onClick={goNext} 
            disabled={page === totalPages}
          >
            Siguiente ▶
          </button>
        </div>
      )}
    </div>
  );
}
