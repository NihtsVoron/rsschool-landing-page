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

const sliderLeftButton = document.querySelector('.button-slider.left');
const sliderRightButton = document.querySelector('.button-slider.right');
const rowSlider = document.querySelector('.row-slider');
const slides = document.querySelectorAll('.slide');
const sliderControls = document.querySelectorAll('.slider-control');

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

if (coffeeButton !=null )
  coffeeButton.addEventListener('click', () => {

    coffeeList.classList.add('active');
    teaList.classList.remove('active');
    dessertList.classList.remove('active');

    coffeeButton.classList.add('active');
    teaButton.classList.remove('active');
    dessertButton.classList.remove('active');
  });

if (teaButton !=null )
  teaButton.addEventListener('click', () => {

    teaList.classList.add('active');
    coffeeList.classList.remove('active');
    dessertList.classList.remove('active');

    teaButton.classList.add('active');
    coffeeButton.classList.remove('active');
    dessertButton.classList.remove('active');
  });

  if (dessertButton!=null)
  dessertButton.addEventListener('click', () => {

    dessertList.classList.add('active');
    coffeeList.classList.remove('active');
    teaList.classList.remove('active');

    dessertButton.classList.add('active');
    coffeeButton.classList.remove('active');
    teaButton.classList.remove('active');
  });

if (sliderLeftButton!=null)
  sliderLeftButton.addEventListener('click', () => {
    for(var i=0; i< slides.length; i++)
    {
      if (slides[i].classList.contains('active'))
      {
        slides[i].classList.remove('active');
        sliderControls[i].classList.remove('active');

        let j = slides.length-1;
        if (i > 0)
          j=i-1;

        slides[j].classList.add('active');
        sliderControls[j].classList.add('active');
        rowSlider.style.setProperty('--current', j);

        return;
      }
    }
  });

if (sliderRightButton!=null)
  sliderRightButton.addEventListener('click', () => {
    for(var i=0; i< slides.length; i++)
    {
      if (slides[i].classList.contains('active'))
      {
        slides[i].classList.remove('active');
        sliderControls[i].classList.remove('active');

        let j = 0;
        if (i < slides.length-1)
          j=i+1;

        slides[j].classList.add('active');
        sliderControls[j].classList.add('active');
        rowSlider.style.setProperty('--current', j);

        return;
      }
    }
  });

  if (sliderControls!=null)
    sliderControls.forEach(element => {
      element.addEventListener('click', (event) => {
        for(var i = 0; i< sliderControls.length; i++)
        {
          if (sliderControls[i].classList.contains('active'))
          {
            slides[i].classList.remove('active');
            sliderControls[i].classList.remove('active');
          }

          if (sliderControls[i] == event.target)
          {
            slides[i].classList.add('active');
            sliderControls[i].classList.add('active');
            rowSlider.style.setProperty('--current', i);
          }
        }
      });
    });