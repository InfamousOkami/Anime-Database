import React, { useState } from "react";
import Search from "./search";

import { Bars3Icon } from "@heroicons/react/20/solid";

function Navbar() {
  const [active, setActive] = useState(false);

  return (
    <nav className="flex flex-wrap p-5 items-center justify-between bg-blue-500 ">
      {/* Logo */}
      <div className="text-4xl lg:w-[480px]">
        <a href="/">
          <span className="text-white">Anime</span>
          <span className="text-blue-950  font-bold">Database</span>
        </a>
      </div>

      {/* Links */}
      <div className="flex gap-2 text-xl md:text-2xl [&>*:hover]:text-blue-950 text-white">
        <a className="" href="/">
          Home
        </a>
        <a className="flex-1" href="/anime">
          Anime
        </a>
        <a className="" href="/manga">
          Manga
        </a>
      </div>

      <div className="md:hidden" onClick={() => setActive(!active)}>
        <Bars3Icon className="h-6 w-6" />
      </div>

      {/* Search */}
      <div className={`${active ? "" : "hidden"} md:block`}>
        <Search />
      </div>
    </nav>
  );
}

export default Navbar;
