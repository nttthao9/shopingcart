const listItem = [
  {
    id: 1,
    name: 'laptop1',
    image: './images/laptop1.jpg',
    price: 100,
  },
  {
    id: 2,
    name: 'laptop2',
    image: './images/laptop2.jpg',
    price: 200,
  },
  {
    id: 3,
    name: 'laptop3',
    image: './images/laptop3.jpg',
    price: 300,
  },
];

const nameProduct = listItem.map((item) => Object.values(item));
console.log(nameProduct);
window.addEventListener('load', function () {
  const productList = document.querySelector('.product-list');
  // const productId = listItem.map((item) => item.id);
  const productName = listItem.map((item) => item.name);
  const productPrice = listItem.map((item) => item.price);
  function createProductItem(name, productName, productPrice) {
    const template = `<div class="product-item">
    <img src="./images/${name}.jpg" alt="" class="product-image">
    <div class="product-desc">
      <span class="product-name">${productName}</span>
      <span>Price:<span class="product-price">${productPrice}$</span></span>
      <div class="product-buy">
        <input type="number" name="" id="" class="product-count" value="0" min="0">
        <i class="fas fa-shopping-cart cart-icon"></i>
      </div>
    </div>
    </div>`;
    productList.insertAdjacentHTML('beforeend', template);
  }
  for (let i = 0; i < listItem.length; i++) {
    createProductItem(productName[i], productName[i], productPrice[i]);
  }
  const productCount = document.querySelectorAll('.product-count');
  [...productCount].forEach((item) => console.log(item.value));
});
