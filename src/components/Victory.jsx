import { NavLink, useOutletContext } from "react-router"

export default function Victory()
{
     const { ResetGame, RestartSameFactions } = useOutletContext()

    return(
        <div className="resolution-screen">
            <h1>Victory</h1>
            <h2>You have held the line againt 20 waves of enemies</h2>
            <p>Restart run to restart with the same factions</p>
            <p>Reset to go back to faction selection</p>
            <div className="bottom-buttons">
                <NavLink 
                    to="/Organiser" onClick={() => RestartSameFactions()}
                    className="start-run">
                        Restart run
                </NavLink>
                <NavLink 
                    to="/" onClick={() => ResetGame()}
                    className="start-run">
                        Reset
                </NavLink>
            </div>
        </div>
    )
}