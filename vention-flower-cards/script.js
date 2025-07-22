// Mock API response - flower data with demo images
const flowersData = [
    {
        id: 1,
        name: "Blue Flower",
        price: 80.00,
        image: "../assets/blue-flower.png",
        rating: 4,
        inCart: false
    },
    {
        id: 2,
        name: "Orange Flower",
        price: 17.60,
        image: "../assets/orange-flower.png",
        rating: 3,
        inCart: false
    },
    {
        id: 3,
        name: "Pink Flower",
        price: 40.00,
        image: "../assets/pink-flower.png",
        rating: 5,
        inCart: false
    }
];

// Cart state
let cart = [];

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');
const cartCountElement = document.getElementById('cartCount');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    updateCartCount();
    initializeNavbar();
});

// Render all cards
function renderCards() {
    cardsContainer.innerHTML = '';

    flowersData.forEach(flower => {
        const cardElement = createCardElement(flower);
        cardsContainer.appendChild(cardElement);
    });
}

// Create individual card element
function createCardElement(flower) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = flower.id;

    card.innerHTML = `
        <div class="card-image-container">
            <div class="cart-indicator ${flower.inCart ? 'show' : ''}">
                In Cart
            </div>
            <img src="${flower.image}" alt="${flower.name}" class="card-image" loading="lazy">
            <div class="card-overlay">
                <button class="btn ${flower.inCart ? 'btn-secondary' : 'btn-primary'}" 
                        onclick="toggleCart(${flower.id})">
                    ${flower.inCart ? 'Remove from cart' : 'Add to cart'}
                </button>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${flower.name}</h3>
            <p class="card-price">$${flower.price.toFixed(2)}</p>
            <div class="star-rating">
                ${generateStarRating(flower.rating)}
            </div>
        </div>
    `;

    return card;
}

// Generate star rating HTML with black star images
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<img src="../assets/star.svg" alt="star" class="star filled">';
        } else {
            stars += '<img src="../assets/star.svg" alt="star" class="star empty">';
        }
    }
    return stars;
}

// Toggle item in cart
function toggleCart(flowerId) {
    const flower = flowersData.find(f => f.id === flowerId);

    if (!flower) return;

    if (flower.inCart) {
        // Remove from cart
        flower.inCart = false;
        cart = cart.filter(id => id !== flowerId);

    } else {
        // Add to cart
        flower.inCart = true;
        cart.push(flowerId);

    }

    // Update the specific card
    updateCard(flowerId);

    // Update cart count in navbar
    updateCartCount();


}

// Update a specific card's appearance
function updateCard(flowerId) {
    const flower = flowersData.find(f => f.id === flowerId);
    const cardElement = document.querySelector(`.card[data-id="${flowerId}"]`);

    if (!cardElement || !flower) return;

    // Update cart indicator
    const cartIndicator = cardElement.querySelector('.cart-indicator');
    const overlayButton = cardElement.querySelector('.card-overlay .btn');

    if (flower.inCart) {
        cartIndicator.classList.add('show');
        overlayButton.textContent = 'Remove from cart';
        overlayButton.className = 'btn btn-secondary';
    } else {
        cartIndicator.classList.remove('show');
        overlayButton.textContent = 'Add to cart';
        overlayButton.className = 'btn btn-primary';
    }
}

// Utility function to get cart count
function getCartCount() {
    return cart.length;
}

// Utility function to get cart items
function getCartItems() {
    return flowersData.filter(flower => cart.includes(flower.id));
}

// Update cart count display in navbar
function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Initialize navbar functionality
function initializeNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}