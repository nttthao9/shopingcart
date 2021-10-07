const listItem = [
  {
    id: 0,
    name: 'Brown and white cake',
    image:
      'https://images.unsplash.com/photo-1628024634012-39a1bdd0741d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    price: 10,
  },
  {
    id: 1,
    name: 'Toast',
    image:
      'https://images.unsplash.com/photo-1633104060360-914c5aecb9aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    price: 8,
  },
  {
    id: 2,
    name: 'Baked cakes',
    image:
      'https://images.unsplash.com/photo-1633104061003-a391ef6716e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    price: 20,
  },
  {
    id: 3,
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
let cartList = [];

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

function renderCartList(image, name, price, quantity, id) {
  return `<div class="cart-item">
  <img src=${image} alt="" class="cart-image">
  <div class="cart-desc">
    <span class="cart-text">${name}</span>
    <span class="price-item"><span>$</span>${price}</span>
    <div class="change-cart">
      <i class="fa fa-plus add-item"></i>
      <span class="count-item">${quantity}</span>
      <i class="fa fa-minus minus-item" data-minus = "${id}"></i>
    </div>
  </div>
  <i class="fa fa-trash trash-icon " data-id ="${id}"></i>
</div>`;
}

const btnOrder = document.querySelectorAll('.order');
const countQuantity = document.querySelectorAll('.count');
const addBtn = document.querySelectorAll('.add');
const minusBtn = document.querySelectorAll('.minus');
const totalAll = document.querySelector('.total-all');

let value;
let localData =
  localStorage.length !== 0 ? JSON.parse(localStorage.getItem('cartList')) : [];
cartList = localData;
cart.innerHTML = localData
  .map((item) =>
    renderCartList(item.image, item.name, item.price, item.quantity, item.id)
  )
  .join('');
cartList = localData;
deleteItem();
addInCart();
minusInCart();
price();
[...addBtn].forEach((item, i) =>
  item.addEventListener('click', function (e) {
    +countQuantity[i].textContent++;
  })
);
[...minusBtn].forEach((item, i) =>
  item.addEventListener('click', function (e) {
    +countQuantity[i].textContent--;
    if (+countQuantity[i].textContent <= 0) {
      countQuantity[i].textContent = 0;
    }
  })
);

[...btnOrder].forEach((item, index) =>
  item.addEventListener('click', () => {
    let j = index;
    if (+countQuantity[j].textContent > 0) {
      let countItem = +countQuantity[j].textContent;
      let item = listItem[j];
      if (!cartList.length) {
        showIncart(item, j, countItem);
      } else {
        const index = cartList.findIndex((key) => key.id === item.id);
        if (index === -1) {
          showIncart(item, j, countItem);
        } else {
          cartList[index].quantity += countItem;
          cartList[index].total =
            +cartList[index].quantity * +cartList[index].price;
          countQuantity[j].textContent = 0;
          localStorage.setItem('cartList', JSON.stringify(cartList));
          cart.innerHTML = cartList
            .map((item) =>
              renderCartList(
                item.image,
                item.name,
                item.price,
                item.quantity,
                item.id
              )
            )
            .join('');
        }
      }
      addInCart();
      minusInCart();
      price();
    } else {
      alert('you must chose quantity');
    }
  })
);

function showIncart(item, i, countItem) {
  item.quantity = countItem;
  item.total = countItem * item.price;
  cartList.push(item);
  localStorage.setItem('cartList', JSON.stringify(cartList));
  cart.innerHTML = cartList
    .map((item) =>
      renderCartList(item.image, item.name, item.price, item.quantity, item.id)
    )
    .join('');
  deleteItem();
  countQuantity[i].textContent = 0;
}
function deleteItem() {
  const deleteIcon = document.querySelectorAll('.trash-icon');
  deleteIcon.forEach((item) =>
    item.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const index = cartList.findIndex((item) => item.id === +id);
      cartList.splice(index, 1);
      cartList = localStorage.setItem('cartList', JSON.stringify(cartList));
      price();
      e.target.parentNode.remove();
    })
  );
}

function addInCart() {
  const addItem = document.querySelectorAll('.add-item');
  [...addItem].forEach((item, index) =>
    item.addEventListener('click', (e) => {
      value = +e.target.nextElementSibling.textContent;
      value++;
      e.target.nextElementSibling.textContent = value;
      cartList[index].quantity = value;
      cartList[index].total = value * cartList[index].price;
      localStorage.setItem('cartList', JSON.stringify(cartList));
      price();
    })
  );
}
function minusInCart() {
  const minusItem = document.querySelectorAll('.minus-item');
  [...minusItem].forEach((item, index) =>
    item.addEventListener('click', (e) => {
      value = +e.target.previousElementSibling.textContent;
      value--;
      e.target.previousElementSibling.textContent = value;
      if (value <= 0) {
        e.target.previousElementSibling.textContent = 0;
        return;
      }
      cartList[index].quantity = value;
      cartList[index].total = value * cartList[index].price;
      localStorage.setItem('cartList', JSON.stringify(cartList));
      price();
    })
  );
}
function price() {
  cartList =
    localStorage.length !== 0
      ? JSON.parse(localStorage.getItem('cartList'))
      : [];
  totalAll.textContent =
    cartList.reduce((previous, item) => previous + item.total, 0) + '$';
}
shopingIcon.addEventListener('click', function () {
  cartOrder.classList.toggle('active');
});
