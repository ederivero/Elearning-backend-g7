const data2 = [
  { precio: 10, cantidad: 5 },
  { precio: 50, cantidad: 2 },
];

const data = [10, 50, 20, 40, 30];
const total = data.reduce((valorPrevio, valorActual) => {
  return valorPrevio + valorActual;
}, 10);

const total2 = data2.reduce((valorPrevio, valorActual) => {
  return valorPrevio + valorActual.precio * valorActual.cantidad;
}, 0);

console.log(total);
console.log(total2);
