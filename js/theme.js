const themeSwitch = document.querySelector('.theme-switch');
const sunButton = document.querySelector('.sun');
const moonButton = document.querySelector('.moon');
const lightLogo = document.querySelector('.light-logo');
const darkLogo = document.querySelector('.dark-logo');

const coffeeList = document.querySelector('.coffee-list');
const teaList = document.querySelector('.tea-list');
const dessertList = document.querySelector('.dessert-list');
const coffeeButton = document.querySelector('.coffee-button');
const teaButton = document.querySelector('.tea-button');
const dessertButton = document.querySelector('.dessert-button');

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme =='dark')
{
    sunButton.classList.toggle('active');
    moonButton.classList.toggle('active');
    lightLogo.classList.toggle('active');
    darkLogo.classList.toggle('active');
}

document.documentElement.dataset.theme = savedTheme;

themeSwitch.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;

  localStorage.setItem('theme', newTheme);
  sunButton.classList.toggle('active');
  moonButton.classList.toggle('active');
  lightLogo.classList.toggle('active');
  darkLogo.classList.toggle('active');
});

coffeeButton.addEventListener('click', () => {

  coffeeList.classList.add('active');
  teaList.classList.remove('active');
  dessertList.classList.remove('active');

  coffeeButton.classList.add('active');
  teaButton.classList.remove('active');
  dessertButton.classList.remove('active');
});

teaButton.addEventListener('click', () => {

  teaList.classList.add('active');
  coffeeList.classList.remove('active');
  dessertList.classList.remove('active');

  teaButton.classList.add('active');
  coffeeButton.classList.remove('active');
  dessertButton.classList.remove('active');
});

dessertButton.addEventListener('click', () => {

  dessertList.classList.add('active');
  coffeeList.classList.remove('active');
  teaList.classList.remove('active');

  dessertButton.classList.add('active');
  coffeeButton.classList.remove('active');
  teaButton.classList.remove('active');
});

