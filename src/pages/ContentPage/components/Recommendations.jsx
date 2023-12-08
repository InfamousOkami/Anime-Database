import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

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
  const newTitle = item.replaceAll(" ", "-");
  return newTitle;
};

function Recommendations({ type, contentId }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/recommendations`
    ).then((res) => res.json());

    setContent(temp.data);
    console.log(temp.data);

    setLoading(false);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);

  if (loading === true) {
    return <BarLoader />;
  } else {
    return (
      <div className="flex flex-wrap gap-3">
        {content.map((item, i) => (
          <article className="flex-[1_1_33.3%] max-w-xs flex-col items-center  rounded-2xl justify-between text-center">
            <div className=" h-full flex flex-col justify-between">
              <a
                className="w-full"
                href={`/${type}/${item.entry.mal_id}/${getTitle(
                  item.entry.title
                )}`}
                rel="noreferrer"
              >
                <figure className="block mb-4 hover:scale-[1.05]">
                  <img
                    className="block w-full object-cover rounded-2xl"
                    src={item.entry.images.jpg.large_image_url}
                    alt={item.entry.title}
                  />
                  {item.entry.title}
                </figure>
              </a>
              <div>
                <h3 className="w-auto text-lg font-bold mb-2">{item.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }
}

export default Recommendations;
