import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";

function Reviews({ type, contentId }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/reviews`
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
        <h3 className="border-b-2 border-gray-800 font-bold text-md mb-2">
          Reviews
        </h3>
        {content.slice(0, 5).map((item, i) => (
          <div className="border-t-2 border-l-2 border-r-2 border-gray-800 last:border-b-2 p-3 ">
            <div className="bg-blue-100 pl-2 flex justify-between">
              <div className="flex gap-1 font-bold">
                <p>By:</p>
                <a href={item.user.url} className="text-blue-500 underline">
                  {item.user.username}
                </a>
                <p className="pl-2">Score: {item.score}</p>
              </div>
              <div className="flex items-center gap-3 ">
                {item.tags[0] === "Recommended" && (
                  <HandThumbUpIcon className="h-5 w-5 text-blue-500" />
                )}
                <p className="pr-2">{item.date.slice(0, 10)}</p>
              </div>
            </div>
            <p className="h-96 overflow-y-scroll">{item.review}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Reviews;
