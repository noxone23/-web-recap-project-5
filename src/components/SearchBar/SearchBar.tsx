import type { ArtPiece } from "../../types";

type SearchBarProbs = {
    artPieces: ArtPiece[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    sortOrder: string;
    onSortChange: (value: string) => void;
    selectedColor: string | null;
    onColorSelect: (color: string | null) => void;
};

export default function SearchBar({ 
    artPieces = [],
    searchTerm,
    onSearchChange,
    selectedGenre,
    onGenreChange,
    sortOrder,
    onSortChange,
    selectedColor,
    onColorSelect 
}: SearchBarProbs) {

    const availableGenres= ["all", ...Array.from(new Set(artPieces.map((piece) => piece.genre)))];
    const allUniqueColors: string[] = [];

    artPieces.forEach((piece) => {
        piece.colors.forEach((color) => {
            if (!allUniqueColors.includes(color)) {
                allUniqueColors.push(color);
            }
        })
    })

    return (
        <div className="filter-bar">
            <div className="filter-inputs-row">
            <input
            type="text"
            className="filter-search"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            />
            <select
            className="filter-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            >
                {availableGenres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre === "all" ? "All Genres" : genre}
                    </option>
                ))}
            </select>
            
            <select
                className="filter-select"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
                >
                <option value="none">Sort by Year</option>
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
            </select>
            </div>

            <div className="filter-colors-row">
                <span className="filter-color-label">Filter by color</span>

                {allUniqueColors.map((color) => (
                    <button
                    key={color}

                    className={`filter-color-bubble ${selectedColor === color ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(selectedColor === color ? null : color)}
                    title={`Filter by ${color}`}
                    />
                ))}
                {selectedColor && (
                    <button className="clear-color-btn" onClick={() => onColorSelect(null)}>
                        X Reset Color
                    </button>
                )}
            </div>
        </div>
    );
}