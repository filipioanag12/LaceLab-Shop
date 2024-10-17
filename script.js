const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}


/*JS for cart*/

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.querySelectorAll('.fa-square-minus');
  removeCartItemButtons.forEach(button => {
      button.addEventListener('click', removeCartItem);
  });

  var quantityInputs = document.querySelectorAll('input[type="number"]');
  quantityInputs.forEach(input => {
      input.addEventListener('change', quantityChanged);
  });

  document.querySelector('.normal').addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  var cartItems = document.querySelector('tbody');
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.closest('tr').remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.querySelector('tbody');
  var cartRows = cartItemContainer.querySelectorAll('tr');
  var total = 0;
  
  cartRows.forEach(row => {
      var priceElement = row.querySelector('td:nth-child(4)');
      var quantityElement = row.querySelector('input[type="number"]');
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total += price * quantity;

      row.querySelector('td:nth-child(6)').innerText = `$${(price * quantity).toFixed(2)}`;
  });

  total = Math.round(total * 100) / 100;
  document.querySelector('#subtotal table tr:last-child td:last-child').innerText = `$${total}`;
}
