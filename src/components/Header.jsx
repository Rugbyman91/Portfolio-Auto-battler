import { NavLink } from "react-router"

export default function Header({ resetGame }){
    const activeStyles = {
        color: "#161616",
        textDecoration: "underline",
        fontWeight: "bold"
    }

    return(
        <header>
            <h1 className="game-title">Hold the line</h1>
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
                        TBA
                </NavLink>
                <NavLink 
                    to="/battle" className="nav-button"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        TBA
                </NavLink>              
            </nav>
        </header>
    )
}