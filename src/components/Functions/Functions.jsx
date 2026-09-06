export function createSlots(amount, team, source, handleDragStart, handleDrop, setSelectedCharacter) {
    return Array.from({ length: amount }, (_, index) => {
        const character = team[index]

        return (
            <div
                key={`${index}-${source}`}
                className={`character-slot ${
                character? character.evolved ? "evolved" : "normal" : ""}`} 
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index, source)}
            >
                {character && (
                    <div>
                        <h4>{character.name}</h4>

                        <div
                            className="card"
                            data-index={index}
                            data-source={source}
                            draggable
                            onDragStart={() =>
                                handleDragStart(index, source)
                            }
                            onClick={() => setSelectedCharacter(character)}
                        >
                            <img
                                src={character.image}
                                alt={character.name}
                            />
                        </div>

                        <div className="card-details">
                            <span className="hp">{character.hp}</span>
                            {source === "shop" && (
                                <span className="gold">{character.price}</span>
                            )}
                            <span className="strength">{character.strength}</span>
                        </div>
                    </div>
                )}
            </div>
        )
    })
}

export function createBattleSlots(amount, team, source, indexes) {
    return Array.from({ length: amount }, (_, index) => {
        const character = team[index]
        const originalIndex = indexes[index]
        console.log(character?.name, character?.evolved)

        return (
            <div
                key={`${index}-${source}`}
                className={`character-slot ${
                character? character.evolved ? "evolved" : "normal" : ""}`}
                data-index={originalIndex}
                data-source={source}
            >
                {character && (
                    <>
                        <h4>{character.name}</h4>

                        <div
                            className="card"
                        >
                            <img
                                src={character.image}
                                alt={character.name}
                            />
                        </div>

                        <div className="card-details">
                            <span className="hp">{character.hp}</span>
                            <span className="strength">{character.strength}</span>
                        </div>
                    </>
                )}
            </div>
        )
    })
}
