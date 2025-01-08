document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = []; // Array to hold cart items
    let products = []; // Array to hold all products

    // Fetch products dynamically
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            products = data; // Store fetched products in the array
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });

    // Add to Cart
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            alert("Product not found!");
            return;
        }

        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; // Increment quantity if already in cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item to cart
        }
        updateCart();
    };

    // Clear Cart
    clearCartButton.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    // Update Cart
    function updateCart() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Total items in cart
        cartItems.innerHTML = ""; // Clear cart display
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemDiv);
        });
        totalPrice.textContent = total.toFixed(2); // Update total price
    }
});