
            // Get the input element and dropdown list
const input = document.getElementById('dropdown-input');
const dropdownList = document.getElementById('dropdown-list');

// Define the predetermined options
const options = ["Saiyan", "Hybrid Saiyan", "Super Saiyan", "Super Saiyan 2",
             "Super Saiyan 3", "Super Saiyan 4", "Super Saiyan God",
             "Super Saiyan God SS", "Super Saiyan Rose", "Namekian",
             "Android", "Shadow Dragon", "God of Destruction", "Angel",
             "Kids", "Girls", "Regeneration", "Powerful Opponent",
             "Transforming Warrior", "Lineage of Evil", "Minion", "Twins",
             "Otherworld Warrior", "Fusion Warrior", "God Ki", "Son Family",
             "Vegeta Clan", "Super Warrior", "Frieza Force", "Ginyu Force",
             "Team Bardock", "Hera Clan", "Future", "GT", "Merging",
             "Absorption", "Fusion", "Potara", "Rival Universe",
             "Universe 2", "Universe 4", "Universe 6", "Universe 9",
             "Universe 11", "Universe Rep", "DB", "Event Exclusive",
             "Legends Road", "Game Originals"];

// Function to populate the dropdown list with options
function populateDropdown() {
  dropdownList.innerHTML = '';
  options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.addEventListener('click', () => {
      input.value = option;
      closeDropdown();
    });
    dropdownList.appendChild(li);
  });
}

// Function to open the dropdown
function openDropdown() {
  dropdownList.style.display = 'block';
}

// Function to close the dropdown
function closeDropdown() {
  dropdownList.style.display = 'none';
}

// Event listeners
input.addEventListener('click', openDropdown);
input.addEventListener('input', () => {
  openDropdown();
  const inputValue = input.value.toLowerCase();
  options.forEach(option => {
    if (option.toLowerCase().includes(inputValue)) {
      dropdownList.style.display = 'block';
      return;
    }
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown')) {
    closeDropdown();
  }
});

// Populate the dropdown initially
populateDropdown();

