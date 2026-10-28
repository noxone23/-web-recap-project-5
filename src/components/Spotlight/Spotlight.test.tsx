import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { Spotlight } from "./Spotlight"
import { ArtPiece } from "../../types"

const mockPieces: ArtPiece[] = [
  {
    slug: "test-piece",
    name: "Test Piece",
    artist: "Unknown",
    imageSource: "https://test-api.vercel.app/test-piece.jpg",
    year: "2026",
    genre: "Abstract",
    colors: ["111", "#222", "#333"],
    dimensions: { height: 100, width: 50, type: "cm" },
  },
];

describe("Spotlight Component", () => {
  test("render an art piece image and artist name", () => {
    render(
      <MemoryRouter>
        <Spotlight pieces={mockPieces} artPiecesInfo={[]} onToggle={() => {}} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test Piece");
    expect(image).toHaveAttribute("src", "https://test-api.vercel.app/test-piece.jpg");



    const artistName = screen.getByText("Unknown");
    expect(artistName).toBeInTheDocument();
  })
})
