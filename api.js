const myapi = 'https://5fa3d0d9f10026001618df85.mockapi.io/products';
const productList = document.querySelector('.product-list');

let value;
fetch(myapi)
  .then((response) => response.json())
  .then((data) => {
    renderProducts(data);
    const countQuantity = document.querySelectorAll('.count');
    const addBtn = document.querySelectorAll('.add');
    const minusBtn = document.querySelectorAll('.minus');
    const totalAll = document.querySelector('.total-all');
    const btnOrder = document.querySelectorAll('.order');
    const shopingIcon = document.querySelector('.shoping-icon');
    const cart = document.querySelector('.cart');
    const cartOrder = document.querySelector('.cart-order');
    const cartCountEl = document.querySelector('.cart-count');
    let cartList = [];
    let localData =
      localStorage.length !== 0
        ? JSON.parse(localStorage.getItem('cartList'))
        : [];
    renderCartList(localData);
    cartList = localData;
    cartCountEl.textContent = cartList.length;
    addInCart();
    minusInCart();
    deleteItem();
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
          let item = data[j];
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
              renderCartList(cartList);
            }
          }
          addInCart();
          minusInCart();
          deleteItem();
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
      cartCountEl.textContent = cartList.length;
      renderCartList(cartList);
      deleteItem();
      countQuantity[i].textContent = 0;
    }
    function deleteItem() {
      const deleteIcon = document.querySelectorAll('.trash-icon');
      deleteIcon.forEach((item) =>
        item.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          const index = cartList.findIndex((item) => item.id === id);
          console.log(id, index);
          cartList.splice(index, 1);
          cartList = localStorage.setItem('cartList', JSON.stringify(cartList));
          price();
          cartCountEl.textContent = cartList.length;
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
      [...minusItem].forEach((item) =>
        item.addEventListener('click', (e) => {
          const id = e.target.dataset.minus;
          const index = cartList.findIndex((item) => item.id === id);
          cartList[index].quantity--;
          e.target.previousElementSibling.textContent =
            cartList[index].quantity;
          cartList[index].total =
            cartList[index].quantity * cartList[index].price;
          if (cartList[index].quantity === 0) {
            alert('You sure about delete this item');
            e.target.parentNode.parentNode.parentNode.remove();
            cartList = cartList.filter(
              (item) => item.id !== e.target.dataset.minus
            );
          }
          localStorage.setItem('cartList', JSON.stringify(cartList));
          cartCountEl.textContent = cartList.length;
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
    function renderCartList(localdata) {
      let cartItem = localdata.map((item) => {
        return `<div class="cart-item">
    <img src=${item.image} alt="" class="cart-image">
    <div class="cart-desc">
    <span class="cart-text">${item.name}</span>
    <span class="price-item"><span>$</span>${item.price}</span>
    <div class="change-cart">
      <i class="fa fa-plus add-item"></i>
      <span class="count-item">${item.quantity}</span>
      <i class="fa fa-minus minus-item" data-minus = "${item.id}"></i>
    </div>
    </div>
    <i class="fa fa-trash trash-icon " data-id ="${item.id}"></i>
    </div>`;
      });
      return (cart.innerHTML = cartItem.join(''));
    }
  })
  .catch((err) => alert(err));

function renderProducts(data) {
  let product = data.map((item) => {
    return `<div class="item">
<img src=${item.image} class="image">
<div class='item-content'>
  <h3 class="text">${item.name}</h3>
  <p class = "desc">${item.description}</p>
  <span class="price"><span>$</span>${item.price}</span>
  <div class="change">
    <i class="fa fa-plus add"></i>
    <span class="count">0</span>
    <i class="fa fa-minus minus"></i>
  </div>
  <button type="submit" class="order">Order</button>
  </div>
  </div>`;
  });
  return (productList.innerHTML = product.join(''));
}
