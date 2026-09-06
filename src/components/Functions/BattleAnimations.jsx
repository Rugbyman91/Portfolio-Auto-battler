export async function animateAttack(attackerIndex, defenderIndex, source, battleBoardRef, battleSpeed) {
    const speed = battleSpeed.current
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

    const dx = (defenderRect.left - attackerRect.left) * 0.85
    const dy = (defenderRect.top - attackerRect.top) * 0.85

    const angle = Math.atan2(dy, dx) * 180 / Math.PI + (source === "team" ? 90 : -90)

    attacker.style.setProperty("--move-x", `${dx}px`)
    attacker.style.setProperty("--move-y", `${dy}px`)
    attacker.style.setProperty("--angle", `${angle}deg`)

    attacker.classList.add("attacking")

    await new Promise(resolve => {
        setTimeout(resolve, 400 * speed)
    })

    attacker.classList.remove("attacking")
}

export async function animateHit(defenderIndex, source, battleBoardRef, battleSpeed) {

    const speed = battleSpeed.current
    const defenderSource = source === "team" ? "enemy" : "team"

    const defender = battleBoardRef.current.querySelector(
        `[data-index="${defenderIndex}"][data-source="${defenderSource}"]`
    )

    defender.classList.add("hit")

    await new Promise(resolve => {
        setTimeout(resolve, 300 * speed)
    })

    defender.classList.remove("hit")
}