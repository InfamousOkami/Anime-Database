import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function MoreInfoComp({ contentId, type }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/moreinfo`
    ).then((res) => res.json());

    setContent(temp.data);

    setLoading(false);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);

  if (loading === true) {
    return (
      <div>
        <p>
          <BarLoader />
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-5 bg-white p-3 rounded-lg">
        {content.moreinfo === null ? "No Info Available" : content.moreinfo}
      </div>
    );
  }
}
export default MoreInfoComp;
