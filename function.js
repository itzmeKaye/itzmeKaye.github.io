document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const type = document.querySelector('input[name="type"]:checked').value;
            const itemName = document.getElementById('itemName').value;
            const description = document.getElementById('description').value;
            const contact = document.getElementById('contact').value;
            const date = document.getElementById('date').value;
            const imageFile = document.getElementById('image').files[0];

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addItemToList(type, itemName, description, contact, date, e.target.result);
                };
                reader.readAsDataURL(imageFile);
            } else {
                addItemToList(type, itemName, description, contact, date, null);
            }

            form.reset();
        });
    }

    function addItemToList(type, name, description, contact, date, imageUrl)
    {
        const lostItemsContainer = document.querySelector('.lost-items .item-grid');
        const foundItemsContainer = document.querySelector('.found-items .item-grid');
        const container = type === 'lost' ? lostItemsContainer : foundItemsContainer;

        if (!container) return;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-card');

        let imageHTML = '';
        if (imageUrl) {
            imageHTML = `<img src="${imageUrl}" alt="${name}" />`;
        }

        itemDiv.innerHTML = `
            ${imageHTML}
            <h4>${name}</h4>
            <p class="item-details">${description}</p>
            <p class="contact-info">Contact: <a href="mailto:${contact}">${contact}</a></p>
            <p class="date-info">Date: ${date}</p>
        `;

        container.prepend(itemDiv);
    }

    // Toggle dropdown
    window.toggleDropdown = function() {
        const dropdown = document.getElementById('dropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('dropdown');
        const accountIcon = document.querySelector('.account-icon');
        if (dropdown && event.target !== dropdown && !accountIcon.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});