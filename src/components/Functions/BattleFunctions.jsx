import { getCharacterById, getEvoCharacterById, factions } from '../../Data/Characters/characterManager'

export async function battleMechanics(
    playerTeam,
    enemyTeam,
    setPlayerTeam,
    setEnemyTeam,
    animateAttack,
    animateHit,
    isCancelled
) {
    let indexPlayer = 0;
    let indexEnemy = 0;

    do {
        indexPlayer = await attack(
            playerTeam,
            enemyTeam,
            indexPlayer,
            setEnemyTeam,
            animateAttack,
            animateHit,
            "team"
        );

        if (!enemyTeam.some(character => character !== null)) {
            return "win";
        }

        await PauseBattle()
        if (isCancelled()) { return "cancelled" }

        indexEnemy = await attack(
            enemyTeam,
            playerTeam,
            indexEnemy,
            setPlayerTeam,
            animateAttack,
            animateHit,
            "enemy"
        );

        if (!playerTeam.some(character => character !== null)) {
            return "lose";
        }

        await PauseBattle()
        if (isCancelled()) { return "cancelled" }

    } while (true);
}

async function attack(
    attackerTeam,
    defenderTeam,
    attackerIndex,
    setDefenderTeam,
    animateAttack,
    animateHit,
    attackerSource
) {
    const actualAttackerIndex = selectAttacker(
        attackerTeam,
        attackerIndex
    );

    if (actualAttackerIndex === null) {
        return 0;
    }

    const defenderIndex = selectDefender(defenderTeam);

    if (defenderIndex === null) {
        return 0;
    }

    await animateAttack(
        actualAttackerIndex,
        defenderIndex,
        attackerSource
    );

    await animateHit(
        defenderIndex,
        attackerSource
    );

    const attacker = attackerTeam[actualAttackerIndex];
    const defender = defenderTeam[defenderIndex];

    defender.hp -= attacker.strength;

    if (defender.hp <= 0) {
        defenderTeam[defenderIndex] = null;
    }

    setDefenderTeam([...defenderTeam]);

    return actualAttackerIndex + 1;
}

function selectAttacker(team, startIndex) {

    // Zoek van huidige positie tot einde
    for (let i = startIndex; i < 8; i++) {
        if (team[i] !== null) {
            return i;
        }
    }

    // Einde bereikt → opnieuw beginnen
    for (let i = 0; i < startIndex; i++) {
        if (team[i] !== null) {
            return i;
        }
    }

    return null;
}

function selectDefender(team) {

    // Eerst kijken naar de frontrow
    const livingFrontrow = team
        .slice(0, 4)
        .map((character, index) => {
            if (character !== null) {
                return index;
            }

            return null;
        })
        .filter(index => index !== null);

    // Als er frontrow characters zijn, kies daaruit
    if (livingFrontrow.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * livingFrontrow.length
        );

        return livingFrontrow[randomIndex];
    }

    // Frontrow is volledig dood → backrow
    const livingBackrow = team
        .slice(4, 8)
        .map((character, index) => {
            if (character !== null) {
                return index + 4;
            }

            return null;
        })
        .filter(index => index !== null);

    // Niemand meer
    if (livingBackrow.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * livingBackrow.length
    );

    return livingBackrow[randomIndex];
}

async function PauseBattle() {
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    await sleep(1000)
}
const factionOffsets = {
    human: 0,
    orc: 8,
    beast: 16, 
    undead: 24,
    dragon: 32,
    elf: 40,
    dwarf: 48
};

export function createEnemyTeam(wave, enemyFaction) {
    const offset = factionOffsets[enemyFaction];
    const enemyTeam = Array(8).fill(null);

    wave.enemies.forEach(enemy => {
        const characterId = enemy.character + offset;

        enemyTeam[enemy.position] = enemy.evolved
            ? getEvoCharacterById(characterId)
            : getCharacterById(characterId);
    });

    return enemyTeam;
}

export function getEnemyFaction(selectedFaction) {

    const availableFactions = factions.filter(
        faction => !selectedFaction.includes(faction)
    );

    const randomIndex = Math.floor(
        Math.random() * availableFactions.length
    );

    return availableFactions[randomIndex];
}

export function createBattleTeam(team) {
    return team.map(character =>
        character === null
            ? null
            : { ...character }
    )
}