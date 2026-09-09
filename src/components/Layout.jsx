import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { getEnemyFaction } from "./Functions/BattleFunctions"

export default function Layout(){

    const startingAmount = 4;
    const standardAmountFactions = 2;
    const startingWave = 1;

    const [teamPlayer, setTeamPlayer] = React.useState([ null, null, null, null, null, null, null, null ])
    const [benchPlayer, setBenchPlayer] = React.useState([ null, null, null, null, null ])
    const [selectedEnemyFaction, setSelectedEnemyFaction] = React.useState(null)
    const [wallet, setWallet] = React.useState(startingAmount)
    const [wave, setWave] = React.useState(startingWave)
    const [selectedFaction, setSelectedFaction] = React.useState([])    
    const [amountOfFactions, setAmountOfFactions] = React.useState(standardAmountFactions);
    const tier = getTier(wave)
    

    function resetGame(){
        setTeamPlayer([null, null, null, null, null, null, null, null])
        setBenchPlayer([null, null, null, null, null])
        setSelectedFaction([])
        setSelectedEnemyFaction(null)
        setAmountOfFactions(standardAmountFactions)
        setWallet(startingAmount)
        setWave(startingWave)
    }

    function getTier(wave){
        if (wave <= 4) return 1;
        if (wave <= 8) return 2;
        if (wave <= 12) return 3;
        return 4;
    }

    function ConfirmFaction(factions){
        setSelectedEnemyFaction(getEnemyFaction(factions))
    }

    return(
        <div className="layout">
            <Header resetGame={resetGame} />
            <main>
                <Outlet context={{
                    teamPlayer,
                    benchPlayer,
                    setTeamPlayer,
                    setBenchPlayer,
                    selectedFaction,
                    setSelectedFaction,
                    selectedEnemyFaction,
                    setSelectedEnemyFaction,
                    amountOfFactions,
                    setAmountOfFactions,
                    wallet,
                    setWallet,
                    tier,
                    wave,
                    setWave,
                    ConfirmFaction,
                    resetGame
                }} />
            </main>
            <Footer />
        </div>
    )
}