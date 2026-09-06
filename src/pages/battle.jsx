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
    const battleBoardRef = React.useRef(null)
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
    
    async function animateAttack(attackerIndex, defenderIndex, source) {

        const attacker = battleBoardRef.current.querySelector(
            `[data-index="${attackerIndex}"][data-source="${source}"]`
        )

        const defenderSource = source === "team" ? "enemy" : "team"

        const defender = battleBoardRef.current.querySelector(
            `[data-index="${defenderIndex}"][data-source="${defenderSource}"]`
        )
        if (!attacker || !defender) {
            return
        }

        const attackerRect = attacker.getBoundingClientRect()
        const defenderRect = defender.getBoundingClientRect()

        const dx = (defenderRect.left - attackerRect.left) * 0.90
        const dy = (defenderRect.top - attackerRect.top) * 0.90

        const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90

        attacker.style.setProperty("--move-x", `${dx}px`)
        attacker.style.setProperty("--move-y", `${dy}px`)
        attacker.style.setProperty("--angle", `${angle}deg`)

        attacker.classList.add("attacking")

        await new Promise(resolve => {
            setTimeout(resolve, 400)
        })

        attacker.classList.remove("attacking")
    }
    async function animateHit(defenderIndex, source) {

        const defenderSource = source === "team" ? "enemy" : "team"

        const defender = battleBoardRef.current.querySelector(
            `[data-index="${defenderIndex}"][data-source="${defenderSource}"]`
        )

        defender.classList.add("hit")

        await new Promise(resolve => {
            setTimeout(resolve, 300)
        })

        defender.classList.remove("hit")
    }

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
                animateAttack,
                animateHit,
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

            </div>
        </>
    )
}