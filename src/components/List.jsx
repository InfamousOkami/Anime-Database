import React from "react";
import Card from "./Card";

function List({ list }) {
  return (
    <div className="flex flex-col md:flex-wrap md:flex-row gap-7 p-10 justify-center">
      {list.map((anime) => (
        <Card key={anime.mal_id} item={anime} />
      ))}
    </div>
  );
}

export default List;
