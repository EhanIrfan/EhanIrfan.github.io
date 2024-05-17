document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dropdown-input');
    const dropdownList = document.getElementById('dropdown-list');
    const selectedOptionsContainer = document.getElementById('selected-options');
    const toggleAllCheckbox = document.getElementById('toggle-all');
    const selectedOptions = new Set();

    // Define the predetermined options
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    // Populate the dropdown list with options
    function populateDropdown(filteredOptions) {
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
                updateSelectedOptionsDisplay();
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
        populateDropdown(filteredOptions);
    }

    // Update the selected options display
    function updateSelectedOptionsDisplay() {
        selectedOptionsContainer.innerHTML = Array.from(selectedOptions).join(', ');
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

    // Populate the dropdown initially with all options
    populateDropdown(options);

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
        updateSelectedOptionsDisplay();
    });
});
