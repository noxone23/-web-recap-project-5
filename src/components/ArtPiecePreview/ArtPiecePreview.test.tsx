import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ArtPiecePreview from "./ArtPiecePreview";
import type { ArtPiece } from "../../types";

const mockPiece: ArtPiece = {
  slug: "test-piece",
  name: "Test Piece",
  artist: "Test Artist",
  imageSource: "https://test-api.vercel.app/test-piece.jpg",
  year: "2026",
  genre: "Abstract",
  colors: ["111", "#222", "333"],
  dimensions: { height: 100, width: 100, type: "cm" },
};

describe("ArtPiecePreview Component", () => {
  test("render image, title, artist and links to the details page", () => {
    render(
      <MemoryRouter>
        <ArtPiecePreview
          artPiece={mockPiece}
          artPiecesInfo={[]}
          onToggle={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Piece")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();

    const images = screen.getByRole("img");
    expect(images).toBeInTheDocument();
    expect(images).toHaveAttribute("alt", "Test Piece");

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/art-pieces/test-piece");
  });
});
