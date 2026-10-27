import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import "./styles.css";

function SpotlightPage() {
  return (
    <div>
    <h2>Spotlight View</h2>
    <p>Random Artwork</p>
    </div>
  );
}

function GalleryPage() {
  return (
    <div>
    <h2>Gallery View</h2>
    <p>List of all Artworks</p>
    </div>
  );
}

function FavoritesPage() {
  return (
    <div>
    <h2>Favorites View</h2>
    <p>Favorite Artworks</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
    <h2>Page not found</h2>
    <p>The page does not existing</p>
    </div>
  );
}

export default function App() {
  return (
    <>
    <main>
      <h1>Art Gallery</h1>

      <Routes>
        <Route path="/" element={<SpotlightPage />} />
        <Route path="/art-pieces" element={<GalleryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Navigation />
    </>
  );
}