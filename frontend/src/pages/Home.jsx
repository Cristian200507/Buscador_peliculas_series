import { useContext } from "react";
import { ContenidosContext } from "../context/ContenidosContext";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CardItem from "../components/CardItem";
import "../styles/Home.css";

export default function Home() {
  const { 
    filtered,
    page,
    totalPages,
    goNext,
    goPrev,
    setPage
  } = useContext(ContenidosContext);

  return (
    <div>
      <SearchBar />
      <Filters />

      <div className="grid">
        {filtered.map(item => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>

      {/* PAGINACIÓN - SIN ESTILOS EN LÍNEA */}
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

    </div>
  );
}