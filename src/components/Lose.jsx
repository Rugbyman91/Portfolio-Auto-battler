import { NavLink, useOutletContext } from "react-router"

export default function Lose()
{
     const { ResetGame, RestartSameFactions } = useOutletContext()

    return(
        <div className="resolution-screen">
            <h1 className="red">You lost</h1>
            <h2>The enemy broke through our line</h2>
            <p>Restart run to try with the same factions</p>
            <p>Reset to go back to faction selection</p>
            <div className="bottom-buttons">
                <NavLink 
                    to="/Organiser" 
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