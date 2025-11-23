import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Detalle.css";

export default function Detalle() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/contenidos/${id}/`);
    setData(res.data);
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="detalle">
      
      <Link to="/" className="btn-volver">◀ Volver</Link>

      <div className="detalle-card">

        <img className="detalle-img" src={data.imagen_portada} alt={data.titulo} />

        <div className="detalle-info">
          <h1>{data.titulo}</h1>
          <p className="sinopsis">{data.sinopsis}</p>

          <p><strong>Año:</strong> {data.anio}</p>
          <p><strong>Director:</strong> {data.director}</p>
          <p><strong>Géneros:</strong> {data.generos.join(", ")}</p>
          <p><strong>Tipo:</strong> {data.tipo}</p>
          {data.capitulos && (
            <p><strong>Capítulos:</strong> {data.capitulos}</p>
          )}
        </div>

      </div>
    </div>
  );
}
