class Fighter {
    constructor(rarity, name, color, tags, ztags, imgPaths, epi, dbl) {
        this.rarity = rarity;
        this.name = name;
        this.color = color;
        this.tags = tags;
        this.ztags = ztags;
        this.imgPaths = imgPaths; // Store paths of individual images
        this.epi = epi;
        this.dbl = dbl;
    }
}

export function fetchFighters() {
    return fetch('fighter_data.csv')
        .then(response => response.text())
        .then(csvData => {
            const parsedData = parseCSV(csvData);
            return createObjects(parsedData);
        });
}

function parseCSV(csvData) {
    return csvData.split('\n').map(row => row.split(','));
}

function createObjects(data) {
    const objects = [];
    for (let i = 1; i < data.length; i++) { // Start from index 1 to skip header row
        const [rarity, name, color, tags, ztags, epi, dbl] = data[i];
        if (rarity && name && color && tags && ztags && epi && dbl) {
            const imgPaths = generateImagePaths(rarity, name, color);
            const fighter = new Fighter(rarity, name, color, tags.split("."), ztags.split("."), imgPaths, epi, "DBL" + dbl);
            objects.push(fighter);
        }
    }
    return objects;
}

function generateImagePaths(rarity, name, color) {
    const baseURL = 'https://raw.githubusercontent.com/EhanIrfan/LegendsRandomizer/';
    const normalizedRarity = rarity ? rarity.toLowerCase() : '';  
    const normalizedName = name ? name.toLowerCase().replace(/ /g, '').replace(/:/g, '').replace(/\(/g, '').replace(/\)/g, '') : '';
    const normalizedColor = color ? color.toLowerCase() : '';
    return {
        rarity: `${baseURL}${normalizedRarity}.png`,
        name: `${baseURL}${normalizedColor}${normalizedRarity}${normalizedName}.png`,
        color: `${baseURL}${normalizedColor}.png`
    };
}
