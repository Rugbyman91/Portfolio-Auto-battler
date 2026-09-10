import { Navigate, Outlet, useOutletContext } from "react-router"

export function ShopProtection() {
    const context = useOutletContext()

    const { selectedFaction } = context
    console.log("ShopProtection:", selectedFaction)

    if (selectedFaction.length === 0) {
        return <Navigate to="/" replace />
    }

    return <Outlet context={context} />
}

export function BattleProtection() {

    const context = useOutletContext()
    const { selectedEnemyFaction, teamPlayer, ignoreBattleProtection } = context

    const hasTeam = teamPlayer.some(character => character !== null)

    if (selectedEnemyFaction === null || (!hasTeam && !ignoreBattleProtection)) {
        return <Navigate to="/" replace />
    }

    return <Outlet context={context} />
}