document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('episodes-dropdown-input');
    const dropdownList = document.getElementById('episodes-dropdown-list');
    const selectedOptionsContainer = document.getElementById('episodes-selected-options');
    const toggleAllCheckbox = document.getElementById('episodes-toggle-all');
    const selectedOptions = new Set();
    let currentlyOpenDropdown = null;

    // Define the predetermined options
    const options = ["Dragon Ball Saga", "Saiyan Saga (Z)", "Frieza Saga (Z)",
            "Android Saga (Z)", "Cell Saga (Z)", "Majin Buu Saga (Z)",
            "Black Star Dragon Ball Saga (GT)", "Super Baby Saga (GT)",
            "Super #17 Saga (GT)", "Shadow Dragon Saga (GT)",
            "God of Destruction Beerus Saga (S)",
            "Frieza Resurrected Saga (S)",
            "God of Destruction Champa Saga (S)", "Future Trunks Saga (S)",
            "Universe Survival Saga (S)", "Movies",
            "Anime Originals Saga", "DRAGON BALL FighterZ",
            "Dragon Ball Z: Kakarot"];

    // Populate the dropdown list with options
    function populateDropdown(filteredOptions) {
        dropdownList.innerHTML = '';
        filteredOptions.forEach(option => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.id = `episodes-option-${option}`;

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
                updateSelectedOptionsDisplay(); // Update selected options display after checkbox change
            });

            const label = document.createElement('label');
            label.htmlFor = `episodes-option-${option}`;
            label.appendChild(document.createTextNode(option));

            li.appendChild(checkbox);
            li.appendChild(label);
            dropdownList.appendChild(li);
        });
    }

    // Open the dropdown
    function openDropdown() {
        if (currentlyOpenDropdown && currentlyOpenDropdown !== dropdownList) {
            currentlyOpenDropdown.style.display = 'none';
        }
        dropdownList.style.display = 'block';
        currentlyOpenDropdown = dropdownList;
    }

    // Close the dropdown
    function closeDropdown() {
        dropdownList.style.display = 'none';
        currentlyOpenDropdown = null;
    }

    // Filter options based on input
    function filterOptions() {
        const inputValue = input.value.toLowerCase();
        const filteredOptions = options.filter(option => option.toLowerCase().includes(inputValue));
        populateDropdown(filteredOptions);
    }

    // Update the selected options display
    function updateSelectedOptionsDisplay() {
        selectedOptionsContainer.innerHTML = '';
        selectedOptions.forEach(option => {
            const tag = document.createElement('div');
            tag.className = 'selected-option';
            tag.textContent = option;

            tag.addEventListener('click', () => {
                selectedOptions.delete(option);
                updateSelectedOptionsDisplay(); // Update selected options display after option removal
                const checkbox = document.getElementById(`episodes-option-${option}`);
                if (checkbox) {
                    checkbox.checked = false;
                }
            });
            
            selectedOptionsContainer.appendChild(tag);
        });

        // Update the input value to reflect selected options
        input.value = '';
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
        if (!event.target.closest('.episodes-dropdown')) {
            closeDropdown();
        }
    });
    
    // Populate the dropdown initially with all options
    populateDropdown(options);

    // Add click event listener to dropdown list
    document.getElementById("episodes-dropdown-list").addEventListener("click", function(event) {
        const selectedOption = event.target.closest("li"); // Find the closest li element
        if (selectedOption) {
            const checkbox = selectedOption.querySelector("input[type='checkbox']");
            if (checkbox) {
                checkbox.checked = !checkbox.checked; // Toggle checkbox state
                if (checkbox.checked) {
                    selectedOptions.add(checkbox.value); // Add option to selected options
                } else {
                    selectedOptions.delete(checkbox.value); // Remove option from selected options
                }
                updateSelectedOptionsDisplay(); // Update selected options display after checkbox change
            }
        }
    });

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
        updateSelectedOptionsDisplay(); // Update selected options display after checkbox change
    });
});
