import React from 'react';
import { createBattleSlots } from '../components/Functions/Functions'
import { useOutletContext, useNavigate } from 'react-router'
import { waves } from '../Data/waveManager.js'
import { battleMechanics, createEnemyTeam, createBattleTeam } from '../components/Functions/BattleFunctions.jsx';

export default function Battle(){

    const navigate = useNavigate()

    const { 
        teamPlayer,
        selectedEnemyFaction,
        wave,
        setWallet,
        setWave,
        resetGame
    } = useOutletContext()

    const [battleTeam, setBattleTeam] = React.useState(() => {
        const newTeam = createBattleTeam(teamPlayer)
        return newTeam
    })

    const [enemyTeam, setEnemyTeam] = React.useState(() => {
        const newTeam = createEnemyTeam(
            waves[wave - 1],
            selectedEnemyFaction
        )
        return newTeam
    })

    React.useEffect(() => {

        let cancelled = false
        const sleep = ms => new Promise(r => setTimeout(r, ms))

        async function startBattle() {
            await sleep(2000)
            if (cancelled) return

            const result = await battleMechanics(
                battleTeam,
                enemyTeam,
                setBattleTeam,
                setEnemyTeam,
                () => cancelled
            )
            if (cancelled) return

            if (result === "lose") {
                resetGame();
                navigate("/");
                return
            }

            if (result === "win") {
                const reward = waves[wave - 1].gold

                setWallet(prev => prev + reward)
                setWave(prev => prev + 1)

                navigate("/Organiser")
            }
        }

        startBattle()
        return () => {
            cancelled = true
        }
    }, [])

    return(
        <>
            <h1>Battle Page</h1>

            <div className="character-container">

                {/* ENEMY: backline eerst, daarna frontline */}
                <div className="player-board">
                    <div className="character-board">
                        {createBattleSlots(
                            8,
                            [
                                ...enemyTeam.slice(4, 8),
                                ...enemyTeam.slice(0, 4)
                            ],
                            "enemy"
                        )}
                    </div>
                </div>

                {/* PLAYER: normale volgorde */}
                <div className="player-board">
                    <div className="character-board">
                        {createBattleSlots(8, battleTeam, "team")}
                    </div>
                </div>

            </div>
        </>
    )
}