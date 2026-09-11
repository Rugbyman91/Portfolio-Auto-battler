import { NavLink } from "react-router"

export default function Win()
{
    return(
        <div className="resolution-screen">
            <h1 className="olive">Congratulations</h1>
            <div className="center">
                <h2>You have won the battle</h2>
                <p>We are safe for now, but a new army is already on the horizon</p>
            </div>
            <NavLink 
                to="/organiser"
                className="start-run">
                    Continue to next fight
            </NavLink>
        </div>
    )
}