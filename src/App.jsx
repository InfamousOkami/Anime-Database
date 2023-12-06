import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchResults from "./components/searchResults";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";
import ContentPage from "./pages/ContentPage/ContentPage";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/:type/:contentId/:title/" element={<ContentPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
