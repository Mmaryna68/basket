//Объявление переменных и выбор элементов DOM
const cart = document.getElementById("cart"); // Получаем элемент с id "cart"
const cartItems = cart.getElementsByTagName("li"); // Получаем все элементы <li> внутри элемента с id "cart"
const totalValue = document.getElementById("total-value"); // Получаем элемент с id "total-value"
const discountBtn = document.getElementById("discount-btn"); // Получаем элемент с id "discount-btn"

let total = 0; // Переменная для хранения общей стоимости
let discountApplied = false; // Флаг, указывающий, применен ли скидочный купон

// Функция для расчета общей стоимости товаров в корзине
function calculateTotal() {
  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const priceText = cartItems[i].querySelector(".price").textContent; // Получаем текстовое содержимое элемента с классом "price"
    const price = parseFloat(priceText.replace("$", "")); // Преобразуем текст в число, удаляя символ "$"
    sum += price; // Прибавляем цену товара к общей сумме
  }
  return sum; // Возвращаем общую сумму
}

//Функция для обновления отображения общей стоимости
function updateTotal() {
  const newTotal = calculateTotal(); // Вычисляем новую общую стоимость
  totalValue.textContent = "$" + newTotal; // Обновляем текстовое содержимое элемента с id "total-value"
  total = newTotal; // Обновляем значение переменной total
}

//Функция для применения скидочного купона
function applyDiscount() {
  if (!discountApplied) {
    total *= 0.8; // Уменьшаем общую стоимость на 20%
    totalValue.textContent = "$" + total; // Обновляем текстовое содержимое элемента с id "total-value"
    discountApplied = true; // Устанавливаем флаг применения скидки
    discountBtn.textContent = "Купон применен"; // Обновляем текстовое содержимое кнопки
    discountBtn.style.backgroundColor = "red"; // Изменяем цвет фона кнопки
  }
}

//Функция для удаления скидочного купона
function removeDiscount() {
  if (discountApplied) {
    total /= 0.8; //Возвращаем первоначальную стоимость и отменяем скидку на 20%
    totalValue.textContent = "$" + total; // Обновляем текстовое содержимое элемента с id "total-value"
    discountApplied = false; //Сбрасываем флаг применения скидки
    discountBtn.textContent = "Использовать купон на 20%"; // Обновляем текстовое содержимое кнопки
    discountBtn.style.backgroundColor = "green"; // Изменяем цвет фона кнопки
  }
}

//Обработчики событий для кнопок "Добавить в корзину"
for (let i = 0; i < cartItems.length; i++) {
  const addToCartBtn = cartItems[i].querySelector(".add-to-cart"); // Получаем кнопку "Добавить в корзину" для текущего элемента
  addToCartBtn.addEventListener("click", function () {
    removeDiscount(); // Удаляем скидочный купон
    const priceText = cartItems[i].querySelector(".price").textContent; // Получаем текстовое содержимое элемента с классом "price"
    const price = parseFloat(priceText.replace("$", "")); // Преобразуем текст в число, удаляя символ "$"
    total += price; // Увеличиваем общую стоимость на цену товара
    totalValue.textContent = "$" + total; // Обновляем текстовое содержимое элемента с id "total-value"
    addToCartBtn.classList.add("added"); // Добавляем класс "added" к кнопке "Добавить в корзину"
    addToCartBtn.textContent = "Added to cart"; // Обновляем текстовое содержимое кнопки
    addToCartBtn.style.backgroundColor = "green"; // Изменяем цвет фона кнопки
  });
}
