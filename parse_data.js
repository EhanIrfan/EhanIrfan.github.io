<script>
    class Fighter {
        constructor(rarity, name, color, tags, ztags, img, epi, dbl) {
            this.rarity = rarity
            this.name = name
            this.color = color
            this.tags = tags
            this.ztags = ztags
            this.img = img
            this.epi = epi
            this.dbl = dbl
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
            const [rarity, name, color, tags, ztags, epi, dbl] = [data[i][0],data[i][1],data[i][2],data[i][3].split("."),data[i][4].split("."),data[i][5],"DBL".concat(data[i][6])]
            const img = string.concat(color.toLowerCase(), rarity.toLowerCase(),
                                      name.toLowerCase().replace("/ /g", "").replace("/:/g", "").replace("/(/g", "").replace("/)/g", ""),
                                      ".png") 
            const fighter = new Fighter(rarity, name, color, tags, ztags, img, epi, dbl); // Create fighter object
            objects.push(fighter);
        }
        return objects;
    }
</script>
