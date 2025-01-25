const products = [
    { id: 1, name: "Anjeer(Badam)", price: 550 , src:"0014456_fig-anjeer_370.png"},
    { id: 2, name: "Raisin(Kishmish)", price: 125, src:"0014454_raisin-kishmish_370.png"} ,
    { id: 3, name: "Almond(Badam)", price: 200, src:"0014453_almond-badam_370.png"} ,
    { id: 4, name: "Cashew(Kaju)", price: 400, src:"0014452_cashew-kaju_370.png"},
    { id: 5, name: "Walnut(Akhrot-magaj)", price: 350, src:"0014455_walnut-akhrot-magaj_370.png"},
    { id: 6, name: "Pistachio(Pista)", price: 325, src:"0014457_pistachio-pista_370.png"},
    { id: 7, name: "Hazelnut", price:400 , src:"0014459_hazelnut_370.png"},
    { id: 8, name: "Pecan Nut", price: 600, src:"0014460_pecan-nut_370.png"},
    { id: 9, name: "Pinenut(Chilgoza)", price: 1625 , src:"0014461_pinenut-chilgoza_370.jpeg"}

  ];
  
  let cart = [];
  
  // Display products
  const productContainer = document.querySelector(".products");
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.src}" width="200px" height="200px"/ > 
      <h3>${product.name}</h3>
      <p>Price: Rs ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  });
  
  // Add to cart
  function addToCart(id, name, price) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    displayCart();
  }
  
  // Display cart
  function displayCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        ${item.name} - Rs ${item.price.toFixed(2)} x ${item.quantity}
        <button onclick="updateQuantity(${index}, 'decrease')">-</button>
        <button onclick="updateQuantity(${index}, 'increase')">+</button>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(itemDiv);
    });
  
    document.getElementById("total-price").textContent = `Total: Rs ${total.toFixed(2)}`;
  }
  
  // Update quantity
  function updateQuantity(index, action) {
    if (action === "increase") {
      cart[index].quantity += 1;
    } else if (action === "decrease" && cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    }
    displayCart();
  }
  
  // Remove from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
  }
  
  // Checkout
  const modal = document.getElementById("receipt-modal");
  const receiptDetails = document.getElementById("receipt-details");
  
  document.getElementById("checkout-btn").addEventListener("click", () => {
    receiptDetails.innerHTML = cart.map(
      (item) => `${item.name} - Rs ${item.price.toFixed(2)} x ${item.quantity}`
    ).join("<br>");
    modal.classList.remove("hidden");
  });
  
  document.getElementById("confirm-btn").addEventListener("click", () => {
    alert("Purchase confirmed!");
    cart = [];
    displayCart();
    modal.classList.add("hidden");
  });
  
  document.getElementById("close-modal-btn").addEventListener("click", () => {
    modal.classList.add("hidden");
  });