'use strict'

//access html
var productContainer = document.getElementById('products');
var product1 = document.getElementById('product1');
var product2 = document.getElementById('product2');
var product3 = document.getElementById('product3');

var renderedProducts = 3;
var votesCt = 0;
var maxVotes = 25; //MAX VOTES

var index1 = null;
var index2 = null;
var index3 = null;

var indexAttribute = document.createAttribute('index');

randomIndices = [];

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
function getRandomIndex() {
  var randomIndex = Math.floor(Math.random() * Product.productArray.length);
  return randomIndex;
}

//render products
var randomIndices = [];

function getRandomIndices() {
  var found = false;
  while(randomIndices.length < (2 * renderedProducts)) {
    var randomIndex = getRandomIndex();
    for(var i=0; i<randomIndices.length; i++) {
      found = false;
      if(randomIndices[i] === randomIndex) {
        found = true;
        break;
      }
    }
    if(found === false) {
      randomIndices.unshift(randomIndex);
    }
  }
  console.log(randomIndices);
  while(randomIndices.length > renderedProducts) {
    randomIndices.pop();
  }
}

//render product images
function renderProducts() {
  // for(i=0; i<renderedProducts; i++);
  getRandomIndices();
  product1.src = Product.productArray[randomIndices[0]].img;
  product1.setAttribute('index', randomIndices[0]);
  product2.src = Product.productArray[randomIndices[1]].img;
  product2.setAttribute('index', randomIndices[1]);
  product3.src = Product.productArray[randomIndices[2]].img;
  product3.setAttribute('index', randomIndices[2]);

  //track views on products
  Product.productArray[randomIndices[0]].views++;
  Product.productArray[randomIndices[1]].views++;
  Product.productArray[randomIndices[2]].views++;
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
      Product.productArray[randomIndices[0]].clicks++;
      console.log('index1 clicked');
    } else if(clickedProduct === product2) {
      Product.productArray[randomIndices[1]].clicks++;
      console.log('index2 clicked');
    } else if(clickedProduct === product3) {
      Product.productArray[randomIndices[2]].clicks++;
      console.log('index3 clicked');
    }
    //remove event listener when max votes reached
    if(votesCt >= maxVotes) {
      productContainer.removeEventListener('click', handleClick);
      alert('Thank you for participating in our survey. Your check is in the mail.');
      //log results in console
      for(var i=0; i<Product.productArray.length; i++) {
        var printProduct = Product.productArray[i];
        console.log(`${printProduct.name} was selected ${printProduct.clicks} times with ${printProduct.views} views`);
      }
      renderChart();
    //rerender products if votes arent maxed
    } else {
      renderProducts();
    }
  //failstate for misclick
  } else {
    console.log('clicked outside of product images');
  }
}

function renderChart() {
  var labelData = [];
  var viewData = [];
  var clickData = [];
  var perData = [];
  var clicksPerView = 0;
  for(var i=0; i<Product.productArray.length; i++) {
    labelData.push(Product.productArray[i].name);
    viewData.push(Product.productArray[i].views);
    clickData.push(Product.productArray[i].clicks);
    clicksPerView = (Product.productArray[i].clicks/Product.productArray[i].views);
    perData.push(clicksPerView.toFixed(1));
  }
  var ctx = document.getElementById('chart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: 'Times Clicked',
        data: clickData,
        backgroundColor: 'Red',
      }, {
        label: 'Times Viewed',
        data: viewData,
        backgroundColor: 'Blue',
      }, {
        label: 'Clicks/View',
        data: perData,
        backgroundColor: 'Purple',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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