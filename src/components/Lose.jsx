import { NavLink, useOutletContext } from "react-router"

export default function Lose()
{
     const { ResetGame, RestartSameFactions } = useOutletContext()

    return(
        <div className="resolution-screen">
            <h1 className="scarlet">You lost</h1>
            <h2>The enemy broke through our line</h2>
            <p>Reset to go back to faction selection</p>
            <p>Restart to go back to faction selection with the same factions selected</p>
            <div className="bottom-buttons">
                <NavLink 
                    to="/organiser" 
                    onClick={() => RestartSameFactions()}
                    className="start-run">
                        Restart run
                </NavLink>
                <NavLink 
                    to="/" 
                    onClick={() => ResetGame()} 
                    className="start-run">
                        Reset
                </NavLink>
            </div>
        </div>
    )
}