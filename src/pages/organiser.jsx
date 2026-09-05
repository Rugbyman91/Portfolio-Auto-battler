import React from 'react';
import { useOutletContext, Link } from 'react-router'
import { createSlots } from '../components/Functions/Functions'
import { getCharacterById, getEvoCharacterById, baseCharacters } from '../Data/Characters/characterManager'

export default function Organiser(){

    const { teamPlayer, benchPlayer, setTeamPlayer, setBenchPlayer, selectedFaction, wallet, setWallet, tier, setTier } = useOutletContext();
    const [selectedCharacter, setSelectedCharacter] = React.useState(null)

    const [ draggedId, setDraggedId ] = React.useState(null);
    const [ shopCharacters, setShopCharacters] = React.useState([])
    
    function rerollShop() {
        const factionCharacters = baseCharacters.filter(
        character =>
            selectedFaction.includes(character.race) &&
            character.tier <= tier
        );
        const options = []

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor( Math.random() * factionCharacters.length )
            options.push(factionCharacters[randomIndex])
        }
        setShopCharacters(options)
    }
    function handleDragStart(index, source) {setDraggedId({index: index, source: source})}
    function handleDrop(targetIndex, targetSource) {

        const sourceIndex = draggedId.index
        const source = draggedId.source

        // SHOP -> TEAM / BENCH
        if ( source === "shop" &&
            (targetSource === "team" || targetSource === "bench") &&
            wallet >= shopCharacters[sourceIndex].price) {
            const character = getCharacterById(shopCharacters[sourceIndex].id)
            const targetArray = getArray(targetSource)

            if (targetArray[targetIndex] != null) {
                return
            }

            targetArray[targetIndex] = character

            const newShop = [...shopCharacters]
            newShop[sourceIndex] = null

            setShopCharacters(newShop)

            if (targetSource === "team") {
                checkUpgrade(character.id, targetArray, benchPlayer)
                setTeamPlayer(targetArray)
            } else {
                checkUpgrade(character.id, teamPlayer, targetArray)
                setBenchPlayer(targetArray)
            }

            setDraggedId(null)
            setWallet(wallet - character.price)

            return
        }


        // TEAM / BENCH -> SHOP = DELETE
        if (
            targetSource === "shop" &&
            (source === "team" || source === "bench")
        ) {
            const sourceArray = getArray(source)
            setWallet(wallet + sourceArray[sourceIndex].sellValue)
            sourceArray[sourceIndex] = null

            if (source === "team") {
                setTeamPlayer(sourceArray)
            } else {
                setBenchPlayer(sourceArray)
            }

            setDraggedId(null)
            return
        }


        // TEAM / BENCH -> TEAM / BENCH
        if (
            (source === "team" || source === "bench") &&
            (targetSource === "team" || targetSource === "bench")
        ) {
            const sourceArray = getArray(source)
            const targetArray = source === targetSource
                ? sourceArray
                : getArray(targetSource)

            const draggedCharacter = sourceArray[sourceIndex]
            const targetCharacter = targetArray[targetIndex]

            // Verplaatsen naar lege slot
            if (targetCharacter == null) {
                sourceArray[sourceIndex] = null
                targetArray[targetIndex] = draggedCharacter
            }

            // Swappen
            else {
                sourceArray[sourceIndex] = targetCharacter
                targetArray[targetIndex] = draggedCharacter
            }

            if (source === targetSource) {
                if (source === "team") {
                    setTeamPlayer(sourceArray)
                } else {
                    setBenchPlayer(sourceArray)
                }
            } else {
                if (source === "team") {
                    setTeamPlayer(sourceArray)
                    setBenchPlayer(targetArray)
                } else {
                    setBenchPlayer(sourceArray)
                    setTeamPlayer(targetArray)
                }
            }

            setDraggedId(null)
            return
        }

        setDraggedId(null)
    } 
    function getArray(source) {
        if (source === "team") return [...teamPlayer]
        if (source === "bench") return [...benchPlayer]
        if (source === "shop") return [...shopCharacters]
    } 
   function checkUpgrade(characterId, newTeam, newBench) {

        const upgradedCharacter = getEvoCharacterById(characterId)
        const teamMatches = newTeam
            .map((character, index) => 
                character?.id === characterId && !character.evolved
                ? index : null
            )
            .filter(index => index !== null)

        const benchMatches = newBench
            .map((character, index) => 
                character?.id === characterId && !character.evolved
                ? index : null
            )
            .filter(index => index !== null)

        const count = teamMatches.length + benchMatches.length

        if (count >= 3) {

            const firstInstance = teamMatches[0] === undefined ? benchMatches[0] : teamMatches[0]

            if (teamMatches[0] === undefined) {
                newBench[firstInstance] = upgradedCharacter
            } else {
                newTeam[firstInstance] = upgradedCharacter
            }
            // Overige team characters verwijderen
            teamMatches.forEach(index => {
                if (!(teamMatches[0] === index && teamMatches[0] === firstInstance)) {
                    newTeam[index] = null
                }
            })

            // Overige bench characters verwijderen
            benchMatches.forEach(index => {
                if (!(teamMatches[0] === undefined && benchMatches[0] === index)) {
                    newBench[index] = null
                }
            })
        }
    }

    React.useEffect(() => {
        rerollShop()
    }, [])

    return(
        <>
            <h1 className="indent">Shop Page</h1>
            {selectedCharacter && (
                <div
                    className="overlay" 
                    onClick={() => setSelectedCharacter(null)}
                >
                    <div
                        className={`character-detail ${
                            selectedCharacter? selectedCharacter.evolved ? "evolved" : "normal" : ""}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2>{selectedCharacter.name}</h2>
                        <img
                            src={selectedCharacter.detailImage}
                            alt={selectedCharacter.name}
                        />
                        <p>Class: {selectedCharacter.class}</p>
                    </div>
                </div>
            )}
            <div className="character-container">
                <div className="character-options"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleDrop(null, "shop")}
                >
                    <div className='placeholder' />
                    {createSlots(3, shopCharacters, "shop", handleDragStart, handleDrop, setSelectedCharacter)}
                    <img src='/images/retry.png' onClick={() => rerollShop()}/>
                    <span className="wallet">Wallet: {wallet} <img src='/images/gold.png' alt='Gold' /></span>
                </div>
                <div className="player-board">
                    <div className="character-board">
                        {createSlots(8, teamPlayer, "team", handleDragStart, handleDrop, setSelectedCharacter)}
                    </div>
                </div>
                <div className="character-options">
                    {createSlots(5, benchPlayer, "bench", handleDragStart, handleDrop, setSelectedCharacter)}
                    
                </div>
                {teamPlayer.some(character => character !== null) && <Link to="/Battle" className="start-battle">Start Battle</Link>}
            </div>
            
        </>
    )
}