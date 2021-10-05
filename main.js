const listItem = [
  {
    id: 1,
    name: 'Brown and white cake',
    image:
      'https://images.unsplash.com/photo-1628024634012-39a1bdd0741d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    price: 10,
  },
  {
    id: 2,
    name: 'Toast',
    image:
      'https://images.unsplash.com/photo-1633104060360-914c5aecb9aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    price: 8,
  },
  {
    id: 3,
    name: 'Baked cakes',
    image:
      'https://images.unsplash.com/photo-1633104061003-a391ef6716e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    price: 20,
  },
  {
    id: 4,
    name: 'Brown and white chocolate',
    image:
      'https://images.unsplash.com/photo-1624001877690-922b1e243939?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    price: 25,
  },
];
const productList = document.querySelector('.product-list');
const shopingIcon = document.querySelector('.shoping-icon');
const cart = document.querySelector('.cart');
const cartOrder = document.querySelector('.cart-order');
const cartList = [];

function renderList(src, name, price) {
  return `<div class="item">
<img src=${src} class="image">
<div class='item-content'>
  <h3 class="text">${name}</h3>
  <span class="price"><span>$</span>${price}</span>
  <div class="change">
    <i class="fa fa-plus add"></i>
    <span class="count">0</span>
    <i class="fa fa-minus minus"></i>
  </div>
  <button type="submit" class="order">Order</button>
  </div>
  </div>`;
}
productList.innerHTML = listItem
  .map((item) => renderList(item.image, item.name, item.price))
  .join('');

function renderCartList(image, name, price, quantity) {
  return `<div class="cart-item">
  <img src=${image} alt="" class="cart-image">
  <div class="cart-desc">
    <span class="cart-text">${name}</span>
    <span class="price-item"><span>$</span>${price}</span>
    <div class="change-cart">
      <i class="fa fa-plus add-item"></i>
      <span class="count-item">${quantity}</span>
      <i class="fa fa-minus minus-item"></i>
    </div>
  </div>
  <i class="fa fa-trash trash-icon"></i>
</div>`;
}
const btnOrder = document.querySelectorAll('.order');
const countQuantity = document.querySelectorAll('.count');
const addBtn = document.querySelectorAll('.add');
const minusBtn = document.querySelectorAll('.minus');
const totalAll = document.querySelector('.total-all');
const deleteIcon = document.querySelectorAll('.trash-icon');
let value;

[...addBtn].forEach((item) =>
  item.addEventListener('click', function (e) {
    value = +e.target.nextElementSibling.textContent;
    value++;
    e.target.nextElementSibling.textContent = value;
  })
);
[...minusBtn].forEach((item) =>
  item.addEventListener('click', function (e) {
    value = e.target.previousElementSibling.textContent;
    +value--;
    if (+e.target.previousElementSibling.textContent <= 0) {
      return 0;
    }
    e.target.previousElementSibling.textContent = value;
    console.log(+e.target.previousElementSibling.textContent);
  })
);

[...btnOrder].forEach((item, index) =>
  item.addEventListener('click', function (e) {
    e.target.dataset.index = index;
    let countItem = +countQuantity[index].textContent;
    if (countItem > 0) {
      const cartItem = listItem[index];
      cartItem.quantity = countItem;
      cartItem.total = countItem * cartItem.price;
      cartList.push(cartItem);
      console.log(cartList, 'check');

      cart.innerHTML = cartList
        .map((item) =>
          renderCartList(item.image, item.name, item.price, item.quantity)
        )
        .join('');
      // console.log(cartList, 'check');

      const deleteIcon = document.querySelectorAll('.trash-icon');
      [...deleteIcon].forEach((item) =>
        item.addEventListener('click', function (e) {
          const itemDelete = e.target.parentNode;
          console.log(itemDelete);
        })
      );
      let totalPrice = cartList.reduce(
        (previous, item) => previous + item.total,
        0
      );
      totalAll.textContent = `${totalPrice}$`;

      countQuantity[index].textContent = 0;
    } else {
      alert('you have to select quantity first');
    }
  })
);

shopingIcon.addEventListener('click', function () {
  cartOrder.classList.toggle('active');
});
