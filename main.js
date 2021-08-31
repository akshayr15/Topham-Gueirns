if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
let productList = JSON.parse(localStorage.getItem("productList"))
  ? JSON.parse(localStorage.getItem("productList"))
  : [];
function ready() {
  let removeCartButtons = [];
  removeCartButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let remove = removeCartButtons[i];
    remove.addEventListener("click", removeCart);
  }
  let cartInput = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < cartInput.length; i++) {
    let input = cartInput[i];
    input.addEventListener("change", quantityChanged);
  }
  let cartButtons = document.getElementsByClassName("btn-primary");
  for (let i = 0; i < cartButtons.length; i++) {
    let cartButton = cartButtons[i];
    cartButton.addEventListener("click", getItemValue);
  }

  let getProducList = JSON.parse(localStorage.getItem("productList"));
  if (getProducList != null) {
    for (let i = 0; i < getProducList.length; i++) {
      console.log(getProducList[i].itemName);
      console.log(getProducList[i].itemPrice);
      console.log(getProducList[i].itemImage);
      addToCartReady(
        getProducList[i].itemImage,
        getProducList[i].itemName,
        getProducList[i].itemPrice
      );
    }
  }

  updateCart();
}
function getItemValue(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let itemName = shopItem.getElementsByClassName("card-title")[0].innerText;
  let itemPrice = shopItem.getElementsByClassName("card-text")[0].innerText;
  let itemImage = shopItem.getElementsByClassName("card-img-top")[0].src;
  productList.push({ itemName, itemPrice, itemImage });
  localStorage.setItem("productList", JSON.stringify(productList));
  addToCart(itemImage, itemName, itemPrice);
  updateCart();
}
function addToCart(itemImage, itemName, itemPrice) {
  let cartRow = document.createElement("div");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == itemName) {
      alert("This item is already added to the cart");
      return;
    }
  }

  cartRow.innerHTML = `
  <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${itemImage}" width="100" height="100">
                <span class="cart-item-title">${itemName}</span>
            </div>
            <span class="cart-price cart-column">${itemPrice}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
                </div>        
            </div>
  `;

  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCart);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", updateCart);
  alert("Product Added Successfully");
}
function addToCartReady(itemImage, itemName, itemPrice) {
  let cartRow = document.createElement("div");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  cartRow.innerHTML = `
  <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${itemImage}" width="100" height="100">
                <span class="cart-item-title">${itemName}</span>
            </div>
            <span class="cart-price cart-column">${itemPrice}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
                </div>        
            </div>
  `;

  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCart);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", updateCart);
}
function quantityChanged(event) {
  let actualInput = event.target;
  if (isNaN(actualInput.value) || actualInput.value < 0) {
    actualInput.value = 1;
  }
  updateCart();
}
function removeCart(event) {
  event.target.parentElement.parentElement.remove();
  let cart = event.target.parentElement.parentElement.innerText;
  let cartTitle = cart.trim().replaceAll("\n", "").split("$");
  let cartTitleText = cartTitle[0].trim();
  let removeditems = [];
  removeditems.push(cartTitleText);
  let finallist = [];
  productList.forEach((element) => {
    if (!removeditems.includes(element.itemName)) {
      finallist.push(element);
    }
  });
  localStorage.setItem("productList", JSON.stringify(finallist));
  location.reload();
  updateCart();
}
function updateCart() {
  let cartItem = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItem.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let price = priceElement.innerHTML.replace("$", "");
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
let purchase = document.getElementsByClassName("btn-success")[0];
purchase.addEventListener("click", function () {
  localStorage.clear();
  alert("Thanks For Shopping");
  location.reload();
});
