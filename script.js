document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let baseClickValue = 1; // Base click value
    let clickValue = baseClickValue; // Initial click value
    let prestigePoints = 0;
    let prestigeThreshold = 1000; // Initial prestige threshold
    let baseUpgradeCost = [20, 250, 2000, 50000, 1e6, 2e10, 1e14, 7e18, 3e24, 7e35];
    let baseUpgradeEffect = [2, 5, 75, 1000, 25000, 500000, 7e7, 1e11, 1e17, 1e28];
    let upgradeCount = [];
    
    let upgradeButtons = [];

    const scoreElement = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');
    const prestigeButton = document.getElementById('prestigeButton');
    const prestigeCostElement = document.getElementById('prestigeCost');

    clickButton.addEventListener('click', () => {
        score += clickValue;
        updateUI();
    });

    function upgradeCost(k) {
        return baseUpgradeCost[k]*Math.pow(2, upgradeCount[k]);
    }
    
    function upgradeEffect(k) {
        return baseUpgradeEffect[k]*(1+prestigePoints);
    }

    for (i = 0; i < baseUpgradeCost.length; i++) {
        let button = document.createElement("button");
        let k = i;
        button.setAttribute("class", "upgrade-button");
        button.addEventListener('click', () => {
            const cost = upgradeCost(k);
            const value = upgradeEffect(k);
            //console.log(k);
            
            if (score >= cost) {
                upgradeCount[k]++;
                score -= cost;
                clickValue += value; // Add the value to the clickValue
                updateUI();
            }
        });
        upgradeButtons[i] = button;
        upgradeCount[i] = 0;
        document.getElementById("upgrades").appendChild(button);
    }

    prestigeButton.addEventListener('click', () => {
        if (score >= prestigeThreshold) {
            prestige();
        }
    });

    function updateUI() {
        scoreElement.textContent = `Score: ${score}`;
        for (i = 0; i < upgradeButtons.length; i++) {
            let button = upgradeButtons[i];
            button.textContent = `Upgrade ${i+1} (Cost: ${upgradeCost(i)})`;
        }
        prestigeButton.textContent = `Prestige (${prestigePoints})`;
        prestigeCostElement.textContent = `Prestige Cost: ${prestigeThreshold}`;
    }

    function prestige() {
        prestigePoints++;
        score = 0;
        upgradeCount = upgradeCount.map(() => {return 0;})
        clickValue = baseClickValue+prestigePoints;
        prestigeThreshold *= 2; // Increase the prestige threshold
    
        // Update the UI
        updateUI();
    }
    

    // Initialize the game state, load saved data, etc.
    // You'll also need to handle saving and loading prestige points.

    // Initialize the UI
    updateUI();
});
