// PRODUCT DATA
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 15000,
        desc: "Latest Android phone",
        img: "https://via.placeholder.com/250"
    },
    {
        id: 2,
        name: "Headphones",
        price: 2000,
        desc: "Noise cancelling",
        img: "https://via.placeholder.com/250"
    },
    {
        id: 3,
        name: "Laptop",
        price: 50000,
        desc: "High performance laptop",
        img: "https://via.placeholder.com/250"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DISPLAY PRODUCTS
const productList = document.getElementById("product-list");

products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <h4>₹${p.price}</h4>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
});

// ADD TO CART
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, qty: 1});
    }
    updateCart();
}

// UPDATE CART
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.name} (₹${item.price})</p>
            <button onclick="changeQty(${item.id}, -1)">-</button>
            ${item.qty}
            <button onclick="changeQty(${item.id}, 1)">+</button>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    document.getElementById("cart-total").innerText = total;
    document.getElementById("cart-count").innerText = cart.length;
}

// CHANGE QUANTITY
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    updateCart();
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

// TOGGLE CART
function toggleCart() {
    document.getElementById("cart").classList.toggle("hidden");
}

// CHECKOUT
function showCheckout() {
    document.getElementById("checkout").classList.remove("hidden");
}

// PLACE ORDER
function placeOrder(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;

    let summary = `Thank you ${name}! Your order includes:<br>`;

    cart.forEach(item => {
        summary += `${item.name} x ${item.qty}<br>`;
    });

    document.getElementById("order-summary").innerHTML = summary;

    cart = [];
    updateCart();

    document.getElementById("confirmation").classList.remove("hidden");
}