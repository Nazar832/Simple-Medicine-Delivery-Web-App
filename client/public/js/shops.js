  let medicines = [];
  let shopName = '';
  let favoriteMedicinesJsonString = localStorage.getItem('favoriteMedicines');
  if (!favoriteMedicinesJsonString) localStorage.setItem('favoriteMedicines', JSON.stringify([]));
  
  async function displayShops() {
    const response = await fetch('/api/shops');

    if (response.status === 500) {
      alert('Error when downloading the list of shops');
      return;
    }

    const shops = await response.json();
    const shopsContainer = document.getElementById('shops');

    shops.forEach((shop) => {
      const shopElement = document.createElement('li');
      shopElement.innerHTML = `
        <button onclick="displayMedicineItems('${shop.name}')">${shop.name}</button>`;
      shopsContainer.appendChild(shopElement);
    });
  }

  async function displayMedicineItems(shopName_) {
    shopName = shopName_;

    const params = {
      shopName: shopName,
    };
    
    const queryParams = new URLSearchParams(params).toString();
    const url = `/api/medicines?${queryParams}`;
    const response = await fetch(url);

    if (response.status === 500) {
      alert('Error when downloading the list of medicines');
      return;
    }

    medicines = await response.json();

    sortMedications();
  }

  function sortMedications() {
    if (medicines.length !== 0) {
      const sortByPriceCheckbox = document.getElementById("sort-by-price");

      const sortedPharmacies = medicines.slice();

      let favoriteMedicines = JSON.parse(localStorage.getItem('favoriteMedicines'));

      
      sortedPharmacies.sort((a, b) => {
        if (favoriteMedicines.includes(a.id) && !favoriteMedicines.includes(b.id)) {
            return -1;
        } else if (!favoriteMedicines.includes(a.id) && favoriteMedicines.includes(b.id)) {
            return 1;
        } else {
          return sortByPriceCheckbox.checked ? a.price - b.price : a.id - b.id;
        }
      });

      displayMedicines(sortedPharmacies);
    }
}
  
function handleFavoriteClick(event, id) {
  console.log('yeeees');
  const likeSvgElement = event.target.parentElement;

  let favoriteMedicines = JSON.parse(localStorage.getItem('favoriteMedicines'));

  if (likeSvgElement?.getAttribute('fill') === "red") {
    favoriteMedicines = favoriteMedicines.filter(item => item !== id);
    likeSvgElement.setAttribute('fill', "#ff000078");
  } else {
    favoriteMedicines.push(id);
    likeSvgElement?.setAttribute('fill', "red");
  }
  localStorage.setItem('favoriteMedicines', JSON.stringify(favoriteMedicines));
}

  function displayMedicines(medicineItems) {
    const medicinesContainer = document.getElementById('medicine-items');
    
    medicinesContainer.innerHTML = '';
    medicineItems.forEach((medicineItem) => {
      const medicineItemElement = document.createElement('li');

      medicineItemElement.innerHTML = `<img src="/images/${medicineItem.image_name}" width="300" height="150" alt="${medicineItem.name}">`

      const favorite = JSON.parse(localStorage.getItem('favoriteMedicines')).includes(medicineItem.id);

      const likeSvgElement = document.createElement('div');
      likeSvgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill="${favorite ? 'red' : '#ff000078'}" width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
        </svg>
      `;

      const pathElement = likeSvgElement.querySelector('path');
      pathElement.addEventListener('click', (event) => handleFavoriteClick(event, medicineItem.id));

      medicineItemElement.appendChild(likeSvgElement);


      const h3Element = document.createElement('h3');
      const pElement = document.createElement('p');
      const buttonElement = document.createElement('button');

      h3Element.textContent = medicineItem.name;
      pElement.textContent = `${medicineItem.price}$`;
      buttonElement.textContent = 'Add to cart';
      buttonElement.addEventListener('click', () => addToCart(medicineItem.id, medicineItem.name, medicineItem.price, medicineItem.image_name, shopName));

      medicineItemElement.appendChild(h3Element);
      medicineItemElement.appendChild(pElement);
      medicineItemElement.appendChild(buttonElement);
        
      medicinesContainer.appendChild(medicineItemElement);
    });
  }

  function addToCart(itemId, itemName, itemPrice, imageName, shopName) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    for (const cartItem of cart){
      if (cartItem.id === itemId) {
        alert('This item is already in the cart');
        return;
      } else if (shopName != cartItem.shopName) {
        alert('You can add to cart only the medicines from one and the same shop');
        return;
      }
    }

    const cartItem = {id: itemId, name: itemName, shopName: shopName, price: itemPrice, quantity: 1, imageName: imageName};
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
  }