if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var remove = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < remove.length; i++) {
        var button = remove[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(event) {
    alert('Thankyou for your purchase')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
        updateCartTotal()
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    console.log(title)
    console.log(price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames= cartItems.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('This item is Already added to the cart!!')
            return
        }
    }
    var cartRowContents = `
            <div class="cart-item cart-column">
                    <img class="cart-item-img" src="${imageSrc}" width="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" role="button">Remove</button>
                </div>`
                cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)

}
function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartRow = buttonClicked.parentElement.parentElement;
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var currentQuantity = parseInt(quantityElement.value);

    if (currentQuantity > 1) {
        // Decrease quantity by 1
        quantityElement.value = currentQuantity - 1;
    } else {
        // Remove the row if the quantity is 1
        cartRow.remove();
    }

    updateCartTotal(); // Recalculate the total price
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = document.getElementsByClassName('cart-row')
    console.log(cartRows);
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('class-total-price')[0].innerText = '₹' + total
}