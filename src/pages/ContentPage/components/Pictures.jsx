import React, { useEffect, useState } from "react";

function Pictures({ contentId, type }) {
  const [images, setImages] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/pictures`
    ).then((res) => res.json());

    setImages(temp.data);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);

  return (
    <section className="flex flex-wrap gap-2">
      {images.map((image, i) => (
        <img
          key={i}
          className="block w-96 object-cover rounded-2xl hover:scale-[1.025]"
          src={image.jpg.large_image_url}
          alt={"image " + i}
        />
      ))}
    </section>
  );
}

export default Pictures;
