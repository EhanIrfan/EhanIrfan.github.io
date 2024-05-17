document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dropdown-input');
    const dropdownList = document.getElementById('dropdown-list');

    // Define the predetermined options
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    // Populate the dropdown list with options
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

    // Open the dropdown
    function openDropdown() {
        dropdownList.style.display = 'block';
    }

    // Close the dropdown
    function closeDropdown() {
        dropdownList.style.display = 'none';
    }

    // Filter options based on input
    function filterOptions() {
        const inputValue = input.value.toLowerCase();
        const filteredOptions = options.filter(option => option.toLowerCase().includes(inputValue));
        dropdownList.innerHTML = '';
        filteredOptions.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            li.addEventListener('click', () => {
                input.value = option;
                closeDropdown();
            });
            dropdownList.appendChild(li);
        });
    }

    // Event listeners
    input.addEventListener('click', openDropdown);
    input.addEventListener('input', filterOptions);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });

    // Populate the dropdown initially
    populateDropdown();
});
