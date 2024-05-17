
            // Get the input element and dropdown list
const input = document.getElementById('dropdown-input');
const dropdownList = document.getElementById('dropdown-list');

// Define the predetermined options
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

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

