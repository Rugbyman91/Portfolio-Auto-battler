import {
  baseSellValue,
  evoSellValue,
  basePrice,
  classStats,
  raceModifiers,
  characterDefenitions,
} from "../Characters/testData";

function generatedStats(className, race, evolved) {
  const classData = classStats[className];
  const raceData = raceModifiers[race];

  const baseHp = evolved ? classData.evoHp : classData.hp;
  const baseStrength = evolved ? classData.evoStrength : classData.strength;

  return {
    hp: Math.round(baseHp * raceData.hpMult),
    strength: Math.round(baseStrength * raceData.strMult),
    price: evolved ? undefined : basePrice[classData.tier] + raceData.priceMod,
    tier: classData.tier,
  };
}
export const baseCharacters = characterDefenitions.map((char) => {
  const stats = generatedStats(char.class, char.race, false);
  return {
    id: char.id,
    name: char.name,
    race: char.race,
    class: char.class,
    hp: stats.hp,
    strength: stats.strength,
    price: stats.price,
    tier: stats.tier,
    sellValue: baseSellValue,
    evolved: false,
    image: char.image,
    detailImage: char.detailImage,
  };
});

export const evolutionCharacters = characterDefenitions.map((char) => {
  const stats = generatedStats(char.class, char.race, true);
  return {
    id: char.id,
    name: char.evoName,
    race: char.race,
    class: char.class,
    hp: stats.hp,
    strength: stats.strength,
    sellValue: evoSellValue,
    evolved: true,
    image: char.evoImage,
    detailImage: char.evoDetailImage,
  };
});

export const factions = [
  "human",
  "elf",
  "dwarf",
  "orc",
  "beast",
  "undead",
  "dragon",
];

export function getCharacterById(id) {
  const character = baseCharacters.find((character) => character.id === id);

  if (!character) {
    return null;
  }

  return { ...character };
}

export function getEvoCharacterById(id) {
  const character = evolutionCharacters.find(
    (character) => character.id === id,
  );

  return character ? { ...character } : null;
}
