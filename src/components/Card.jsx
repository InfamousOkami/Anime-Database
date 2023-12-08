import React from "react";

function Card({ item }) {
  const handleTags = (item) => {
    if (item.genres.length === 0) {
      return (
        <a className="bg-blue-400 py-1 px-3 rounded-full" href="/">
          Unknown
        </a>
      );
    } else {
      return item.genres.map((genre) => (
        <a
          key={genre.name}
          className="bg-blue-400 py-1 px-3 rounded-full"
          href="/"
        >
          {genre.name}
        </a>
      ));
    }
  };

  const getType = (item) => {
    if (
      item.type === "Manga" ||
      item.type === "Novel" ||
      item.type === "Lightnovel" ||
      item.type === "Oneshot" ||
      item.type === "Doujin" ||
      item.type === "Manhwa" ||
      item.type === "Manhua"
    ) {
      return "manga";
    } else {
      return "anime";
    }
  };

  const getTitle = (item) => {
    const newTitle = item.title.replaceAll(" ", "-");
    return newTitle;
  };

  return (
    <article className="flex-[1_1_33.3%] max-w-xs flex-col items-center  rounded-2xl justify-between text-center">
      <div className=" h-full flex flex-col justify-between">
        <a
          className="w-full"
          href={`/${getType(item)}/${item.mal_id}/${getTitle(item)}`}
          rel="noreferrer"
        >
          <figure className="block mb-4 hover:scale-[1.05]">
            <img
              className="block w-full object-cover rounded-2xl"
              src={item.images.jpg.large_image_url}
              alt={item.title}
            />
          </figure>
        </a>
        <div>
          <h3 className="w-auto text-lg font-bold mb-2">{item.title}</h3>
          <div className="flex gap-1 flex-wrap text-white text-sm justify-center items-center">
            {handleTags(item)}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
