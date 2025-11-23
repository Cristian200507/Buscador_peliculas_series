import { Link } from "react-router-dom";

export default function CardItem({ item }) {
  return (
    <Link to={`/detalle/${item.id}`} className="card-item">
      <img src={item.imagen_portada} alt={item.titulo} />
      <h3>{item.titulo}</h3>
    </Link>
  );
}
