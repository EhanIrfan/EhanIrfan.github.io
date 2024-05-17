class Fighter {
    constructor(rarity, name, color, tags, ztags, img, epi, dbl) {
        this.rarity = rarity;
        this.name = name;
        this.color = color;
        this.tags = tags;
        this.ztags = ztags;
        this.img = img;
        this.epi = epi;
        this.dbl = dbl;
    }
}

fetch('fighter_data.csv')
    .then(response => response.text())
    .then(csvData => {
        const parsedData = parseCSV(csvData);
        const objects = createObjects(parsedData);
        console.log(objects);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function parseCSV(csvData) {
    return csvData.split('\n').map(row => row.split(','));
}

function createObjects(data) {
    const objects = [];
    for (let i = 1; i < data.length; i++) { // Start from index 1 to skip header row
        const [rarity, name, color, tags, ztags, epi, dbl] = data[i];
        const img = generateImageFilename(rarity, name, color);
        const fighter = new Fighter(rarity, name, color, tags.split("."), ztags.split("."), img, epi, "DBL" + dbl);
        objects.push(fighter);
    }
    return objects;
}

function generateImageFilename(rarity, name, color) {
    const normalizedRarity = rarity ? rarity.toLowerCase();
    // this line checks first to make sure name is defined  
    const normalizedName = name ? name.toLowerCase().replace(/ /g, '').replace(/:/g, '').replace(/\(/g, '').replace(/\)/g, '') : '';
    const normalizedColor = color ? color.toLowerCase();
    return normalizedColor + normalizedRarity + normalizedName + '.png';
}
