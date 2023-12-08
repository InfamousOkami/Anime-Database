import { useState, useEffect } from "react";
import Card from "./Card";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import List from "./List";
import Filter from "./Filter";

function SearchResults() {
  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [limit, setLimit] = useState(25);
  const [animeList, setAnimeList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams({
    order_by: "popularity",
    sort: "asc",
  });

  const pageNumber = searchParams.get("page") * 1;
  const searchParam = searchParams.get("search");
  const type = searchParams.get("type");
  const contentType = searchParams.get("content-type");
  const order_by = searchParams.get("order_by");
  const sort = searchParams.get("sort");
  const nsfw = searchParams.get("nsfw");
  const genre = searchParams.get("genre");
  const status = searchParams.get("status");
  const rating = searchParams.get("rating");

  const FetchAnime = async (query, pageNum, contentType) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${contentType}?${
        nsfw === "true" ? "" : "sfw"
      }&page=${pageNum}&q=${query}&order_by=${order_by}&sort=${sort}&limit=${limit}${
        genre ? `&genres=${genre}` : ""
      }${rating ? `&rating=${rating}` : ""}${
        status ? `&status=${status}` : ""
      }${type ? `&type=${type}` : ""}`
    ).then((res) => res.json());

    console.log(temp);
    setAnimeList(temp.data);
    setPageNumberLimit(temp.pagination.last_visible_page);
  };

  useEffect(() => {
    FetchAnime(searchParam, pageNumber, contentType);
  }, [pageNumber, searchParam, contentType, searchParams]);

  return (
    <section>
      <Filter
        orderByValue={order_by}
        sort={sort}
        nsfw={nsfw === true ? true : false}
        genre={genre ? genre : null}
        contentType={contentType}
        type={type ? type : null}
        status={status ? status : null}
        rating={rating ? rating : null}
      />

      <List list={animeList} />

      <Pagination pageNumber={pageNumber} MaxPageNumber={pageNumberLimit} />
    </section>
  );
}

export default SearchResults;
