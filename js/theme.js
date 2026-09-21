const themeSwitch = document.querySelector('.theme-switch');
const sunButton = document.querySelector('.sun');
const moonButton = document.querySelector('.moon');
const lightLogo = document.querySelector('.light-logo');
const darkLogo = document.querySelector('.dark-logo');

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