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
const template = `<div class="product-item">
<img src="./images/laptop1.jpg" alt="" class="product-image">
<div class="product-desc">
  <span class="product-name">Laptop1</span>
  <span>Price:<span class="product-price">100$</span></span>
  <div class="product-buy">
    <input type="number" name="" id="" class="product-count" value="0" min="0">
    <i class="fas fa-shopping-cart cart-icon"></i>
  </div>
</div>
</div>`;
const nameProduct = listItem.map((item) => Object.values(item));
console.log(nameProduct);
window.addEventListener('load', function () {
  const productId = listItem.map((item) => item.id);
  console.log(productId);
  const productName = listItem.map((item) => item.name);
  console.log(productName);
});
