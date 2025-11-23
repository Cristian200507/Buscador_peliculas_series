import { useContext } from "react";
import { ContenidosContext } from "../context/ContenidosContext";

export default function SearchBar() {
  const { search, setSearch } = useContext(ContenidosContext);

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}