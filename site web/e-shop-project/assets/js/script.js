// This file contains the JavaScript functionality for the main E-Shop pages, including product management, cart functionality, and form handling.

document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const panierCount = document.getElementById('panier-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const contactForm = document.getElementById('contact-form');

    let cart = [];
    
    // Sample products (this would typically come from a database)
    const products = [
        { id: 1, name: 'Produit 1', price: 10.00 },
        { id: 2, name: 'Produit 2', price: 15.00 },
        { id: 3, name: 'Produit 3', price: 20.00 }
    ];

    // Function to display products
    function displayProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Prix: ${product.price}€</p>
                <button class="add-to-cart" data-id="${product.id}">Ajouter au Panier</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Function to add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            cart.push(product);
            updateCart();
        }
    }

    // Function to update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - ${item.price}€`;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
        panierCount.textContent = cart.length;
    }

    // Event listener for adding products to cart
    productsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(e.target.dataset.id);
        }
    });

    // Event listener for checkout button
    checkoutBtn.addEventListener('click', function() {
        alert('Merci pour votre commande!');
        cart = [];
        updateCart();
    });

    // Event listener for contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message envoyé!');
        contactForm.reset();
    });

    // Initial display of products
    displayProducts();
});