import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ArtPieceList from "./ArtPieceList";
import type { ArtPiece } from "../../types";

const mockPieces: ArtPiece[] = [
  {
    slug: "first-piece",
    name: "First Piece",
    artist: "Unknown_One",
    imageSource: "https://test-api.vercel.app/first-piece.jpg",
    year: "2026",
    genre: "Abstract",
    colors: ["111", "#222"],
    dimensions: { height: 100, width: 100, type: "cm" },
  },
  {
    slug: "second-piece",
    name: "Second Piece",
    artist: "Unknown_Second",
    imageSource: "https://test-api.vercel.app/second-piece.jpg",
    year: "2024",
    genre: "Modern",
    colors: ["000"],
    dimensions: { height: 40, width: 50, type: "cm" },
  },
];

describe("ArtPieceList Component", () => {
  test("render all art pieces as a list", () => {
    render(
      <MemoryRouter>
        <ArtPieceList
          artPieces={mockPieces}
          artPiecesInfo={[]}
          onToggle={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("First Piece")).toBeInTheDocument();
    expect(screen.getByText("Second Piece")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

  });
});
