import React from "react"
import { Outlet, redirect } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { getEnemyFaction } from "./Functions/BattleFunctions"

export default function Layout(){

    const startingAmount = 5000;
    const standardAmountFactions = 2;
    const startingWave = 20;

    const [teamPlayer, setTeamPlayer] = React.useState([ null, null, null, null, null, null, null, null ])
    const [benchPlayer, setBenchPlayer] = React.useState([ null, null, null, null, null ])
    const [selectedEnemyFaction, setSelectedEnemyFaction] = React.useState(null)
    const [wallet, setWallet] = React.useState(startingAmount)
    const [wave, setWave] = React.useState(startingWave)
    const [selectedFaction, setSelectedFaction] = React.useState([])    
    const [amountOfFactions, setAmountOfFactions] = React.useState(standardAmountFactions);
    const [ignoreBattleProtection, setIgnoreBattleProtection] = React.useState(false)
    const tier = getTier(wave)
    

    function RestartSameFactions(){
        setTeamPlayer([null, null, null, null, null, null, null, null])
        setBenchPlayer([null, null, null, null, null])
        setWallet(startingAmount)
        setWave(startingWave)
    }

    function ResetGame(){
        RestartSameFactions()
        setSelectedEnemyFaction(null)
        setAmountOfFactions(standardAmountFactions)
        setSelectedFaction([])
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
            <Header resetGame={ResetGame} />
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
                    ResetGame,
                    RestartSameFactions,
                    ignoreBattleProtection,
                    setIgnoreBattleProtection
                }} />
            </main>
            <Footer />
        </div>
    )
}