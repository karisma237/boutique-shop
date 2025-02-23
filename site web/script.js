// Données des produits
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 1299.99,
        image: "https://images.pexels.com/photos/5741605/pexels-photo-5741605.jpeg"
    },
    {
        id: 2,
        name: "MacBook Pro M2",
        price: 1999.99,
        image: "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg"
    },
    {
        id: 3,
        name: "Sony WH-1000XM4",
        price: 349.99,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
    },
    {
        id: 4,
        name: "Apple Watch Series 8",
        price: 499.99,
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
    },
    {
        id: 5,
        name: "iPad Pro 12.9",
        price: 1099.99,
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"
    },
    {
        id: 6,
        name: "AirPods Pro",
        price: 249.99,
        image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg"
    }
];

// État du panier
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('panier');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('panier-count');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Afficher les produits
function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)}€</p>
                <button class="btn" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        showNotification('Produit ajouté au panier');
    }
}

// Mettre à jour l'affichage du panier
function updateCart() {
    // Mise à jour du compteur
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Mise à jour du contenu du panier
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)}€ x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');

    // Mise à jour du total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Mettre à jour la quantité
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Supprimer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Produit retiré du panier');
}

// Afficher/Masquer le panier
document.querySelector('.panier-icon').addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.toggle('active');
});

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Style de la notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'var(--secondary-color)',
        color: 'white',
        padding: '1rem',
        borderRadius: '4px',
        animation: 'slideIn 0.3s ease'
    });

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Gestion du formulaire de contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulation d'envoi du formulaire
    console.log('Données du formulaire:', data);
    showNotification('Message envoyé avec succès!');
    contactForm.reset();
});

// Gestion du checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Votre panier est vide');
        return;
    }
    
    // Simulation de la commande
    showNotification('Commande effectuée avec succès!');
    cart = [];
    updateCart();
    cartModal.classList.remove('active');
});

// Animation au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Gestion du menu mobile
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Fermer le menu mobile lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
    }
});

// Initialisation
window.addEventListener('load', () => {
    displayProducts();
    window.addEventListener('scroll', animateOnScroll);
});
