document.addEventListener('DOMContentLoaded', () => {
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = btn.getAttribute('data-name');
            const itemPrice = btn.getAttribute('data-price');

            // Simple alert to simulate cart addition
            alert(`${itemName} added to your cart for Rs. ${itemPrice}!`);

            // In a real app, we would save this to localStorage or a backend
            let cart = JSON.parse(localStorage.getItem('resellCart')) || [];
            cart.push({ name: itemName, price: parseFloat(itemPrice) });
            localStorage.setItem('resellCart', JSON.stringify(cart));

            // Update cart count if exists
            const cartLink = document.querySelector('a[href="cart.html"]');
            if (cartLink) {
                cartLink.textContent = `Cart (${cart.length})`;
            }
        });
    });

    // Update cart link on page load
    const cart = JSON.parse(localStorage.getItem('resellCart')) || [];
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink && cart.length > 0) {
        cartLink.textContent = `Cart (${cart.length})`;
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
                isValid = false;
            } else {
                document.getElementById('nameError').textContent = '';
            }

            if (!email.includes('@') || !email.includes('.')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email.';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }

            if (message.length < 10) {
                document.getElementById('msgError').textContent = 'Message must be at least 10 characters.';
                isValid = false;
            } else {
                document.getElementById('msgError').textContent = '';
            }

            if (isValid) {
                alert('Thank you for contacting us! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Checkout Form Validation
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        // Populate cart items if on cart page
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalContainer = document.getElementById('cartTotal');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                cartTotalContainer.textContent = 'Rs. 0.00';
            } else {
                let total = 0;
                cart.forEach((item, index) => {
                    total += item.price;
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
                        <span>${item.name}</span>
                        <span>Rs. ${item.price.toFixed(2)}</span>
                        <button class="remove-btn btn" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" data-index="${index}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(div);
                });
                cartTotalContainer.textContent = `Rs. ${total.toFixed(2)}`;

                // Remove item functionality
                document.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const index = parseInt(e.target.getAttribute('data-index'));
                        cart.splice(index, 1);
                        localStorage.setItem('resellCart', JSON.stringify(cart));
                        window.location.reload();
                    });
                });
            }
        }

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before ordering.');
                return;
            }

            const address = document.getElementById('address').value.trim();
            if (address.length < 5) {
                document.getElementById('addressError').textContent = 'Please provide a valid shipping address.';
                return;
            }

            alert('Order placed successfully! Thank you for shopping sustainable.');
            localStorage.removeItem('resellCart');
            window.location.href = 'index.html';
        });
    }
});
