import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Navigation from "./Navigation";

test("renders all navigation links correctly with their text", () => {
    render(
  <MemoryRouter>
    <Navigation />
  </MemoryRouter>
);
const spotlightLink = screen.getByRole("link", { name: /spotlight/i });
const galleryLink = screen.getByRole("link", { name: /gallery/i });
const favoritesLink = screen.getByRole("link", { name: /favorites/i });

expect(spotlightLink).toBeInTheDocument();
expect(galleryLink).toBeInTheDocument();
expect(favoritesLink).toBeInTheDocument();
});

test("checks if the links point to the correct URLs", () =>{
    render(
  <MemoryRouter>
    <Navigation />
  </MemoryRouter>
);

expect(screen.getByRole("link", { name: /spotlight/i })).toHaveAttribute("href", "/");
expect(screen.getByRole("link", { name: /gallery/i })).toHaveAttribute("href", "/art-pieces");
expect(screen.getByRole("link", { name: /favorites/i })).toHaveAttribute("href", "/favorites");
});

test ("simulates clicking the links and highlights the active one", async () => {
    const user = userEvent.setup();

    render(
  <MemoryRouter>
    <Navigation />
  </MemoryRouter>
);

const galleryLink = screen.getByRole("link", { name: /gallery/i});

await user.click(galleryLink);

expect(galleryLink).toHaveAttribute("aria-current", "page");
});
/*fix*/