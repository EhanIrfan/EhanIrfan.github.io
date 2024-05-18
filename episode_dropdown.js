document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.episode-dropdown .dropdown-input');
    const dropdownList = document.querySelector('.episode-dropdown .dropdown-list');
    const toggleAllCheckbox = document.querySelector('.episode-dropdown .toggle-all');
    const selectedOptionsContainer = document.querySelector('.episode-dropdown .selected-options');
    const selectedOptions = new Set();

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
            checkbox.id = `option-${option}`;

            // Check if the option is already selected
            if (selectedOptions.has(option)) {
                checkbox.checked = true;
            }

            // Toggle checkbox state and update selected options
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
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

            // Remove option when clicked and update selected options
            tag.addEventListener('click', () => {
                selectedOptions.delete(option);
                updateSelectedOptionsDisplay();
                const checkbox = document.getElementById(`option-${option}`);
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
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });
    
    // Populate the dropdown initially with all options
    populateDropdown(options);

    // Toggle checkbox state and update selected options
    dropdownList.addEventListener('click', (event) => {
        const selectedOption = event.target.closest("li");
        if (selectedOption) {
            const checkbox = selectedOption.querySelector("input[type='checkbox']");
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                const option = checkbox.value;
                if (checkbox.checked) {
                    selectedOptions.add(option);
                } else {
                    selectedOptions.delete(option);
                }
                updateSelectedOptionsDisplay();
            }
        }
    });

    // Expose the getSelectedValues function to the global scope
    window.getSelectedValues = getSelectedValues;

    // Toggle all checkbox state and update selected options
    toggleAllCheckbox.addEventListener('change', (event) => {
        const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
            const option = checkbox.value;
            if (event.target.checked) {
                selectedOptions.add(option);
            } else {
                selectedOptions.delete(option);
            }
        });
        updateSelectedOptionsDisplay();
    });
});
