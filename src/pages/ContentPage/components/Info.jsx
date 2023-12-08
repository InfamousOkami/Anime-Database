import React from "react";

const getChilrenNames = (content, type) => {
  let array;
  array = content[type].map((item) => item.name);

  const string = array.join(", ");

  return string;
};

function Info({ content, type }) {
  if (type === "anime") {
    return (
      <div className="h-full">
        <p className="border-b-2 border-gray-600 font-bold text-lg">
          Information
        </p>
        <div className="">
          {/* Type */}
          <p className="flex gap-1">
            <span className="font-bold">Type:</span>
            {content?.type}
          </p>

          {/* Episodes */}
          <p className="flex gap-1">
            <span className="font-bold">Episodes:</span> {content?.episodes}
          </p>

          {/* Status */}
          <p className="flex gap-1">
            <span className="font-bold">Status:</span> {content?.status}
          </p>

          {/* Aired */}
          <p className="">
            <span className="font-bold">Aired:</span> {content?.aired.string}
          </p>

          {/* Premiered */}
          <p className="flex gap-1">
            <span className="font-bold">Premiered:</span>
            {content?.season.slice(0, 1).toUpperCase() +
              content?.season.slice(1) +
              " " +
              content?.aired.prop.from.year}
          </p>

          {/* Broadcast */}
          <p className="">
            <span className="font-bold">Broadcast:</span>{" "}
            {content?.broadcast.string}
          </p>

          {/* Producers */}
          <p className="">
            <span className="font-bold">Producers:</span>{" "}
            {content && getChilrenNames(content, "producers")}
          </p>

          {/* Licensors */}
          <p className="">
            <span className="font-bold">Licensors:</span>
            {content && getChilrenNames(content, "licensors")}
          </p>

          {/* Studios */}
          <p className="">
            <span className="font-bold">Studios:</span>{" "}
            {content && getChilrenNames(content, "studios")}
          </p>

          {/* Source */}
          <p className="flex gap-1">
            <span className="font-bold">Source:</span> {content?.type}
          </p>

          {/* Genres */}
          <p className="">
            <span className="font-bold">Genres: </span>
            {content && getChilrenNames(content, "genres")}
          </p>

          {/* Themes */}
          <p className="">
            <span className="font-bold">Themes: </span>
            {content && getChilrenNames(content, "themes")}
          </p>

          {/* Demographics */}
          <p className="flex gap-1">
            <span className="font-bold">Demographics:</span> {content?.type}
          </p>

          {/* Duration */}
          <p className="flex gap-1">
            <span className="font-bold">Duration:</span> {content?.type}
          </p>

          {/* Rating */}
          <p className="">
            <span className="font-bold">Rating:</span> {content?.rating}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full">
        <p className="border-b-2 border-gray-600 font-bold text-lg">
          Information
        </p>
        <div className="">
          {/* Type */}
          <p className="flex gap-1">
            <span className="font-bold">Type:</span>
            {content?.type}
          </p>

          {/* Status */}
          <p className="flex gap-1">
            <span className="font-bold">Status:</span> {content?.status}
          </p>
          {/* Aired */}
          <p className="">
            <span className="font-bold">Published:</span>{" "}
            {content?.published.string}
          </p>

          {/* authors */}
          <p className="">
            <span className="font-bold">Studios:</span>{" "}
            {content && getChilrenNames(content, "authors")}
          </p>
          {/* Genres */}
          <p className="">
            <span className="font-bold">Genres: </span>
            {content && getChilrenNames(content, "genres")}
          </p>
          {/* Themes */}
          <p className="">
            <span className="font-bold">Themes: </span>
            {content && getChilrenNames(content, "themes")}
          </p>
          {/* Demographics */}
          <p className="flex gap-1">
            <span className="font-bold">Demographics:</span> {content?.type}
          </p>
        </div>
      </div>
    );
  }
}

export default Info;
