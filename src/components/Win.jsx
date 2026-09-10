import { NavLink } from "react-router"

export default function Win()
{
    return(
        <div className="resolution-screen">
            <h1>Congratulations</h1>
            <h2>You have won the battle</h2>
            <p>We are safe for now, but a new army is already on the horizon</p>
            <NavLink 
                to="/Organiser"
                className="start-run">
                    Continue to next fight
            </NavLink>
        </div>
    )
}