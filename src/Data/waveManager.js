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

const waveBlueprints = [
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
    front: ["knight", "knight", "knight"],
    back: ["archer", "mage"],
    evolvedFront: 0,
    evolvedBack: 0,
  },
  {
    id: 6,
    gold: 6,
    front: ["knight", "knight", "rogue"],
    back: ["archer", "mage", "cleric"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 7,
    gold: 6,
    front: ["knight", "rogue", "knight"],
    back: ["archer", "mage", "cleric"],
    evolvedFront: 1,
    evolvedBack: 0,
  },
  {
    id: 8,
    gold: 7,
    front: ["knight", "rogue", "knight", "rogue"],
    back: ["archer", "mage", "cleric"],
    evolvedFront: 2,
    evolvedBack: 0,
  },
  {
    id: 9,
    gold: 7,
    front: ["knight", "rogue", "knight", "rogue"],
    back: ["mage", "archer", "cleric", "mage"],
    evolvedFront: 2,
    evolvedBack: 0,
  },
  {
    id: 10,
    gold: 9,
    front: ["knight", "paladin", "knight", "rogue"],
    back: ["mage", "mage", "cleric", "archer"],
    evolvedFront: 3,
    evolvedBack: 0,
  },
  {
    id: 11,
    gold: 9,
    front: ["paladin", "knight", "monk", "rogue"],
    back: ["mage", "archer", "cleric", "mage"],
    evolvedFront: 3,
    evolvedBack: 1,
  },
  {
    id: 12,
    gold: 9,
    front: ["paladin", "monk", "knight", "rogue"],
    back: ["mage", "archer", "cleric", "cleric"],
    evolvedFront: 3,
    evolvedBack: 1,
  },
  {
    id: 13,
    gold: 10,
    front: ["paladin", "monk", "paladin", "rogue"],
    back: ["mage", "archer", "cleric", "mage"],
    evolvedFront: 4,
    evolvedBack: 1,
  },
  {
    id: 14,
    gold: 10,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["mage", "summoner", "cleric", "archer"],
    evolvedFront: 4,
    evolvedBack: 2,
  },
  {
    id: 15,
    gold: 11,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "mage", "cleric", "summoner"],
    evolvedFront: 4,
    evolvedBack: 2,
  },
  {
    id: 16,
    gold: 11,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "mage", "summoner", "cleric"],
    evolvedFront: 4,
    evolvedBack: 3,
  },
  {
    id: 17,
    gold: 11,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "summoner", "mage", "cleric"],
    evolvedFront: 4,
    evolvedBack: 3,
  },
  {
    id: 18,
    gold: 12,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "summoner", "cleric", "mage"],
    evolvedFront: 4,
    evolvedBack: 4,
  },
  {
    id: 19,
    gold: 12,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "summoner", "summoner", "cleric"],
    evolvedFront: 4,
    evolvedBack: 4,
  },
  {
    id: 20,
    gold: 100,
    front: ["paladin", "monk", "paladin", "monk"],
    back: ["summoner", "summoner", "summoner", "summoner"],
    evolvedFront: 4,
    evolvedBack: 4,
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
