var header = `<nav class="navbar container-fluid p-2 navbar-expand-lg ">
<a class="navbar-brand" href="#"><img src="image/shop.webp" style="max-height: 50px; border-radius:50%;"></a>
<div class="collapse navbar-collapse" id="navbarScroll">
    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="index.html">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active text-light" href="product.html">Products</a>
        </li>
        <li class="nav-item">
        <a class="nav-link active text-light" href="Wishlist.html">Wishlist</a>
    </li>
    </ul>
    <ul class="navbar-nav mx-2  " style="--bs-scroll-height: 100px;">
    <li class="nav-item">
    <a href="cart.html" class="btn btn-outline-secondary" style="background-color: #grey; color: #fff;">Buy Now!
    <i class="ri-shopping-cart-fill" style="color: #fff;"></i>
    <span id="cartCountBadge" class="badge" style="background-color: white; color: black;"></span>
</a>

</li>

    </ul>
</div>
</nav>`
;

function updateCartCount() {
    var cartCount = document.getElementById('cartCountBadge');
    if (cartCount) {
        var totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalCount > 0 ? totalCount : ''; // Show count only if it's greater than 0
    }
}

function updateCartCount() {
    var cartCount = document.getElementById('cartCountBadge');
    if (cartCount) {
        var uniqueProductCount = new Set(cartItems.map(item => item.name)).size;
        cartCount.innerText = uniqueProductCount > 0 ? uniqueProductCount : '';
    }
}


function RemoveOne(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

document.getElementById("header").innerHTML = header;

var cartItems = [];
const cartItemsJson = localStorage.getItem('cartItems');

if (cartItemsJson) {
    cartItems = JSON.parse(cartItemsJson);
}
var productList = [{
    image: '1.jpeg',
    name: 'perfume',
    price: 100,
    description: 'perfect for any occasion',

},
{
    image: "2.jpeg",
    name: 'purse',
    price: 200,
    description: 'Stylish and functional ladies',

},
{
    image: '3.jpeg',
    name: 'shoes',
    price: 300,
    description: 'comfort for every step',
},
{
    image: '4.jpg',
    name: 'watches',
    price: 400,
    description: 'Timeless sophistication',
},
{
    image: '5.jpeg',
    name: 'Serum',
    price: 500,
    description: 'radiant and youthful glow.',
},
{
    image: '6.jpg',
    name: 'nourishing cream',
    price: 600,
    description: 'radiant and youthful glow.',
},
{
    image: "7.jpeg",
    name: 'headphones',
    price: 700,
    description: ' premium sound quality',

},
{
    image: "8.jpeg",
    name: 'Radio',
    price: 800,
    description: 'crystal-clear sound',

},
{
    image: "9.jpg",
    name: 'Plant',
    price: 900,
    description: ' our vibrant plant',

},
{
    image: "10.jpg",
    name: 'Cup',
    price: 1000,
    description: 'Sip in style with our chic cup',

},


];


if (document.getElementById('productWrapper')) {
    var productHtml = "";

    for (i = 0; i < productList.length; i++) {    
        var productData = ` 
    <div class="col-2 m-3 p-5">
        <div class="card text-center bg-light " style="width: 18rem;">
            <img src="image/${productList[i].image}" class="card-img-top rounded" alt="..." style="max-width: 100%; height: 250px; border:3px solid black">
            <div class="card-body">
                <h5 class="card-title">${productList[i].name}</h5>
                <p class="card-text">$${productList[i].price}</p>
                <p class="card-text text-center">${productList[i].description}</p>
                <a onclick="AddToCart('${productList[i].name}','${productList[i].image}',${productList[i].price});" class="btn btn-dark">Add to cart</a>

                <a onclick="AddToCart('${productList[i].name}','${productList[i].image}',${productList[i].price});" class="btn btn-dark"><i class="fa-solid fa-heart"></i></a>
            </div>
        </div>
    </div>`;

        productHtml = productHtml + productData;
    }
    document.getElementById('productWrapper').innerHTML = productHtml;

    function AddToCart(name, image, price) {

        const filteredArray = cartItems.filter(item => item.name === name);

        if (filteredArray.length > 0) {
            filteredArray[0].quantity++;
        } else {
            var productData = {
                image: image,
                name: name,
                price: price,
                quantity: 1
            };
            cartItems.push(productData);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    function updateCartCount() {
        var cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }


}



if (document.getElementById('cart-wrapper')) {
    BindCartItems();
}

function BindCartItems() {
    var cartHtml = "";
    var totalPrice = 0;
    
  
    for (i = 0; i < cartItems.length; i++) {
        var cartData = `
          <tr>
          <th><img src="image/${cartItems[i].image}" class="card-img-top rounded" alt="..." style="max-width: 50px;"></th>
              <td>${cartItems[i].name}</td>
              <td>$${cartItems[i].price}</td>
              <td>${cartItems[i].quantity}</td>
              <td>${cartItems[i].quantity * cartItems[i].price}</td>
            
              <td><button class="btn btn-success" onclick="AddOne(${i})"><i class="fa-solid fa-plus">+</i></button></td>
              <td><button class="btn btn-danger" onclick="RemoveOne(${i})"><i class="ri-delete-bin-line"></i></button></td>
          </tr>`;
        cartHtml = cartHtml + cartData;

        totalPrice += cartItems[i].quantity * cartItems[i].price;
    }
    document.getElementById('cart-wrapper').innerHTML = cartHtml;
    updateCartCount();
    updateTotalPrice(totalPrice);
}
function updateTotalPrice(totalPrice) {
    var totalPriceElement = document.getElementById('total-price');

    if (totalPriceElement) {
        totalPriceElement.innerHTML = `$${totalPrice.toFixed(2)}`;
    }
}

function updateCart() {
    BindCartItems();
}


function AddOne(index) {
    cartItems[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    BindCartItems();
}

function RemoveOne(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    BindCartItems();
}
function clearCart() {
    // Remove all items from the cart
    cartItems = [];
    // Update the total displayed on the webpage
    updateTotalPrice(0);
    // Update the cart count badge
    updateCartCount();
    // Update the localStorage
    localStorage.removeItem('cartItems');
    // Refresh the cart display
    BindCartItems();
}
