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

function getproductPageDataFromBackend(){
    var http = new XMLHttpRequest();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    var productId = parseURL(params);
    var url = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId;
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status===200){
                var response = JSON.parse(this.responseText);
                getDOMTree(response);
            }else{
                console.log('call failed')
            }
            
        }
    }
    http.open('GET' , url, 'true')
    http.send()
}

function parseURL(params){
  return params.product_id;
}

function getDOMTree(obj){
  CART.init();
  var cartCount = document.getElementById("cart-count");
  cartCount.innerHTML = CART.contents.length;
  var mainSection = document.getElementById("product-detail");
    var lhs = document.createElement("div");
    lhs.id= "left-section";
    var lhsImage = document.createElement("img");
    lhsImage.id = "image-preview";
    lhsImage.src = obj.preview;
    lhsImage.alt = "Preview-Image";
    lhs.appendChild(lhsImage);
    mainSection.appendChild(lhs)
   
    var rhs = document.createElement("div");
    rhs.id = "right-section";
    
    var h1 = document.createElement("h1");
    h1.id="name";
    h1.innerHTML = obj.name;
    rhs.appendChild(h1);
  
    var h3Brand = document.createElement("h3");
    h3Brand.id = "brand";
    h3Brand.innerHTML = obj.brand;
    rhs.appendChild(h3Brand);
  
    var h3Price = document.createElement("h3");
    h3Price.id = "price-header"
    h3Price.innerText = "Price: Rs ";
    var span = document.createElement("span");
    span.id = "price";
    span.innerHTML = obj.price;
    h3Price.appendChild(span);
    rhs.appendChild(h3Price);
  
    var h3desc = document.createElement("h3");
    h3desc.innerHTML = "Description";
    rhs.appendChild(h3desc);
  
    var p = document.createElement("p");
    p.id = "description";
    p.innerHTML = obj.description;
    rhs.appendChild(p);
  
    var h3Preview = document.createElement("h3");
    h3Preview.innerHTML = "Product Preview";
    rhs.appendChild(h3Preview);
  
    var thumbnail = document.createElement("div");
    thumbnail.id = "thumbnail";
    var imgID="";
    for(var i=0; i<obj.photos.length;i++){
      var img = document.createElement("img");
      imgID = "img"+i;
      img.id = imgID;
      if(i===0){
        img.className = "border";
      }
      img.src = obj.photos[i];
      img.alt = "preview"+ i; 
      thumbnail.appendChild(img);
    }
    rhs.appendChild(thumbnail);
  
    var btn = document.createElement("button");
    btn.id = "add2cart";
    btn.innerHTML = "Add to Cart";
    btn.addEventListener("click", function(){
      CART.add(obj);
      var cartCount = document.getElementById("cart-count");
      cartCount.innerHTML = CART.contents.length;
    })
    rhs.appendChild(btn);
  
    mainSection.appendChild(rhs);
  
    function removeBorder(){
      img0.classList.remove("border");
      img1.classList.remove("border");
      img2.classList.remove("border");
      img3.classList.remove("border");
      img4.classList.remove("border");
      
    }
  
    var img0 = document.getElementById("img0");
    img0.addEventListener("click", function(){
      removeBorder();
      img0.className = "border";
      lhsImage.src = img0.src;
    })
  
    var img1 = document.getElementById("img1");
    img1.addEventListener("click", function(){
      removeBorder();
      img1.className = "border";
      lhsImage.src = img1.src;
    })
  
    var img2 = document.getElementById("img2");
    img2.addEventListener("click", function(){
      removeBorder();
      img2.className = "border";
      lhsImage.src = img2.src;
    })
  
    var img3 = document.getElementById("img3");
    img3.addEventListener("click", function(){
      removeBorder();
      img3.className = "border";
      lhsImage.src = img3.src;
    })
  
    var img4 = document.getElementById("img4");
    img4.addEventListener("click", function(){
      removeBorder();
      img4.className = "border";
      lhsImage.src = img4.src;
    })
   
  }
  
  getproductPageDataFromBackend();


