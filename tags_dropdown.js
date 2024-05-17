document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dropdown-input');
    const dropdownList = document.getElementById('dropdown-list');
    const toggleAllCheckbox = document.getElementById('toggle-all');
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

        // Uncheck checkboxes for options that have been removed from the input
        const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!selectedOptions.has(checkbox.value)) {
                checkbox.checked = false;
            }
        });
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

    input.addEventListener('input', () => {
        const currentSelectedOptions = new Set(input.value.split(', ').filter(Boolean));
        
        // Find options that have been removed
        selectedOptions.forEach(option => {
            if (!currentSelectedOptions.has(option)) {
                selectedOptions.delete(option);
            }
        });

        filterOptions();
        updateInputValue();
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });

    // Populate the dropdown initially
    populateDropdown();

    // Expose the getSelectedValues function to the global scope
    window.getSelectedValues = getSelectedValues;

    // Event listener for toggle all checkbox
    toggleAllCheckbox.addEventListener('change', (event) => {
        const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');
        if (event.target.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                selectedOptions.add(checkbox.value);
            });
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                selectedOptions.delete(checkbox.value);
            });
        }
        updateInputValue();
    });
});
