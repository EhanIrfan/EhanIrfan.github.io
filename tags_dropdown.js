document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('dropdown-input');
    const dropdownList = document.getElementById('dropdown-list');
    const selectedOptionsContainer = document.getElementById('selected-options');
    const toggleAllCheckbox = document.getElementById('toggle-all');
    const selectedOptions = new Set();

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

    // Populate the dropdown list with options
    function populateDropdown(filteredOptions) {
        dropdownList.innerHTML = '';
        filteredOptions.forEach(option => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.id = `option-${option}`;

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

            const label = document.createElement('label');
            label.htmlFor = `option-${option}`;
            label.appendChild(document.createTextNode(option));

            li.appendChild(checkbox);
            li.appendChild(label);
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
        selectedOptionsContainer.innerHTML = '';
        selectedOptions.forEach(option => {
            const tag = document.createElement('div');
            tag.className = 'selected-option';
            tag.textContent = option;

            const removeButton = document.createElement('span');
            removeButton.className = 'remove-option';
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', () => {
                selectedOptions.delete(option);
                updateSelectedOptionsDisplay();
                const checkbox = document.getElementById(`option-${option}`);
                if (checkbox) {
                    checkbox.checked = false;
                }
            });

            tag.appendChild(removeButton);
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
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });
    
    // Populate the dropdown initially with all options
    populateDropdown(options);

    // Add click event listener to dropdown list
    document.getElementById("dropdown-list").addEventListener("click", function(event) {
    const selectedOption = event.target.closest("li"); // Find the closest li element
    if (selectedOption) {
        const checkbox = selectedOption.querySelector("input[type='checkbox']");
        if (checkbox) {
            checkbox.checked = !checkbox.checked; // Toggle checkbox state
        }
    }
});
        // Add click event listener to each selected option
    document.querySelectorAll(".selected-option").forEach(option => {
        option.addEventListener("click", function() {
            this.remove(); // Remove the clicked selected option
        });
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
        updateSelectedOptionsDisplay();
    });
});
