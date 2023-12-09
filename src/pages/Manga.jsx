import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import List from "../components/List";

function Manga() {
  const [limit, setLimit] = useState("25");
  const [pageNumberLimit, setPageNumberLimit] = useState(null);
  const [mangaList, setMangaList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams({
    sort: "asc",
    order_by: "popularity",
    page: 1,
    nsfw: false,
  });

  const order_by = searchParams.get("order_by");
  const sort = searchParams.get("sort");
  const pageNumber = searchParams.get("page") * 1;
  const nsfw = searchParams.get("nsfw");
  const genre = searchParams.get("genre");
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const rating = searchParams.get("rating");

  const FetchManga = async (pageNum) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/manga?${
        nsfw === "true" ? "" : "sfw"
      }&page=${pageNum}&order_by=${order_by}&sort=${sort}&limit=${limit}${
        genre ? `&genres=${genre}` : ""
      }${rating ? `&rating=${rating}` : ""}${
        status ? `&status=${status}` : ""
      }${type ? `&type=${type}` : ""}`
    ).then((res) => res.json());

    setMangaList(temp.data);
    setPageNumberLimit(temp.pagination.last_visible_page);
  };

  useEffect(() => {
    FetchManga(pageNumber);
  }, [searchParams]);

  return (
    <div>
      <Filter
        orderByValue={order_by}
        sort={sort}
        nsfw={nsfw === true ? true : false}
        genre={genre ? genre : null}
        contentType="manga"
        type={type ? type : null}
        status={status ? status : null}
        rating={rating ? rating : null}
      />

      <div className="flex flex-wrap gap-7 p-10 justify-center">
        <List list={mangaList} />
      </div>

      <Pagination pageNumber={pageNumber} MaxPageNumber={pageNumberLimit} />
    </div>
  );
}

export default Manga;
