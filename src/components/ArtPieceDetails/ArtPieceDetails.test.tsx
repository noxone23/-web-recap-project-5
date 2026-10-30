import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router";
import ArtPieceDetails from "./ArtPieceDetails";
import type { ArtPiece } from "../../types";

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
describe("ArtPieceDetails", () => {
    it("shows the details of an Art Piece", () => {
        render(
            <MemoryRouter initialEntries={["/art-pieces/test-piece"]}>
                    <Routes>
                   <Route 
                    path="/art-pieces/:slug"
                    element={<ArtPieceDetails 
                        pieces={mockPieces}
                        artPiecesInfo={[]}
                        onToggle={vi.fn()}
                        comments={[]}
                        onAddComment={vi.fn()}
                        />
                        }
                     /> 
                     </Routes>
                    </MemoryRouter>
            );
      

expect(screen.getByAltText("art piece image")).toBeTruthy();
expect(screen.getByText(/Unknown/)).toBeTruthy();
expect(screen.getByText(/2026/)).toBeTruthy();
expect(screen.getByText(/Abstract/)).toBeTruthy();
})
});