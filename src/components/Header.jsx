import { NavLink } from "react-router"

export default function Header({ resetGame }){
    const activeStyles = {
        color: "#161616",
        textDecoration: "underline",
        fontWeight: "bold"
    }

    return(
        <header>
            <NavLink
                to="/" className="game-title"
                onClick={() => resetGame()}>
                    Hold the line
            </NavLink>
            <nav>
                <NavLink 
                    to="/" className="nav-button"
                    onClick={() => resetGame()}
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Home
                </NavLink>
                <NavLink 
                    to="/" className="nav-button"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Shop
                </NavLink>
                <NavLink 
                    to="/battle" className="nav-button"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Battle
                </NavLink>              
            </nav>
        </header>
    )
}