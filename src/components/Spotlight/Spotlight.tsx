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
  //spinning wheel
  const [isSpinning, setIsSpinning] = useState(false);
  function handleRoulette() {
    if (isSpinning || pieces.length === 0) return;

    let winner = getRandomPiece(pieces);

    while (pieces.length > 1 && winner.slug === spotlightPiece?.slug) {
      winner = getRandomPiece(pieces);
    }
    setIsSpinning(true);

    setTimeout(() => {
      setSpotlightPiece(winner);
      setIsSpinning(false);
    }, 2500);
  }

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
    return <p>No art piece found!</p>;;
  }

  return (
    <section className="spotlight">
      {isSpinning ? (
        <div className="roulette-stage">
          <div className="roulette-pointer" />
          <div className="roulette-wheel">
            {pieces.map((piece, index) => {
              const angle = (360 / pieces.length) * index;

              return (
                <div
                  key={piece.slug}
                  className="roulette-item"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-220px) rotate(${-angle}deg)`,
                  }}
                >
                  <img src={piece.imageSource} alt={piece.name} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <figure className="art-piece">
        <img src={spotlightPiece.imageSource} alt={spotlightPiece.name} />
        <FavoriteButton
          isFavorite={artPiecesInfo.some(
            (piece) => piece.slug === spotlightPiece.slug && piece.isFavorite
          )}
          onToggle={() => onToggle(spotlightPiece.slug)}
        />
        <figcaption>
          <strong>Artist:</strong> {spotlightPiece.artist}
          <strong>ArtName:</strong> {spotlightPiece.name}
        </figcaption>
      </figure>
      )}
      {/* random shuffle button */}
 
<div className="spotlight-controls">
    <button
        type="button"
        onClick={handleRoulette}
        className="spotlight-button shuffle-button"
        disabled={isSpinning}
    >
        <Shuffle size={18} />
        <span>{isSpinning ? "Spinning..." : "Shuffle Artwork"}</span>
    </button>

    <button
        type="button"
        onClick={() => setIsAutoPlaying((prev) => !prev)}
        className={`spotlight-button slideshow-toggle ${
            isAutoPlaying ? "playing" : ""
        }`}
        title="Automatically change artwork every 8 seconds"
        aria-pressed={isAutoPlaying}
    >
        {isAutoPlaying ? (
            <>
                <Pause size={18} />
                <span>Pause Slideshow</span>
            </>
        ) : (
            <>
                <Play size={18} />
                <span>Start Slideshow</span>
            </>
        )}
    </button>
</div>

     
    </section>
  );
}

