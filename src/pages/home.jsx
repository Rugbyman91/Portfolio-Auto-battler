import { NavLink, useOutletContext, useNavigate } from "react-router"
import { factions } from "../Data/Characters/characterManager";
import '../App.css'

function App() {

        const navigate = useNavigate();
        const { setTeamPlayer, setBenchPlayer, selectedFaction, setSelectedFaction, setSelectedEnemyFaction, 
                amountOfFactions, setAmountOfFactions, ConfirmFaction } = useOutletContext();

        function selectFaction(faction){
                let newFaction = null
                if(selectedFaction.includes(faction)) newFaction = selectedFaction.filter(item => (item !== faction))
                else newFaction = [...selectedFaction, faction]
                if(newFaction.length <= amountOfFactions) { setSelectedFaction(newFaction)}
        }
        function lowerAmountOfFactions(){
                if(amountOfFactions > 1){
                        setAmountOfFactions(amountOfFactions - 1)
                }
                if(selectedFaction.length > amountOfFactions - 1 && amountOfFactions > 1){
                        const newFaction = selectedFaction.slice(0, amountOfFactions - 1)
                        setSelectedFaction(newFaction)
                }
        }  
        function chosenFactionElements() {
                return selectedFaction.map(element => (
                        <span 
                                className={element} key={element}
                                onClick={() => selectFaction(element)}>
                        {element}
                        </span>
                ));
                }
        return (
        <>
        <div className="home-background">
                <h1>Select your factions</h1>
                <div className="chosen-faction-container">
                        <p>
                        Select {amountOfFactions} factions to start your run{selectedFaction.length < 1 ? "." : ":"}
                        </p>
                        {selectedFaction.length > 0 && chosenFactionElements()}
                </div>
                <div className="faction-amount">
                        <button>-</button>
                        <span>{selectedFaction.length} / {amountOfFactions}</span>
                        <button onClick={() => amountOfFactions < 5 ? setAmountOfFactions(amountOfFactions + 1) : null}>+</button>
                </div>
                        
                </div>
                <nav className="faction-navigation">

                        {factions.map(faction => (
                        <button
                                key={faction}
                                className={`nav-button ${
                                selectedFaction?.includes(faction)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => selectFaction(faction)}
                        >
                                {faction}
                        </button>
                        ))}

                </nav>
                {selectedFaction.length === amountOfFactions && (
                <NavLink
                        to="/Organiser"
                        className="start-run"
                        onClick={() => {
                        setTeamPlayer([null, null, null, null, null, null, null, null])
                        setBenchPlayer([null, null, null, null, null])
                        ConfirmFaction(selectedFaction)
                        }}
                >
                        Start Run
                </NavLink>
                )}
        </>
        )
}

export default App
