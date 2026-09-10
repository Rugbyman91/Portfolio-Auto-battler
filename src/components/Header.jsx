import { NavLink } from "react-router"

export default function Header({ resetGame }){
    
    return(
        <header>
            <NavLink
                to="/" className="game-title"
                onClick={() => resetGame()}>
                    Hold the line
            </NavLink>
        </header>
    )
}