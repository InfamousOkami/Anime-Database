import React, { useEffect, useState } from "react";
import TopAnime from "../components/TopAnime";
import TopManga from "../components/TopManga";

function Home() {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);

  const getTopAnime = async () => {
    const res = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
    );

    const data = await res.json();
    setTopAnime(data.data.slice(0, 5));
  };

  const getTopManga = async () => {
    const res = await fetch(
      "https://api.jikan.moe/v4/top/manga?filter=bypopularity"
    );

    const data = await res.json();
    setTopManga(data.data.slice(0, 5));
  };

  useEffect(() => {
    getTopAnime();
    setTimeout(() => {
      getTopManga();
    }, 1500);
  }, []);

  return (
    <div className=" bg-neutral-100">
      <TopAnime topAnime={topAnime} />
      <TopManga topManga={topManga} />
    </div>
  );
}

export default Home;
