import { useState } from "react";
import type { ArtPiece } from "../../types";
import ArtPiecePreview from "../ArtPiecePreview/ArtPiecePreview";
import type { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";
import SearchBar from "../SearchBar/SearchBar";

type ArtPieceListProps = {
  artPieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};
export default function ArtPieceList({
  artPieces,
  artPiecesInfo,
  onToggle,
}: ArtPieceListProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const filteredPieces = artPieces.filter((artPiece) => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      artPiece.name.toLowerCase().includes(searchString) ||
      artPiece.artist.toLowerCase().includes(searchString)
      
    const matchesGenre = selectedGenre === "all" || artPiece.genre === selectedGenre;
    const matchesColor = !selectedColor || artPiece.colors.includes(selectedColor);

    return matchesSearch && matchesGenre && matchesColor;
});

const sortedAndilteredPieces = [...filteredPieces].sort((a, b) => {
  const yearA = Number(a.year);
  const yearB = Number(b.year);

  if (sortOrder === "asc") return yearA - yearB;
  if (sortOrder === "asc") return yearB - yearA;
  return 0;
});

  
return (
  <div>
    <SearchBar 
    artPieces={artPieces}
    searchTerm={searchTerm} 
    onSearchChange={setSearchTerm} 
    selectedGenre={selectedGenre}
    onGenreChange={setSelectedGenre}
    sortOrder={sortOrder}
    onSortChange={setSortOrder}
    selectedColor={selectedColor}
    onColorSelect={setSelectedColor}
    />
    {sortedAndilteredPieces.length === 0 && (
      <p className="search-no-results">
        No art pieces match your search.
      </p>
    )}

    <ul className="art-list">
      {sortedAndilteredPieces.map((artPiece) => (
        <li key={artPiece.slug}>
          <ArtPiecePreview
            artPiece={artPiece}
            artPiecesInfo={artPiecesInfo}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
    </div>
  );
}
