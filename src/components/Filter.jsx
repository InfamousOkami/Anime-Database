import React, { useState, Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Switch, Listbox, Transition } from "@headlessui/react";

// Page Lists
const orderByList = [
  { name: "Mal Id", value: "mal_id" },
  { name: "Title", value: "title" },
  { name: "Start Date", value: "start_date" },
  { name: "End Date", value: "end_date" },
  { name: "Episodes", value: "episodes" },
  { name: "Score", value: "score" },
  { name: "Scored By", value: "scored_by" },
  { name: "Rank", value: "rank" },
  { name: "Popularity", value: "popularity" },
  { name: "Members", value: "members" },
  { name: "Favorites", value: "favorites" },
];

const animeType = [
  { name: "TV", value: "tv" },
  { name: "Movie", value: "movie" },
  { name: "OVA", value: "ova" },
  { name: "Special", value: "special" },
  { name: "ONA", value: "ona" },
  { name: "Music", value: "music" },
];

const mangaType = [
  { name: "Manga", value: "manga" },
  { name: "Novel", value: "novel" },
  { name: "Lightnovel", value: "lightnovel" },
  { name: "Oneshot", value: "oneshot" },
  { name: "Doujin", value: "doujin" },
  { name: "Manhwa", value: "manhwa" },
  { name: "Manhua", value: "manhua" },
];

const statusList = [
  { name: "Airing", value: "airing" },
  { name: "Complete", value: "complete" },
  { name: "Upcoming", value: "upcoming" },
];

const ratingList = [
  { name: "G", value: "g" },
  { name: "PG", value: "pg" },
  { name: "PG-13", value: "pg13" },
  { name: "R-17+", value: "r17" },
  { name: "R", value: "r" },
  { name: "Rx", value: "rx" },
];

function Filter({
  orderByValue,
  sort,
  nsfw,
  genre,
  contentType,
  type,
  status,
  rating,
}) {
  // Params
  const [searchParams, setSearchParams] = useSearchParams();

  const genreName = searchParams.get("genreName");

  // Page States
  const [nsfwEnabled, setNsfwEnabled] = useState(nsfw);
  const [sortAscEnabled, setSortAscEnabled] = useState(sort);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(genre ? genre : "All");
  const [selectedType, setSelectedType] = useState(type ? type : "All");
  const [selectedStatus, setSelectedStatus] = useState(status ? status : "All");
  const [selectedRating, setSelectedRating] = useState(rating ? rating : "All");
  const [selectedOrderBy, setSelectedOrderBy] = useState(orderByValue);

  // API Requests
  const FetchGenres = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/genres/anime`).then(
      (res) => res.json()
    );

    setGenreList(temp.data);
  };

  useEffect(() => {
    setTimeout(() => {
      FetchGenres();
    }, 1500);
  }, [searchParams]);

  // Filter Handler
  const handleFilter = (filterName, filterValue) => {
    searchParams.set(`${filterName}`, filterValue);
  };

  const setFilters = () => {
    setSearchParams(searchParams);
  };

  const deleteFilter = (filterName) => {
    searchParams.delete(`${filterName}`);
  };

  const getContentType = (contentType) => {
    if (contentType === "anime") return animeType;
    if (contentType === "manga") return mangaType;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-center flex-col md:flex-row md:flex-wrap items-center m-auto max-w-4xl gap-3 mt-8">
        {/*  */}
        {/* Order By */}
        <div className="relative w-60 flex gap-1 items-center ">
          <p className="w-14">Sort By:</p>
          <Listbox
            value={selectedOrderBy}
            onChange={(e) => {
              setSelectedOrderBy(e);
              handleFilter("order_by", e);
            }}
          >
            <div className="relative mt-1 flex flex-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedOrderBy}</span>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute top-8 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  {orderByList.map((orderBy, orderByIdx) => (
                    <Listbox.Option
                      key={orderByIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={orderBy.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {orderBy.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/*  */}
        {/* Sort ListBox */}
        <div>
          <p className="flex gap-1">
            Sort Direction:
            <Switch
              checked={sortAscEnabled === "asc"}
              onChange={() => {
                if (sortAscEnabled === "asc") {
                  setSortAscEnabled("desc");
                  handleFilter("sort", "desc");
                } else {
                  setSortAscEnabled("asc");
                  handleFilter("sort", "asc");
                }
              }}
              as={Fragment}
            >
              {({ checked }) => (
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <ArrowUpIcon
                    className={`${checked ? "text-blue-600" : ""} w-4 h-4`}
                  />
                  <span className="sr-only">Enable notifications</span>
                  <ArrowDownIcon
                    className={`${checked ? "" : "text-blue-600"} w-4 h-4`}
                  />
                </button>
              )}
            </Switch>
          </p>
          {/* <div className="relative w-60">
        <Listbox value={selectedSort} onChange={setSelectedSort}>
          <div className="relative mt-1 flex">
            <Listbox.Label>Sort Direction:</Listbox.Label>
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedSort}</span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {sortDirections.map((sortDirection, sortIdx) => (
                  <Listbox.Option
                    key={sortIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={sortDirection.name}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {sortDirection.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div> */}
        </div>

        {/*  */}
        {/* Genre ListBox */}
        <div className="relative w-60">
          <Listbox
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.name);
              handleFilter("genre", e.mal_id);
              handleFilter("genreName", e.name);
              console.log(e);
            }}
          >
            <div className="relative mt-1 flex items-center gap-1">
              <Listbox.Label>Genre:</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                {genreName ? genreName : "All"}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute top-8 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  {genreList.map((genre, genreIdx) => (
                    <Listbox.Option
                      key={genreIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={genre}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {genre.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/*  */}
        {/* rating */}
        <div className="relative w-60">
          <Listbox
            value={selectedRating}
            onChange={(e) => {
              setSelectedRating(e);
              handleFilter("rating", e);
              console.log(e);
            }}
          >
            <div className="relative mt-1 flex items-center gap-1">
              <Listbox.Label>Rating:</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedRating}</span>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute top-8 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {ratingList.map((rating, ratingIdx) => (
                    <Listbox.Option
                      key={ratingIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={rating.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {rating.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/*  */}
        {/* status */}
        <div className="relative w-60">
          <Listbox
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e);
              handleFilter("status", e);
            }}
          >
            <div className="relative mt-1 flex items-center gap-1">
              <Listbox.Label>Status:</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedStatus}</span>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute top-8 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {statusList.map((status, statusIdx) => (
                    <Listbox.Option
                      key={statusIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={status.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {status.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/*  */}
        {/* Types */}
        <div className="relative w-60">
          <Listbox
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e);
              handleFilter("type", e);
            }}
          >
            <div className="relative mt-1 flex items-center gap-1">
              <Listbox.Label>Type:</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedType}</span>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute top-8 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {getContentType(contentType).map((type, sortIdx) => (
                    <Listbox.Option
                      key={sortIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={type.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {type.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/*  */}
        {/* NSFW Switch */}
        <p className="flex gap-2">
          NSFW:
          <Switch
            checked={nsfwEnabled}
            onChange={(e) => {
              setNsfwEnabled(e);
              handleFilter("nsfw", e);
              console.log("filter: ", e);
            }}
            as={Fragment}
          >
            {({ checked }) => (
              /* Use the `checked` state to conditionally style the button. */
              <button
                className={`${
                  checked ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            )}
          </Switch>
        </p>
      </div>

      {/* All Filters */}
      <div className="flex gap-4">
        {selectedRating !== "All" && (
          <div className="flex gap-4 bg-green-400 text-white px-4 py-2 text-sm items-center rounded-md">
            Rating: {selectedRating.toUpperCase()}
            <XMarkIcon
              onClick={() => {
                deleteFilter("rating");
                setSelectedRating("All");
              }}
              className="h-5 w-5 hover:text-red-600 hover:cursor-pointer"
            />
          </div>
        )}

        {selectedStatus !== "All" && (
          <div className="flex gap-4 bg-green-400 text-white px-4 py-2 text-sm items-center rounded-md">
            Status: {selectedStatus}
            <XMarkIcon
              onClick={() => {
                deleteFilter("status");
                setSelectedStatus("All");
              }}
              className="h-5 w-5 hover:text-red-600 hover:cursor-pointer"
            />
          </div>
        )}

        {selectedType !== "All" && (
          <div className="flex gap-4 bg-green-400 text-white px-4 py-2 text-sm items-center rounded-md">
            Type: {selectedType}
            <XMarkIcon
              onClick={() => {
                deleteFilter("type");
                setSelectedType("All");
              }}
              className="h-5 w-5 hover:text-red-600 hover:cursor-pointer"
            />
          </div>
        )}

        {selectedGenre !== "All" && (
          <div className="flex gap-4 bg-green-400 text-white px-4 py-2 text-sm items-center rounded-md">
            Genre: {genreName}
            <XMarkIcon
              onClick={() => {
                deleteFilter("genre");
                setSelectedGenre("All");
                deleteFilter("genreName");
              }}
              className="h-5 w-5 hover:text-red-600 hover:cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="rounded-md w-fit bg-blue-400 px-10 py-4 text-white  hover:bg-blue-500 hover:text-gray-200 "
        onClick={setFilters}
      >
        Filter
      </button>
    </div>
  );
}

export default Filter;
