import Card from "./Card";

function TopAnime({ topAnime }) {
  return (
    <section className="w-full bg-neutral-300 p-5">
      <h3 className="mb-2 text-center text-xl font-bold">Top 5 Anime</h3>
      <div className="flex flex-col md:flex-row w-full items-center md:items-stretch justify-center gap-5  text-center">
        {topAnime.map((anime) => (
          <Card key={anime.mal_id} item={anime} />
        ))}
      </div>
    </section>
  );
}

export default TopAnime;
