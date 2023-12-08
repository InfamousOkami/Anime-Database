import Card from "./Card";

function TopManga({ topManga }) {
  return (
    <section className="w-full bg-neutral-100 p-5">
      <h3 className="mb-5 text-center text-xl font-bold">Top 5 Manga</h3>
      <div className="flex flex-col md:flex-row w-full items-center md:items-stretch justify-center gap-5  text-center">
        {topManga.map((manga) => (
          <Card key={manga.mal_id} item={manga} />
        ))}
      </div>
    </section>
  );
}

export default TopManga;
