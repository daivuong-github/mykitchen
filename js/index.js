
let products = [
   {
      name: 'Stand Mixer',
      tag: 'standmixer',
      price: 5,
      inCart: 0
   },
   {
      name: 'Slot Toaster',
      tag: 'slottoaster',
      price: 7,
      inCart: 0
   },
   {
      name: 'Electric Kettle',
      tag: 'electrickettle',
      price: 8,
      inCart: 0
   },

];

var removeCartItemButtons = document.getElementsByClassName('btn-danger')

console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
     var button = removeCartItemButtons[i]
     button.addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
     })
   }


     var quantityInputs = document.getElementsByClassName('cart-quantity-input')
     for (var i=0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
     } 


function quantityChanged (event) {       // check for NaN and negative quantity
   var input = event.target
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
   }
}

let carts = document.getElementsByClassName ('btn-primary');
for (let i=0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);  
      totalCost(products[i])                          // function when click to add items
   })
}

function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   if (productNumbers) {
      document.querySelector('.cart').textContent = productNumbers;
   }
}


// local storage google chrome
function cartNumbers(product) {

   console.log("the product clicked is", product);

   let productNumbers = localStorage.getItem('cartNumbers');  // productNumbers from local storage is a string
   // console.log(typeof productNumbers);
   productNumbers = parseInt(productNumbers);    // need to convert string back to number
   
   if (productNumbers) {                        
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart').textContent = productNumbers + 1;
   } else {
      localStorage.setItem('cartNumbers', 1);     // initialise to 1 when first time to avoid NaN
      document.querySelector('.cart').textContent = 1;
   }

   setItems(product);
}

function setItems(product) {
   let cartItems = localStorage.getItem("productsInCart");
               // before Parse
   cartItems = JSON.parse(cartItems);
               // after parse

   if(cartItems != null) {

      if(cartItems[product.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [product.tag]:product
         }
      }
      cartItems[product.tag].inCart += 1; 
   } else {
      product.inCart = 1;
      cartItems = {
         [product.tag]: product
      } 
   }   

   localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product) {
   //  console.log("the product price is", product.price);
   // let cartCost = localStorage.getItem("totalCost");
   // console.log("my cartCost is", cartCost);
   // console.log(typeof cartCost);

   let cartCost = localStorage.getItem("totalCost");


   console.log("my cartCost is", cartCost);

   if(cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
   } else {

     localStorage.setItem("totalCost",product.price);
   }
}

function displayCart() {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);

   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem("totalCost");

   if(cartItems && productContainer) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map(item => {
      });
               // display Cart shopping total
      productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">Shopping Cart Total</h4>
      <h4 class="basketTotal">
         $${cartCost},00
      </h4>    
      </div>
   `;
   }

}

onLoadCartNumbers();
displayCart();
