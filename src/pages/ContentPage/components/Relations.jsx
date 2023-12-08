import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const getLinks = (content) => {
  let array;
  array = content.map((item, i) => {
    return (
      <div key={item.name}>
        <a
          href={`/${item.type}/${item.mal_id}/${item.name.replaceAll(
            " ",
            "-"
          )}`}
          className="text-blue-500 hover:text-blue-700"
        >
          {item.name}
        </a>
        {i !== content.length - 1 && <span>, </span>}
      </div>
    );
  });

  console.log("Test:", array);

  // const string = array.join(", ");

  return array;
};

function Relations({ type, contentId }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/relations`
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
      <div>
        <h2 className="border-b-2 border-gray-800 font-bold text-md mb-2">
          Relations
        </h2>
        {content.map((item, i) => {
          if (
            item.relation === "Summary" ||
            item.relation === "Character" ||
            item.relation === "Other" ||
            item.relation === "Side story" ||
            item.relation === "Spin-off"
          )
            return "";
          return (
            <div key={item.relation} className="flex gap-1 flex-wrap">
              <p className="font-bold">{item.relation}: </p>
              {getLinks(item.entry)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Relations;
