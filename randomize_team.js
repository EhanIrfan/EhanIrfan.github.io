import { fetchFighters } from './parse_data.js';

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to select six random fighters and display them
function randomizeTeam(fighters) {
    // Shuffle the fighters array
    const shuffledFighters = shuffleArray(fighters);

    // Select the first six fighters from the shuffled array
    const selectedFighters = shuffledFighters.slice(0, 6);

    // Display the selected fighters
    const randomTeamContainer = document.getElementById('random-team');
    randomTeamContainer.innerHTML = '';

    selectedFighters.forEach(fighter => {
        const fighterDiv = document.createElement('div');
        fighterDiv.className = 'fighter';

        const img = document.createElement('img');
        img.src = fighter.img; // Assuming the img property is the path to the combined image
        img.alt = fighter.name;

        const name = document.createElement('p');
        name.textContent = fighter.name;

        fighterDiv.appendChild(img);
        fighterDiv.appendChild(name);
        randomTeamContainer.appendChild(fighterDiv);
    });
}

// Event listener for the randomize button
document.getElementById('randomize-button').addEventListener('click', () => {
    fetchFighters().then(fighters => {
        randomizeTeam(fighters);
    }).catch(error => {
        console.error('Error:', error);
    });
});
