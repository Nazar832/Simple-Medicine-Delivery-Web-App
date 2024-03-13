async function displayCart() {
    const medicineItems = JSON.parse(localStorage.getItem('cart') || "[]");
    if (medicineItems.length === 0) {
      return;
    }
    
    let totalPrice = 0;
    const medicineItemsContainer = document.getElementById('order-items');

    for (i = 0; i < medicineItems.length; i++) {
      const medicineItem = medicineItems[i];
      const medicineItemElement = document.createElement('li');

      medicineItemElement.innerHTML = `
        <img src="/images/${medicineItem.imageName}" width="300" height="150" alt="${medicineItem.name}">
        <h3>${medicineItem.name}</h3>
        <p>Price: ${medicineItem.price}$</p>
        <input class="numberOfmedicineItems" onchange="updateCartElementQuantity(this, ${medicineItem.id});" type="number" min="1" max="100" value="1">
        <button onclick="removeFromCart(${medicineItem.id})">Remove</button>`;

        medicineItemsContainer.appendChild(medicineItemElement);
    }
    
    calcTotalPrice();
  }

  function calcTotalPrice()
  {
    let totalPrice = 0;
    const items = JSON.parse(localStorage.getItem('cart'));
    for (const item of items){
      totalPrice += item.price * item.quantity;
    }
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice.toFixed(2); 
  }

  function updateCartElementQuantity(input, itemId) {
    const items = JSON.parse(localStorage.getItem('cart'));
    for (const item of items){
      if (item.id === itemId){
        item.quantity = input.value;
      }
    }
    localStorage.setItem('cart', JSON.stringify(items));

    calcTotalPrice();
  }

  function removeFromCart(itemId) {
    const items = JSON.parse(localStorage.getItem('cart'));
    let position;
    for (i = 0; i < items.length; i++){
      if (items[i].id === itemId){
        position = i;
        break;
      }
    }
    
    const listOfItems = document.querySelectorAll('#order-items li');
    listOfItems[position].remove();
    items.splice(position, 1);
    localStorage.setItem('cart', JSON.stringify(items));

    calcTotalPrice();
  }
  
  async function submitOrder() {
    const items = JSON.parse(localStorage.getItem('cart') || "[]");
    if (items.length === 0){
      alert('Add some medicines to the cart before submitting the order');
      return;
    }

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');

    if (name.value === '' || email.value === '' || phone.value === '' || address.value === '') {
        alert('You have to fill all the fields of the form');
        return;
    }

    const inputs = [name, email, phone, address];
    for (const input of inputs) {
      const result = validate(input);
      if (result[0] === false) {
        alert(result[1]);
        return;
      };
    }
  
    const orderItemsContainer = document.querySelectorAll('#order-items input');

    const orderItems = [];
    
    for (const item of items)
    {
      orderItem = {
        quantity: item.quantity, 
        medicine_item_id: item.id
      };
      orderItems.push(orderItem);
    }
    
    const order = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      orderItems: orderItems, 
    };
  
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        localStorage.removeItem('items');
        alert('Order submitted successfully!');
      } else if (response.status === 400){
        alert('Invalid name or address for the user with such email and phone.');
      }       
    } catch (error) {
      alert('An error occurred while submitting the order.');
    }
  }