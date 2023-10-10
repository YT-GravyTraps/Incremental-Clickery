document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let baseClickValue = 1; // Base click value
    let clickValue = baseClickValue; // Initial click value
    let prestigePoints = 0;
    let prestigeThreshold = 1000; // Initial prestige threshold
    const scoreElement = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');
    const upgradeButtons = document.querySelectorAll('.upgrade-button');
    const prestigeButton = document.getElementById('prestigeButton');
    const prestigeCostElement = document.getElementById('prestigeCost')
    
     
    




    clickButton.addEventListener('click', () => {
        score += clickValue;
        updateScore();
    });

    upgradeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const cost = parseInt(button.getAttribute('data-cost'));
            const value = parseInt(button.getAttribute('data-value'));
            
            if (score >= cost) {
                score -= cost;
                clickValue += value; // Add the value to the clickValue
                updateScore();
                updateUpgradeCost(button, cost); // Update the upgrade cost
            }
        });
    });

    prestigeButton.addEventListener('click', () => {
        if (score >= prestigeThreshold) {
            prestige();
        }
    });

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateUpgradeCost(button, cost) {
        // Decrease the cost for the clicked upgrade
        cost *= 2; // You can adjust this logic as needed
        button.setAttribute('data-cost', cost);
        button.textContent = `Upgrade (Cost: ${cost})`;
    }

    function prestige() {
        prestigePoints++;
        score = 0;
        clickValue = baseClickValue*prestigePoints;
        prestigeThreshold *= 2; // Increase the prestige threshold
        updateScore();
        prestigeButton.textContent = `Prestige (${prestigePoints})`;
    
        // Update the prestige cost display
        prestigeCostElement.textContent = `Prestige Cost: ${prestigeThreshold}`;
    }
    

    // Initialize the game state, load saved data, etc.
    // You'll also need to handle saving and loading prestige points.
});
