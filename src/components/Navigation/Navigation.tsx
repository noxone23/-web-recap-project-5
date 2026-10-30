import { NavLink } from "react-router";

import logo from "../Navigation/logo.png"
export default function Navigation() {
    return (
        <nav>
             <div className="gallery-logo"><img src={logo}/></div>
            <NavLink to="/" end>
            Spotlight
            </NavLink>

             <NavLink to="/art-pieces">
            Art Pieces
            </NavLink>

             <NavLink to="/favorites">
            Favorites
            </NavLink>
        </nav>
    );
}