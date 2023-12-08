import React, { useEffect, useState } from "react";

function Characters({ contentId, type }) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/characters`
    ).then((res) => res.json());

    setCharacters(temp.data);
    console.log(temp.data);
    setLoading(false);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);
  return (
    <div className="flex flex-wrap gap-3">
      {characters.map((character, i) => (
        <div key={i} className="flex flex-col justify-between max-w-64">
          <img
            key={i}
            className="block w-64 object-cover rounded-2xl "
            src={character.character.images.jpg.image_url}
            alt={"image " + i}
          />
          <div>
            <p className="text-center text-lg font-bold w-64">
              {character.character.name}
            </p>
            {character.character.favorites && (
              <p className="text-center text-md font-bold">
                Favorites: {character.favorites.toLocaleString("en-US")}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Characters;
