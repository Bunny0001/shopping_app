const CART = {
  KEY: 'bunnysecretcartid',
  contents: [],
  init(){
      let _contents = localStorage.getItem(CART.KEY);
      if(_contents){
          CART.contents = JSON.parse(_contents);
      }else{
          CART.contents = [];
          CART.sync();
      }
  },
  async sync(){
      let _cart = JSON.stringify(CART.contents);
      await localStorage.setItem(CART.KEY, _cart);
  },
  find(id){
      let match = CART.contents.filter(item=>{
          if(item.id == id)
              return true;
      });
      if(match && match[0])
          return match[0];
  },
  add(obj){
      if(CART.find(obj.id)){
          CART.increase(obj.id, 1);
      }
      else{  
              obj.count = 1;
              CART.contents.push(obj);
              CART.sync();
      }
  },
  increase(id, qty=1){
      CART.contents = CART.contents.map(item=>{
          if(item.id === id)
              item.count = item.count + qty;
          return item;
      });
      //update localStorage
      CART.sync()
  },
  empty(){
      CART.contents = [];
      CART.sync()
  }
};

var clothingCards = document.getElementById("clothingCards");
var accessoriesCards = document.getElementById("accessoriesCards");

// ___________________________________________




// ________________________________________________


function getClothingcardDataFromBackend(){
    CART.init();
    var cartCount = document.getElementById("cart-count");
    cartCount.innerHTML = CART.contents.length;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status===200){
                var response = JSON.parse(this.responseText)
                for (var i=0; i< response.length/2; i++){
                   clothingCards.appendChild(createItemCard(response[i].id , response[i].preview, response[i].name, response[i].brand, response[i].price))
                }
            }else{
                console.log('call failed')
            }
            
        }
    }
    http.open('GET' , 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', 'true')
    http.send()
}

getClothingcardDataFromBackend()

function getAccessoriescardDataFromBackend(){
  var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status===200){
                var response = JSON.parse(this.responseText)
                for (var i=5; i< response.length; i++){
                   accessoriesCards.appendChild(createItemCard(response[i].id , response[i].preview, response[i].name, response[i].brand, response[i].price))
                }
            }else{
                console.log('call failed')
            }
            
        }
    }
    http.open('GET' , 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', 'true')
    http.send()
}
getAccessoriescardDataFromBackend()



function createItemCard(id, preview, name, brand, price) {
  var cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", id);

  var cardLink = document.createElement("a");
  cardLink.href = "product.html?product_id=" + id;

  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img");

  var newImgElement = document.createElement("img");
  newImgElement.src = preview;

  imgContainer.appendChild(newImgElement);

  var deatils = document.createElement("div");
  deatils.setAttribute("class", "details");

  var newTitleElement = document.createElement("h3");
  var newName = document.createTextNode(name);

  newTitleElement.appendChild(newName);
  deatils.appendChild(newTitleElement);

  var newBrandElement = document.createElement("h4");
  var newBrand = document.createTextNode(brand);

  newBrandElement.appendChild(newBrand);
  deatils.appendChild(newBrandElement);

  var newPriceElement = document.createElement("h5");
  var newPriceText = document.createTextNode("Rs ");
  var newPrice = document.createTextNode(price);
  newPriceElement.appendChild(newPriceText);

  newPriceElement.appendChild(newPrice);
  deatils.appendChild(newPriceElement);

  cardLink.appendChild(imgContainer);
  cardLink.appendChild(deatils);

  cardElement.appendChild(cardLink);

  return cardElement;
}


//Creating Product page Dynamically.....//
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


