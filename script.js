const contactsKey = "contactHubContacts";
let contacts = JSON.parse(
    localStorage.getItem(contactsKey)) || [];
let editingContactId = null;
let selectedPhoto = "";
const openAddModalBtn =
    document.getElementById(
        "openAddModalBtn"
    );
const contactModal =
    document.getElementById(
        "contactModal"
    );
const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );
const cancelBtn =
    document.getElementById(
        "cancelBtn"
    );
const contactForm =
    document.getElementById(
        "contactForm"
    );
const modalTitle =
    document.getElementById(
        "modalTitle"
    );
const saveButtonText =
    document.getElementById(
        "saveButtonText"
    );
const nameInput =
    document.getElementById(
        "nameInput"
    );
const phoneInput =
    document.getElementById(
        "phoneInput"
    );
const emailInput =
    document.getElementById(
        "emailInput"
    );
const addressInput =
    document.getElementById(
        "addressInput"
    );
const groupInput =
    document.getElementById(
        "groupInput"
    );
const notesInput =
    document.getElementById(
        "notesInput"
    );
const favoriteInput =
    document.getElementById(
        "favoriteInput"
    );
const emergencyInput =
    document.getElementById(
        "emergencyInput"
    );
const photoInput =
    document.getElementById(
        "photoInput"
    );
const photoPreview =
    document.getElementById(
        "photoPreview"
    );
const nameError =
    document.getElementById(
        "nameError"
    );
const phoneError =
    document.getElementById(
        "phoneError"
    );
const emailError =
    document.getElementById(
        "emailError"
    );
const searchInput =
    document.getElementById(
        "searchInput"
    );
const contactsContainer =
    document.getElementById(
        "contactsContainer"
    );
const emptyState =
    document.getElementById(
        "emptyState"
    );
const totalCount =
    document.getElementById(
        "totalCount"
    );
const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );
const emergencyCount =
    document.getElementById(
        "emergencyCount"
    );
const contactsSubtitle =
    document.getElementById(
        "contactsSubtitle"
    );
const favoritesList =
    document.getElementById(
        "favoritesList"
    );
const emergencyList =
    document.getElementById(
        "emergencyList"
    );
function saveContacts() {
    localStorage.setItem(
        contactsKey,
        JSON.stringify(contacts)
    );
}
function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
function getInitials(name) {
    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    if (words.length === 0) { return "?"; }
    if (words.length === 1) {
        return words[0]
            .slice(0, 2)
            .toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
}
function renderPhotoPreview(photo) {
    if (photo) {
        photoPreview.innerHTML = `
            <img src="${photo}" alt="Contact photo">`;
    }
    else { photoPreview.innerHTML = `<i class="fa-solid fa-user"></i>`; }
}
photoInput.addEventListener(
    "change",
    function () {
        const file =
            photoInput.files[0];
        if (!file) {
            return;
        }
        const reader =
            new FileReader();
        reader.onload =
            function (event) {
                selectedPhoto =
                    event.target.result;
                renderPhotoPreview(
                    selectedPhoto
                );
            };
        reader.readAsDataURL(file);
    }
);
function openModal() {
    contactModal.classList.add(
        "show"
    );
    document.body.style.overflow =
        "hidden";
}
function closeModal() {
    contactModal.classList.remove(
        "show"
    );
    document.body.style.overflow =
        "";
    resetForm();
}
function resetForm() {
    contactForm.reset();
    editingContactId = null;
    selectedPhoto = "";
    modalTitle.textContent =
        "Add New Contact";
    saveButtonText.textContent =
        "Save Contact";
    renderPhotoPreview("");
    clearErrors();
}
openAddModalBtn.addEventListener(
    "click",
    function () {
        resetForm();
        openModal();
    }
);
closeModalBtn.addEventListener(
    "click",
    closeModal
);
cancelBtn.addEventListener(
    "click",
    closeModal
);
contactModal.addEventListener(
    "click",
    function (event) {
        if (
            event.target ===
            contactModal
        ) {
            closeModal();
        }
    }
);
document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            contactModal.classList.contains(
                "show"
            )
        ) {
            closeModal();
        }
    }
);

function clearErrors() {
    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    nameInput.classList.remove("invalid");
    phoneInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
}
function validateName() {
    const value =
        nameInput.value.trim();
    if (value.length < 2) {
        nameError.textContent =
            "Please enter a valid name";
        nameInput.classList.add(
            "invalid"
        );
        return false;
    }
    nameError.textContent = "";
    nameInput.classList.remove(
        "invalid"
    );
    return true;
}

function validatePhone() {
    const value =
        phoneInput.value.trim();
    const egyptianPhoneRegex =
        /^01[0125][0-9]{8}$/;
    if (
        !egyptianPhoneRegex.test(
            value
        )
    ) {
        phoneError.textContent =
            "Please enter a valid Egyptian phone number";
        phoneInput.classList.add(
            "invalid"
        );
        return false;
    }
    phoneError.textContent = "";
    phoneInput.classList.remove(
        "invalid"
    );
    return true;
}
function validateEmail() {
    const value =
        emailInput.value.trim();
    if (!value) {
        emailError.textContent = "";
        emailInput.classList.remove(
            "invalid"
        );
        return true;
    }
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
        !emailRegex.test(
            value
        )
    ) {
        emailError.textContent =
            "Please enter a valid email address";
        emailInput.classList.add(
            "invalid"
        );
        return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove(
        "invalid"
    );
    return true;
}
function validateForm() {
    const nameValid =
        validateName();
    const phoneValid =
        validatePhone();
    const emailValid =
        validateEmail();
    return (
        nameValid &&
        phoneValid &&
        emailValid
    );
}
nameInput.addEventListener(
    "input",
    validateName
);
phoneInput.addEventListener(
    "input",
    validatePhone
);
emailInput.addEventListener(
    "input",
    validateEmail
);
contactForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const contactData = {
            id:
                editingContactId ||
                Date.now(),
            name:
                nameInput.value.trim(),
            phone:
                phoneInput.value.trim(),
            email:
                emailInput.value.trim(),
            address:
                addressInput.value.trim(),
            group:
                groupInput.value,
            notes:
                notesInput.value.trim(),
            favorite:
                favoriteInput.checked,
            emergency:
                emergencyInput.checked,
            photo:
                selectedPhoto
        };
        if (editingContactId) {
            const index =
                contacts.findIndex(
                    function (contact) {
                        return (
                            contact.id ===
                            editingContactId
                        );
                    }
                );
            if (index !== -1) {
                contacts[index] =
                    contactData;
            }
            saveContacts();
            renderApp();
            closeModal();
            Swal.fire({
                icon: "success",
                title: "Contact Updated",
                text: "The contact has been updated successfully.",
                timer: 1600,
                showConfirmButton:
                    false
            });
        } else {
            contacts.unshift(
                contactData
            );
            saveContacts();
            renderApp();
            closeModal();
            Swal.fire({
                icon: "success",
                title: "Contact Added",
                text: "The contact has been added successfully.",
                timer: 1600,
                showConfirmButton:
                    false
            });
        }
    }
);
function editContact(id) {
    const contact =
        contacts.find(
            function (item) {
                return item.id === id;
            }
        );
    if (!contact) {
        return;
    }
    editingContactId =
        contact.id;
    modalTitle.textContent =
        "Edit Contact";
    saveButtonText.textContent =
        "Update Contact";
    nameInput.value =
        contact.name;
    phoneInput.value =
        contact.phone;
    emailInput.value =
        contact.email;
    addressInput.value =
        contact.address;
    groupInput.value =
        contact.group;
    notesInput.value =
        contact.notes;
    favoriteInput.checked =
        contact.favorite;
    emergencyInput.checked =
        contact.emergency;
    selectedPhoto =
        contact.photo || "";
    renderPhotoPreview(selectedPhoto);
    clearErrors();
    openModal();
}
function deleteContact(id) {
    const contact =
        contacts.find(
            function (item) {
                return item.id === id;
            }
        );
    if (!contact) {
        return;
    }
    Swal.fire({
        icon: "warning",
        title: "Delete Contact?",
        html:
            `Are you sure you want to delete <strong>${escapeHTML(contact.name)}</strong>? This action cannot be undone.`,
        showCancelButton: true,
        confirmButtonText:
            "Yes, delete it!",
        cancelButtonText:
            "Cancel",
        confirmButtonColor:
            "#e52525",
        cancelButtonColor:
            "#687386"
    }).then(
        function (result) {
            if (
                result.isConfirmed
            ) {
                contacts =
                    contacts.filter(
                        function (item) {
                            return (
                                item.id !== id
                            );
                        }
                    );
                saveContacts();
                renderApp();
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "The contact has been deleted.",
                    timer: 1400,
                    showConfirmButton:
                        false
                });
            }
        }
    );
}
function toggleFavorite(id) {
    const contact =
        contacts.find(
            function (item) {
                return item.id === id;
            }
        );
    if (!contact) {
        return;
    }
    contact.favorite =
        !contact.favorite;
    saveContacts();
    renderApp();
}

function toggleEmergency(id) {
    const contact =
        contacts.find(
            function (item) {
                return item.id === id;
            }
        );
    if (!contact) {
        return;
    }
    contact.emergency =
        !contact.emergency;
    saveContacts();
    renderApp();
}
function createAvatar(contact) {
    if (contact.photo) {
        return `
            <img
                src="${contact.photo}"
                alt="${escapeHTML(contact.name)}"
            >
        `;
    }
    return escapeHTML(
        getInitials(contact.name)
    );
}

function createContactCard(contact) {
    return `
        <article class="contact-card">
            <div class="contact-card-body">
                <div class="contact-top">
                    <div class="contact-avatar-wrap">
                        <div class="contact-avatar">
                            ${createAvatar(contact)}
                        </div>
                        ${contact.favorite ? `
                        <span class="contact-badge-small favorite-avatar-badge">
                        <i class="fa-solid fa-star"></i>
                        </span>
                        `: ""}
                        ${contact.emergency ? `
                        <span class="contact-badge-small emergency-avatar-badge">
                        <i class="fa-solid fa-heart-pulse"></i>
                        </span>`: ""}
                    </div>
                    <div class="contact-main">
                        <h3>${escapeHTML(contact.name)}</h3>
                        <div class="contact-line phone-line">
                        <i class="fa-solid fa-phone"></i>
                        <span>${escapeHTML(contact.phone)}</span>
                    </div>
                    </div>
                    </div>
                ${contact.email ? `
                <div class="contact-line email-line">
                <i class="fa-solid fa-envelope"></i>
                <span>${escapeHTML(contact.email)}</span>
                </div>`: ""}
                ${contact.address ? `
                <div class="contact-line address-line">
                <i class="fa-solid fa-location-dot"></i>
                <span>${escapeHTML(contact.address)}</span>
                </div>
                `: ""}
                <div class="contact-tags">
                    ${contact.group ? `
                                <span class="contact-tag group-tag">
                                    ${escapeHTML(contact.group)}
                                </span>
                            `: ""}
                    ${contact.emergency ? `
                                <span class="contact-tag emergency-tag">
                                <i class="fa-solid fa-heart-pulse"></i>Emergency</span>
            `: ""}
                </div>
            </div>
            <div class="contact-actions">
                <div class="contact-actions-left">
                    <a
                        href="tel:${escapeHTML(contact.phone)}"
                        class="action-btn call-btn"
                        title="Call"
                    >
                        <i class="fa-solid fa-phone"></i>
                    </a>
                    ${contact.email ? `
                                <a href="mailto:${escapeHTML(contact.email)}"
                                class="action-btn email-btn" title="Email">
                                <i class="fa-solid fa-envelope"></i>
                                </a>
                                `: ""}
                </div>
                <div class="contact-actions-right">
                    <button type="button" class=" action-btn favorite-btn ${contact.favorite ? "active" : ""}
                        "onclick="toggleFavorite(${contact.id})"title="Favorite">
                        <i class="fa-solid fa-star"></i>
                    </button>
                    <button
                    type="button"  class=action-btn emergency-btn
                    ${contact.emergency ? "active" : ""}
        "onclick="toggleEmergency(${contact.id})"title="Emergency">
        <i class="fa-solid fa-heart-pulse"></i>
                    </button>
                    <button
                        type="button"
                        class="action-btn edit-btn"
                        onclick="editContact(${contact.id})"
                        title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button
                        type="button"
                        class="action-btn delete-btn"
                        onclick="deleteContact(${contact.id})"
                        title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}
function createSideContact(
    contact,
    type
) {
    const buttonClass =
        type === "emergency"
            ? "emergency-btn"
            : "call-btn";
    return `
        <div class="side-contact">
            <div class="side-contact-avatar">
                ${createAvatar(contact)}
            </div>
            <div class="side-contact-info">
                <strong>
                    ${escapeHTML(contact.name)}
                </strong>
                <span>
                    ${escapeHTML(contact.phone)}
                </span>
            </div>
            <a
                href="tel:${escapeHTML(contact.phone)}"
                class="side-call ${buttonClass}"
                title="Call"
            >
                <i class="fa-solid fa-phone"></i>
            </a>
        </div>
    `;
}
function renderSidePanels() {
    const favorites =
        contacts.filter(
            function (contact) {
                return contact.favorite;
            }
        );
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="side-empty">
            No favorites yet
            </div>
        `;
    } else {
        favoritesList.innerHTML =
            favorites
                .map(
                    function (contact) {
                        return createSideContact(
                            contact,
                            "favorite"
                        );
                    }
                )
                .join("");
    }
    const emergencies =
        contacts.filter(
            function (contact) {
                return contact.emergency;
            }
        );
    if (emergencies.length === 0) {
        emergencyList.innerHTML = `
            <div class="side-empty">
                No emergency contacts
            </div>
        `;
    } else {
        emergencyList.innerHTML =
            emergencies
                .map(
                    function (contact) {
                        return createSideContact(
                            contact,
                            "emergency"
                        );
                    }
                )
                .join("");
    }
}
function updateCounters() {
    totalCount.textContent =
        contacts.length;
    favoriteCount.textContent =
        contacts.filter(
            function (contact) {
                return contact.favorite;
            }
        ).length;
    emergencyCount.textContent =
        contacts.filter(
            function (contact) {
                return contact.emergency;
            }
        ).length;
    contactsSubtitle.textContent =
        `Manage and organize your ${contacts.length} ${contacts.length === 1
            ? "contact"
            : "contacts"
        }`;
}
function getFilteredContacts() {
    const query =
        searchInput.value
            .trim()
            .toLowerCase();
    if (!query) {
        return contacts;
    }
    return contacts.filter(
        function (contact) {
            const name =
                contact.name
                    .toLowerCase();
            const phone =
                contact.phone
                    .toLowerCase();
            const email =
                contact.email
                    .toLowerCase();
            return (
                name.includes(query) ||
                phone.includes(query) ||
                email.includes(query)
            );
        }
    );
}
function renderContacts() {
    const filteredContacts =
        getFilteredContacts();
    if (
        filteredContacts.length === 0
    ) {
        contactsContainer.innerHTML =
            "";
        emptyState.style.display =
            "flex";
        if (
            searchInput.value.trim()
        ) {
            emptyState.querySelector(
                "h3"
            ).textContent =
                "No matching contacts";
            emptyState.querySelector(
                "p"
            ).textContent =
                "Try searching with a different name, phone, or email";
        } else {
            emptyState.querySelector(
                "h3"
            ).textContent =
                "No contacts found";
            emptyState.querySelector(
                "p"
            ).textContent =
                'Click "Add Contact" to get started';
        }
        return;
    }
    emptyState.style.display =
        "none";
    contactsContainer.innerHTML =
        filteredContacts
            .map(
                function (contact) {
                    return createContactCard(
                        contact
                    );
                }
            )
            .join("");
}
function renderApp() {
    updateCounters();
    renderContacts();
    renderSidePanels();
}
searchInput.addEventListener(
    "input",
    renderContacts
);
renderApp();