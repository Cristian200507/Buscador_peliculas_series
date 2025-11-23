import React from "react";
import PItem from "./CardItem";

export default function Grid({ items = [] }) {
  return (
    <div className="grid">
      {items.map(item => (
        <PItem key={item.id} item={item} />
      ))}
    </div>
  );
}
