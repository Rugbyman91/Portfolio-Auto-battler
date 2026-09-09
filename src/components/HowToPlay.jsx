export default function HowToPlay(){
    return(
        <div className="HowToPlay">
            <h1>How to play</h1>

            <img src="../../public/HowToPlay/FactionScreen.png" alt="factionScreen" className="HowToPlay-image"/>

                <p>
                    <span className="red">Amount of factions:</span> With these buttons you can increase or decrease the amount of factions you would
                    like to take on your journey.
                    </p>
                <p>
                    <span className="purple">The factions:</span> Here you can choose which factions to take with you.
                </p>
                <p>
                    <span className="green">Start run:</span> When you have selected the right amount of factions, this button will appear and you will
                    be able to start your journey.
                </p>
                <p>---------------------------------------------------------------------------------------------------</p>

                <div className="card-explaination">
                    <img src="../../public/HowToPlay/card-detail.png" alt="factionScreen" />
                    <div>
                        <p><span className="red">Hp:</span> These are the health points of a unit</p>
                        <p><span className="yellow">Gold:</span> This is the cost of a unit in the shop</p>
                        <p><span className="purple">Strength:</span> This is the strength points of a unit</p>
                    </div>
                </div>
                <p>---------------------------------------------------------------------------------------------------</p>

            <img src="../../public/HowToPlay/ShopScreen.png" alt="factionScreen" className="HowToPlay-image"/>

                <p>

                    <span className="purple">Your wallet:</span> This will tell you how many coins you have now.
                    </p>
                <p>
                    <span className="red">The Shop options:</span> Here you can see the untis that are on sale, you buy them by dragging them into your
                    army-space* or on your bench*.
                    When you own 3 of the same base unit, they will combine into a stronger evolved unit.
                </p>
                <p>
                    <span className="green">Reroll button:</span> With this button you can change the units that are available for sale. Your first reroll
                    every round will be free, the next ones will cost you 1 coin. A reroll will always give you 3 new options.
                </p>
                <p>*The next part will explain more on the army-space and bench</p>

            <img src="../../public/HowToPlay/ShopScreen2.png" alt="factionScreen" className="HowToPlay-image"/>
            
                <p>

                    <span className="red">The Army-space:</span> These units in this formation will come with you to fight the next battle. The top
                    row is the Frontline, the bottom row is the Backline.
                    </p>
                <p>
                    <span className="green">The Bench:</span> Here you can store interesting units that you don't want to take into battle with you
                    yet.
                </p>
                <p>
                    <span className="orange">Start battle:</span> When you are done buying units and modifying your formation, you can click this
                    button to start the battle against the next wave of enemies.
                </p>

            <img src="../../public/HowToPlay/BattleScreen.png" alt="factionScreen" className="HowToPlay-image"/>
            
                <p>

                    <span className="green">Enemy Army-space:</span> This will be the enemy army to figth this wave.
                </p>
                
                <p>
                    <span className="orange">Speed up:</span> With these buttons you can control the battle speed. The speed of the battle has no
                    influence on the outcome of the fight.
                </p>
                <p>---------------------------------------------------------------------------------------------------</p>

            <h1>Rules of combat</h1>
                <ul>
                    <li>Player and enemy take turns attacking, the player will always start the battle.</li>
                    <li>Attacking: first the Frontrow attacks from left to right, aftwerwards the Backrow will attack in the same fashion.</li>
                    <li>Defending: The Frontrow has to be defeated first, before units can start targeting the Backrow.</li>
                    <li>Only a defending unit loses health, the attacking units does not.</li>
                    <li>The battle resolves automatically, units will target eachother at random.</li>
                    <li>Returning to the Homepage will reset all progress.</li>
                    <li>Having fun is encouraged, but at your own discretion, of course.</li>
                </ul>
                <p>Enjoy my game!</p>
                <p>*Click anywhere to close this window*</p>
        </div>
    )
}