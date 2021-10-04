const productList = [
  {
    id: 1,
    name: 'laptop3',
    image: './images/laptop1.jpg',
    price: 100,
  },
  {
    id: 2,
    name: 'laptop3',
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
const nameProduct = productList.map((item) => Object.values(productList));
console.log(nameProduct);
