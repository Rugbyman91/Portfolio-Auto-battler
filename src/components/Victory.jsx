import { NavLink, useOutletContext } from "react-router"

export default function Victory()
{
     const { ResetGame, RestartSameFactions } = useOutletContext()

    return(
        <div className="resolution-screen">
            <h1 className="goldenrod">Victory</h1>
            <h2>You have held the line againt 20 waves of enemies</h2>
            <p>Reset to go back to faction selection</p>
            <p>Restart run to start back from the shop with the same factions (you & enemy)</p>
            <div className="bottom-buttons2">
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