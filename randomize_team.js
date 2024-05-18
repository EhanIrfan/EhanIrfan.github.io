import { fetchFighters } from './parse_data.js';

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load an image
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Handle CORS if needed
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = src;
    });
}

// Function to combine images using canvas
async function combineImages(paths) {
    const rarityImage = await loadImage(paths.rarity);
    const nameImage = await loadImage(paths.name);
    const colorImage = await loadImage(paths.color);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size based on the images size
    const width = Math.max(rarityImage.width, nameImage.width, colorImage.width);
    const height = rarityImage.height + nameImage.height + colorImage.height * 0.5; // Adjust for minor overlap
    canvas.width = width;
    canvas.height = height;

    // Draw images on the canvas
    ctx.drawImage(rarityImage, (width - rarityImage.width) / 2, 0); // Centered at the top
    ctx.drawImage(nameImage, (width - nameImage.width) / 2, rarityImage.height - 20); // Positioned below rarity with minor overlap
    ctx.drawImage(colorImage, (width - colorImage.width) / 2, rarityImage.height + nameImage.height - 20); // Positioned at the bottom with overlap

    // Return the combined image as a data URL
    return canvas.toDataURL();
}


// Function to select six random fighters and display them
async function randomizeTeam(fighters) {
    // Shuffle the fighters array
    const shuffledFighters = shuffleArray(fighters);

    // Select the first six fighters from the shuffled array
    const selectedFighters = shuffledFighters.slice(0, 6);

    // Display the selected fighters
    const randomTeamContainer = document.getElementById('random-team');
    randomTeamContainer.innerHTML = '';

    const namesList = document.createElement('div');
    namesList.className = 'names-list';

    for (const fighter of selectedFighters) {
        const combinedImageSrc = await combineImages(fighter.imgPaths);

        const fighterDiv = document.createElement('div');
        fighterDiv.className = 'fighter';

        const img = document.createElement('img');
        img.src = combinedImageSrc;
        img.alt = fighter.name;

        const name = document.createElement('p');
        name.textContent = fighter.name;

        fighterDiv.appendChild(img);
        randomTeamContainer.appendChild(fighterDiv);

        // Add names to the names list
        namesList.appendChild(name);
    }

    // Append the names list to the random team container
    randomTeamContainer.appendChild(namesList);
}

// Event listener for the randomize button
document.getElementById('randomize-button').addEventListener('click', () => {
    fetchFighters().then(fighters => {
        randomizeTeam(fighters);
    }).catch(error => {
        console.error('Error:', error);
    });
});
