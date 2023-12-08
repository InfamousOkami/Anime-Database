import { useState } from "react";

function Search() {
  const [searchType, setSearchType] = useState("anime");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    window.location.href = `/search?page=1&content-type=${searchType}&search=${search}`;
  };

  return (
    <section>
      <form
        className="flex flex-wrap justify-center gap-3 "
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-1">
          <label>Anime</label>
          <input
            type="radio"
            name="searchType"
            defaultChecked
            id="anime"
            value="anime"
            onChange={() => setSearchType("anime")}
          />
        </div>

        <div className="flex items-center gap-1">
          <label>Manga</label>
          <input
            type="radio"
            name="searchType"
            id="manga"
            value="manga"
            onChange={() => setSearchType("manga")}
          />
        </div>

        <input
          className="rounded-full bg-gray-100 px-5 py-2 text-gray-600 outline-none transition-colors duration-300 hover:bg-gray-600 hover:text-gray-100"
          type="search"
          placeholder="search Title..."
          value={search}
          required
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="bg-blue-500 rounded-md px-5 py-2 text-white"
          type="submit"
          value="Search"
        />
      </form>
    </section>
  );
}

export default Search;
