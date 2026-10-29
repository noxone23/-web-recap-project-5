import { useState, useEffect } from "react";
import { Shuffle, Play, Pause } from "lucide-react";
import { ArtPiece } from "../../types";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

type SpotlightProps = {
  pieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export function Spotlight({ pieces, artPiecesInfo, onToggle }: SpotlightProps) {
  const [spotlightPiece, setSpotlightPiece] = useState<ArtPiece | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  function getRandomPiece(artPiece: ArtPiece[]) {
    const randomIndex = Math.floor(Math.random() * artPiece.length);
    return artPiece[randomIndex];
  }

  // random art pieces when the pieces array loads
  useEffect(() => {
    if (pieces && pieces.length > 0) {
      setSpotlightPiece(getRandomPiece(pieces));
    }
  }, [pieces]);

  // random shuffle button
  function handleShuffle() {
    if (pieces && pieces.length > 0) {
      let nextPiece = getRandomPiece(pieces);

      // it prevents that not the same index is chosen
      while (pieces.length > 1 && nextPiece?.slug === spotlightPiece?.slug) {
        nextPiece = getRandomPiece(pieces);
      }
      setSpotlightPiece(nextPiece);
    }
  }

  // auto slide show timer
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(() => {
      handleShuffle();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isAutoPlaying, pieces, spotlightPiece]);

  if (!spotlightPiece) {
    return <p>No art piece found!</p>;
  }

  return (
    <section className="spotlight">
      <figure className="art-piece">
        <img src={spotlightPiece.imageSource} alt={spotlightPiece.name} />
        <figcaption>
          <strong>Artist:</strong> {spotlightPiece.artist}
          <FavoriteButton
            isFavorite={artPiecesInfo.some(
              (piece) => piece.slug === spotlightPiece.slug && piece.isFavorite
            )}
            onToggle={() => onToggle(spotlightPiece.slug)}
          />
        </figcaption>
      </figure>

      {/* random shuffle button */}
      <div className="spotlight-controls">
        <button
          type="button"
          onClick={handleShuffle}
          className="shuffle-button"
        >
          <Shuffle size={18} /> Shuffle
        </button>

        {/* auto slide show toggle */}
        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className="slideshow-toggle"
          title="Auto playing every 8s"
        >
          {isAutoPlaying ? (
            <>
              <Pause size={18} /> Pause
            </>
          ) : (
            <>
              <Play size={18} /> Slideshow
            </>
          )}
        </button>
      </div>
    </section>
  );
}
