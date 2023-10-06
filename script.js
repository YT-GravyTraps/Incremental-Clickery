document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let baseClickValue = 1; // Base click value
    let clickValue = baseClickValue; // Initial click value

    const scoreElement = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');
    const upgradeButtons = document.querySelectorAll('.upgrade-button');

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

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateUpgradeCost(button, cost) {
        // Decrease the cost for the clicked upgrade
        cost *= 2; // You can adjust this logic as needed
        button.setAttribute('data-cost', cost);
        button.textContent = `Upgrade (Cost: ${cost})`;
    }
});

    

