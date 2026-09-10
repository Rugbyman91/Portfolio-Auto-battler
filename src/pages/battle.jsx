import React from 'react';
import { createBattleSlots } from '../components/Functions/Functions'
import { useOutletContext, useNavigate } from 'react-router'
import { getWave } from '../Data/waveManager.js'
import { battleMechanics, createEnemyTeam, createBattleTeam } from '../components/Functions/BattleFunctions.jsx';
import { animateAttack, animateHit } from '../components/Functions/BattleAnimations.jsx'
import Lost from "../components/Lose.jsx"
import Won from "../components/Win.jsx"
import Victory from "../components/Victory.jsx"

export default function Battle(){
    
    const { 
        teamPlayer,
        selectedEnemyFaction,
        wave,
        setWallet,
        setWave
    } = useOutletContext()
    const currentWave = getWave(wave, selectedEnemyFaction)
    const battleBoardRef = React.useRef(null)
    const [battleTeam, setBattleTeam] = React.useState(() => {
        const newTeam = createBattleTeam(teamPlayer)
        return newTeam
    })
    const [enemyTeam, setEnemyTeam] = React.useState(() => {
        return createEnemyTeam(currentWave)
    })
    const [lost, setLost] = React.useState(false)
    const [won, setWon] = React.useState(false)
    const [victorious, setVictorious] = React.useState(false)

    const battleSpeed = React.useRef(1)
    
    function changeSpeed(speed) {
        battleSpeed.current = speed
    }

    React.useEffect(() => {

        //setLost(false); setWon(false); setVictorious(false);   Test zonder

        let cancelled = false
        const sleep = ms => new Promise(r => setTimeout(r, ms))

        async function startBattle() {
            await sleep(1500)
            if (cancelled) return

            const result = await battleMechanics(
                battleTeam,
                enemyTeam,
                setBattleTeam,
                setEnemyTeam,
                animateAttack,
                animateHit,
                battleBoardRef,
                battleSpeed,
                () => cancelled
            )
            if (cancelled) return

            if (result === "lose") {
                setLost(true);
                return
            }

            if (result === "win" && wave < 20) {
                const reward = currentWave.gold

                setWallet(prev => prev + reward)
                setWave(prev => prev + 1)

                setWon(true)
                return
            }

            if (result === "win" && wave === 20) {
                setVictorious(true)
                return
            }
        }

        startBattle()
        return () => {
            cancelled = true
        }
    }, [])

    return(
        <>
            {
                lost && <div className='overlay'>
                    <Lost />
                </div>
            }{
                won && <div className='overlay'>
                    <Won />
                </div>
            }{
                victorious && <div className='overlay'>
                    <Victory />
                </div>
            }
            <h1>Battle Page</h1>

            <div className="character-container" ref={battleBoardRef}>

                {/* ENEMY: backline eerst, daarna frontline */}
                <div className="player-board">
                    <div className="character-board">
                        {createBattleSlots(
                            8,
                            [
                                ...enemyTeam.slice(4, 8),
                                ...enemyTeam.slice(0, 4)
                            ],
                            "enemy",
                            [4, 5, 6, 7, 0, 1, 2, 3]
                        )}
                    </div>
                </div>

                {/* PLAYER: normale volgorde */}
                <div className="player-board">
                    <div className="character-board">
                        {createBattleSlots(
                            8,
                            battleTeam,
                            "team",
                            [0, 1, 2, 3, 4, 5, 6, 7]
                        )}
                    </div>
                </div>
                <div className='battle-speed'>
                    <button onClick={() => changeSpeed(1)}>1x</button>
                    <button onClick={() => changeSpeed(0.5)}>2x</button>
                    <button onClick={() => changeSpeed(0.33)}>3x</button>
                </div>
            </div>
        </>
    )
}