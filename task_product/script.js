const products = [
  {
    id: 1,
    title: 'Laptop',
    price: 60000,
    category: 'electronics',
    description: 'A powerful laptop with amazing features.',
    images: ['project_pics/lap1.png', 'project_pics/lap2.png', 'project_pics/lap3.png'], 
  },
  {
    id: 2,
    title: 'T-shirt',
    price: 650,
    category: 'clothing',
    description: 'Comfortable cotton t-shirt.',
    images: ['project_pics/tshirt1.jpg', 'project_pics/tshirt2.avif', 'project_pics/tshirt3.jpg'], 
  },
  {
    id: 3,
    title: 'Smartphone',
    price: 80000,
    category: 'electronics',
    description: 'Latest model smartphone with 5G support.',
    images: ['project_pics/iphone1.png', 'project_pics/iphone2.png', 'project_pics/iphone2.png'],
  },
  {
    id: 4,
    title: 'TV',
    price: 100000,
    category: 'appliances',
    description: 'Latest model smartTV with AI support.',
    images: ['project_pics/tv2.png', 'project_pics/tv.png'],
  },       
];

let cartItems = [];
let selectedCategory = "";

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('categoryFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const productDetailsPage = document.getElementById('product-details');
const backToProductsBtn = document.getElementById('backToProductsBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartPage = document.getElementById('cart');
const backToProductsFromCartBtn = document.getElementById('backToProductsFromCartBtn');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const cartInfoElement = document.getElementById('cart-info');

function displayProducts(productsToDisplay) {
  productList.innerHTML = '';
  productsToDisplay.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>₹${product.price}</p>
      <button onclick="viewProductDetails(${product.id})">View Details</button>
    `;
    productList.appendChild(productElement);
  });
}

function filterProducts() {
  const filteredProducts = products.filter(product => {
    if (!selectedCategory) return true;
    return product.category === selectedCategory;
  });
  displayProducts(filteredProducts);
  productList.style.display = 'grid';
}

function viewProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    let currentImageIndex = 0;
    const productDetailImage = document.getElementById('product-detail-image');
    const images = product.images;
    productDetailImage.src = images[currentImageIndex];
    
    const changeImage = (direction) => {
      currentImageIndex += direction;
      if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
      } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
      }
      productDetailImage.src = images[currentImageIndex];
    };

    document.getElementById('product-detail-title').innerText = product.title;
    document.getElementById('product-detail-description').innerText = product.description;
    document.getElementById('product-detail-price').innerText = `₹${product.price}`;
    productDetailsPage.style.display = 'block';
    productList.style.display = 'none';
    addToCartBtn.onclick = function() {
      addToCart(product);
    };

    window.changeImage = changeImage;
  }
}

function addToCart(product) {
  const existingProduct = cartItems.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cartItems.push({...product, quantity: 1});
  }

  updateCart();
  productDetailsPage.style.display = 'none';
  cartPage.style.display = 'block';
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <h3>${item.title} (₹${item.quantity})</h3>
      <p>₹${(item.price * item.quantity).toFixed(2)}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;   
    cartItemsContainer.appendChild(cartItemElement);
  });
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalPriceElement.innerText = totalPrice.toFixed(2);
  cartCountElement.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);  
}
function removeFromCart(productId) {
  const product = cartItems.find(item => item.id === productId);

  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      cartItems = cartItems.filter(item => item.id !== productId);
    }
  }

  updateCart();
}

function resetFilters() {
  selectedCategory = '';
  categoryFilter.value = '';
  filterProducts();

  cartItems = [];
  updateCart();  
  cartCountElement.innerText = '0'; 
}
  
categoryFilter.addEventListener('change', () => {
  selectedCategory = categoryFilter.value;
  productDetailsPage.style.display = 'none';
  productList.style.display = 'flex';
  filterProducts();
});

resetFiltersBtn.addEventListener('click', () => {
  resetFilters();  
});

cartInfoElement.addEventListener('click', () => {
  cartPage.style.display = 'block';
  productList.style.display = 'none';
});

backToProductsBtn.addEventListener('click', () => {
  productDetailsPage.style.display = 'none';
  productList.style.display = 'grid';
});

backToProductsFromCartBtn.addEventListener('click', () => {
  cartPage.style.display = 'none';
  productList.style.display = 'grid';
});

filterProducts();
