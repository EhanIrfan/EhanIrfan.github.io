document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dropdown-input');
    const dropdownList = document.getElementById('dropdown-list');
    const selectedOptions = new Set();

    // Define the predetermined options
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    // Populate the dropdown list with options
    function populateDropdown() {
        dropdownList.innerHTML = '';
        options.forEach(option => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;

            // Check if the option is already selected
            if (selectedOptions.has(option)) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    selectedOptions.add(option);
                } else {
                    selectedOptions.delete(option);
                }
                updateInputValue();
            });

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(option));
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
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;

            // Check if the option is already selected
            if (selectedOptions.has(option)) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    selectedOptions.add(option);
                } else {
                    selectedOptions.delete(option);
                }
                updateInputValue();
            });

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(option));
            dropdownList.appendChild(li);
        });
    }

    // Update the input value to show selected options
    function updateInputValue() {
        input.value = Array.from(selectedOptions).join(', ');
    }

    // Get selected values
    function getSelectedValues() {
        return Array.from(selectedOptions);
    }

    // Event listeners
    input.addEventListener('click', (event) => {
        event.stopPropagation();
        openDropdown();
    });

    input.addEventListener('input', filterOptions);

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });

    // Populate the dropdown initially
    populateDropdown();
});
