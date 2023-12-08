import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function News({ contentId, type }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/news`
    ).then((res) => res.json());

    setContent(temp.data);
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
      <div className="flex flex-col bg-white rounded-md p-2">
        {content.map((item) => (
          <div className="w-full  border-gray-800 border-b-2 last:border-0">
            <div className="flex gap-2 items-center flex-wrap">
              <a href={item.url} className="underline hover:text-blue-500">
                {item.title}
              </a>
              <p>By: {item.author_username}</p>
            </div>

            <p>{item.excerpt}</p>

            <div className="flex gap-1 items-center">
              <p>{item.date.slice(0, 10)}</p>
              <p>-</p>
              <a href={item.forum_url} className="text-blue-500">
                Discussion ({item.comments})
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default News;
