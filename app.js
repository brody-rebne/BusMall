'use strict'

//access html
var productContainer = document.getElementById('products');
var product1 = document.getElementById('product1');
var product2 = document.getElementById('product2');
var product3 = document.getElementById('product3');

var votesCt = 0;
var maxVotes = 25;

var index1 = null;
var index2 = null;
var index3 = null;


//constructor function for images
function Product(name, img) {
  this.name = name;
  this.img = img;
  this.views = 0;
  this.clicks = 0;
  Product.productArray.push(this);
}

//set constructor-level array for all products
Product.productArray = [];

//get random productArray index
function getRandomProduct() {
  var randomProduct = Math.floor(Math.random() * Product.productArray.length);
  return randomProduct;
}

//render products
function renderProducts() {
  do {
    index1 = getRandomProduct();
    index2 = getRandomProduct();
    index3 = getRandomProduct();
  } while(index1 === index2 || index1 === index3 || index2 === index3);
  
  //render product images
  product1.src = Product.productArray[index1].img;
  product2.src = Product.productArray[index2].img;
  product3.src = Product.productArray[index3].img;

  //track views on products
  Product.productArray[index1].views++;
  Product.productArray[index2].views++;
  Product.productArray[index3].views++;
}

//event handler
var handleClick = function(event) {
  var clickedProduct = event.target;
  console.log(event.target.id);
  //track votes only on product images
  if(clickedProduct !== productContainer) {
    votesCt++;
    //track votes on each product and add to product clicks
    if(clickedProduct === product1) {
      Product.productArray[index1].clicks++;
      console.log('index1 clicked');
    } else if(clickedProduct === product2) {
      Product.productArray[index2].clicks++;
      console.log('index2 clicked');
    } else if(clickedProduct === product3) {
      Product.productArray[index3].clicks++;
      console.log('index3 clicked');
    }
    
    if(votesCt >= maxVotes) {
      productContainer.removeEventListener('click', handleClick);
      alert('Thank you for participating in our survey. Your check is in the mail.');
  
      for(var i=0; i<Product.productArray.length; i++) {
        var printProduct = Product.productArray[i];
        console.log(`${printProduct.name} was selected ${printProduct.clicks} times with ${printProduct.views} views`);
      }
    } else {
      renderProducts();
    }
  } else {
    console.log('clicked outside of product images');
  }
}

//instantiate objects
new Product('Bag', '/img/bag.jpg');
new Product('Banana', '/img/banana.jpg');
new Product('Bathroom', '/img/Bathroom.jpg');
new Product('Boots', '/img/boots.jpg');
new Product('Breakfast', '/img/breakfast.jpg');
new Product('Bubblegum', '/img/bubblegum.jpg');
new Product('Chair', '/img/chair.jpg');
new Product('Cthulhu', '/img/cthulhu.jpg');
new Product('Dog Duck', '/img/dog-duck.jpg');
new Product('Dragon', '/img/dragon.jpg');
new Product('Pen', '/img/pen.jpg');
new Product('Pet Sweep', '/img/pet-sweep.jpg');
new Product('Scissors', '/img/scissors.jpg');
new Product('Shark', '/img/shark.jpg');
new Product('Sweep', '/img/sweep.png');
new Product('Tauntaun', '/img/tauntaun.jpg');
new Product('Unicorn', '/img/unicorn.jpg');
new Product('USB', '/img/usb.gif');
new Product('Water Can', '/img/water-can.jpg');
new Product('Wine Glass', '/img/wine-glass.jpg');

//render products
renderProducts();

//creating event listener
productContainer.addEventListener('click', handleClick);



//STRETCH GOALS
//reduce if/else statements from event handler
//recalculate indeces 1 by 1