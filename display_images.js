
import { fetchFighters } from './parse_data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const fighters = await fetchFighters();

    // Filter fighters based on user selections
    const selectedTags = getSelectedOptions('tags-selected-options');
    const selectedEpisodes = getSelectedOptions('episodes-selected-options');
    const selectedColors = getSelectedOptions('colors-selected-options');
    const selectedRarities = getSelectedOptions('rarities-selected-options');

    const filteredFighters = fighters.filter(fighter => {
        return (
            fighter.tags.some(tag => selectedTags.includes(tag)) ||
            selectedEpisodes.includes(fighter.epi)
        ) && selectedColors.includes(fighter.color) && selectedRarities.includes(fighter.rarity);
    });

    // Randomly select six fighters
    const selectedFighters = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * filteredFighters.length);
        selectedFighters.push(filteredFighters[randomIndex]);
        filteredFighters.splice(randomIndex, 1); // Remove the selected fighter to avoid duplicates
    }

    // Display combined images and names
    const combinedImagesContainer = document.getElementById('combined-images-container');
    const selectedFightersNames = document.getElementById('selected-fighters-names');
    combinedImagesContainer.innerHTML = '';
    selectedFightersNames.innerHTML = '';

    for (const fighter of selectedFighters) {
        const combinedImageUrl = await combineImages(fighter.imgPaths);
        const imgElement = document.createElement('img');
        imgElement.src = combinedImageUrl;
        imgElement.style.width = '200px';
        imgElement.style.height = '200px';
        combinedImagesContainer.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = `${fighter.color} ${fighter.rarity} ${fighter.name} (${fighter.dbl})`;
        selectedFightersNames.appendChild(nameElement);
    }
});

function getSelectedOptions(containerId) {
    const container = document.getElementById(containerId);
    const options = [];
    for (const child of container.children) {
        options.push(child.textContent);
    }
    return options;
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
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
