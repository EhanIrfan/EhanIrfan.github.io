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

async function combineImages(paths) {
    const rarityImage = await loadImage(paths.rarity);
    const nameImage = await loadImage(paths.name);
    const colorImage = await loadImage(paths.color);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const canvasWidth = 200;
    const canvasHeight = 200;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Scale images to fit within the 200x200 box
    const scaledRarityHeight = canvasHeight * 0.3; // 30% of canvas height
    const scaledNameHeight = canvasHeight * 0.6; // 60% of canvas height
    const scaledColorHeight = canvasHeight * 0.1; // 10% of canvas height

    const rarityScale = scaledRarityHeight / rarityImage.height;
    const nameScale = scaledNameHeight / nameImage.height;
    const colorScale = scaledColorHeight / colorImage.height;

    const scaledRarityWidth = rarityImage.width * rarityScale;
    const scaledNameWidth = nameImage.width * nameScale;
    const scaledColorWidth = colorImage.width * colorScale;

    // Calculate x positions to center the images horizontally
    const rarityX = (canvasWidth - scaledRarityWidth) / 2;
    const nameX = (canvasWidth - scaledNameWidth) / 2;
    const colorX = (canvasWidth - scaledColorWidth) / 2;

    // Draw images with the desired overlap
    ctx.drawImage(rarityImage, rarityX, 0, scaledRarityWidth, scaledRarityHeight); // Top
    ctx.drawImage(nameImage, nameX, scaledRarityHeight - scaledNameHeight * 0.2, scaledNameWidth, scaledNameHeight); // Middle, slightly overlapping rarity
    ctx.drawImage(colorImage, colorX, canvasHeight - scaledColorHeight, scaledColorWidth, scaledColorHeight); // Bottom, slightly overlapping name

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
        name.textContent = fighter.name + " " + fighter.dbl;

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
