const factionVariable = {
  human: 0,
  orc: 8,
  beast: 16,
  undead: 24,
  dragon: 32,
  elf: 40,
  dwarf: 48,
};
const classOrder = [
  "knight",
  "archer",
  "mage",
  "cleric",
  "rogue",
  "paladin",
  "monk",
  "summoner",
];

function getCharacterId(faction, className) {
  const offset = factionVariable[faction];
  const classIndex = classOrder.indexOf(className);

  if (offset === undefined || classIndex === -1) {
    throw new Error(
      `Cannot find character id for faction "${faction}" / class "${className}"`,
    );
  }
  return offset + classIndex + 1;
}

export const waveBlueprints = [
  {
    id: 1,
    gold: 4,
    front: ["knight"],
    back: [],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 2,
    gold: 4,
    front: ["knight", "knight"],
    back: [],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 3,
    gold: 4,
    front: ["knight", "knight"],
    back: ["archer"],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 4,
    gold: 5,
    front: ["knight", "knight"],
    back: ["archer", "mage"],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 5,
    gold: 5,
    front: ["knight"],
    back: ["archer", "mage"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 6,
    gold: 6,
    front: ["knight", "knight", "rogue"],
    back: ["archer", "mage", "cleric"],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 7,
    gold: 6,
    front: ["knight", "knight", "rogue"],
    back: ["archer", "mage", "cleric"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 8,
    gold: 7,
    front: ["knight", "knight", "rogue"],
    back: ["archer", "mage", "cleric", "mage"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 9,
    gold: 7,
    front: ["knight", "rogue"],
    back: ["archer", "mage", "cleric", "mage"],
    evolvedFront: 1,
    evolvedBack: 1,
  },
  {
    id: 10,
    gold: 9,
    front: ["knight", "rogue", "paladin"],
    back: ["archer", "mage", "cleric", "mage"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 11,
    gold: 9,
    front: ["knight", "rogue", "paladin"],
    back: ["archer", "mage", "cleric", "summoner"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 12,
    gold: 9,
    front: ["rogue", "monk", "paladin"],
    back: ["archer", "mage", "cleric", "summoner"],
    evolvedFront: 1,
    evolvedBack: 1,
  },
  {
    id: 13,
    gold: 10,
    front: ["rogue", "monk", "paladin", "paladin"],
    back: ["archer", "cleric", "summoner"],
    evolvedFront: 2,
    evolvedBack: 1,
  },
  {
    id: 14,
    gold: 10,
    front: ["monk", "paladin", "paladin"],
    back: ["archer", "cleric", "summoner", "summoner"],
    evolvedFront: 1,
    evolvedBack: 1,
  },
  {
    id: 15,
    gold: 11,
    front: ["monk", "monk", "paladin", "paladin"],
    back: ["cleric", "summoner", "summoner"],
    evolvedFront: 2,
    evolvedBack: 1,
  },
  {
    id: 16,
    gold: 11,
    front: ["monk", "monk", "paladin", "paladin"],
    back: ["cleric", "summoner", "summoner", "summoner"],
    evolvedFront: 2,
    evolvedBack: 1,
  },
  {
    id: 17,
    gold: 11,
    front: ["monk", "monk", "paladin", "paladin"],
    back: ["cleric", "summoner", "summoner", "summoner"],
    evolvedFront: 1,
    evolvedBack: 2,
  },
  {
    id: 18,
    gold: 12,
    front: ["monk", "paladin", "monk", "paladin"],
    back: ["cleric", "summoner", "mage", "summoner"],
    evolvedFront: 2,
    evolvedBack: 1,
  },
  {
    id: 19,
    gold: 12,
    front: ["monk", "paladin", "monk", "paladin"],
    back: ["cleric", "summoner", "mage", "summoner"],
    evolvedFront: 2,
    evolvedBack: 2,
  },
  {
    id: 20,
    gold: 100,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["cleric", "summoner", "mage", "summoner"],
    evolvedFront: 3,
    evolvedBack: 2,
  },
];

export function getWave(waveId, faction) {
  const blueprint = waveBlueprints.find((wave) => wave.id === waveId);

  if (!blueprint) {
    return null;
  }

  const enemies = [];

  blueprint.front.forEach((className, index) => {
    enemies.push({
      character: getCharacterId(faction, className),
      position: index,
      evolved: index < blueprint.evolvedFront,
    });
  });

  blueprint.back.forEach((className, index) => {
    enemies.push({
      character: getCharacterId(faction, className),
      position: 4 + index,
      evolved: index < blueprint.evolvedBack,
    });
  });

  return {
    id: blueprint.id,
    gold: blueprint.gold,
    enemies: enemies,
  };
}
