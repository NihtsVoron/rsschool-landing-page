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

const burger = document.querySelector('.burger');
const navLinksContainer = document.querySelector('.nav-links-container');
const navLinksContainerCopy = navLinksContainer.cloneNode(true);
const headerMenu = document.querySelector('.header-menu');
const burgerMenu = document.querySelector('.burger-menu');
const coffeeMenuButton = document.querySelector('.coffee-menu-button');
const coffeeMenuButtonCopy = coffeeMenuButton.cloneNode(true);

const loadMoreButton = document.querySelector('.load-more-button');

const modal = document.querySelector('.modal-overlay');
if (coffeeButton !=null )
{
  const closeBtn = modal.querySelector('.menu-list-item-modal-close-button');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
  });
}

let allProducts = [];

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

    VisibleLoadMoreButton();
  });

if (teaButton !=null )
  teaButton.addEventListener('click', () => {

    teaList.classList.add('active');
    coffeeList.classList.remove('active');
    dessertList.classList.remove('active');

    teaButton.classList.add('active');
    coffeeButton.classList.remove('active');
    dessertButton.classList.remove('active');

    VisibleLoadMoreButton();
  });

  if (dessertButton!=null)
    dessertButton.addEventListener('click', () => {

    dessertList.classList.add('active');
    coffeeList.classList.remove('active');
    teaList.classList.remove('active');

    dessertButton.classList.add('active');
    coffeeButton.classList.remove('active');
    teaButton.classList.remove('active');

    VisibleLoadMoreButton();
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

async function loadProducts() {
  const response = await fetch('../assets/products.json');
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }
  return response.json();
}

if (coffeeList!=null)
  loadProducts().then(products => {
    teaList.innerHTML = '';
    coffeeList.innerHTML = '';
    dessertList.innerHTML = '';
    allProducts = products;
    products.forEach(item =>
    {
      const newItem = document.createElement('div');
      newItem.className = 'menu-list-item';
      newItem.innerHTML = `
        <div class="menu-list-item" id=productId-${allProducts.indexOf(item)}>
          <div class="menu-list-item-image" style="background-image: url(${item.image});"></div>
          <div class="menu-list-item-description">
            <h2 class="heading-3">${item.name}</h2>
            <p class="medium-text">${item.description}</p>
            <h2 class="heading-3">${item.price}</h2>
          </div>
        </div>`;

      switch (item.category)
      {
        case 'coffee':
          coffeeList.append(newItem);
          break;
        case 'tea':
          teaList.append(newItem);
          break;
        case 'dessert':
          dessertList.append(newItem);
          break;
      }

      newItem.addEventListener('click', () => openModal(item));
    });
  });


if (burger!=null)
{
  burgerMenu.append(
    navLinksContainerCopy,
    coffeeMenuButtonCopy
  );

  burger.addEventListener('click', (event) => {
    ToggleBurger();
    if (burgerMenu.classList.contains('active'))
      burgerMenu.style.setProperty('top', headerMenu.offsetHeight + 'px');
    else
      burgerMenu.style.setProperty('top', '-120%');

    burgerMenu.style.setProperty('height', window.innerHeight - headerMenu.offsetHeight + 'px');
  });
}

navLinksContainerCopy.addEventListener('click', (event) => {
  if (burgerMenu.classList.contains('active'))
    ToggleBurger();
});

coffeeMenuButtonCopy.addEventListener('click', (event) => {
  if (burgerMenu.classList.contains('active'))
    ToggleBurger();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && burgerMenu.classList.contains('active'))
    ToggleBurger();

  if (event.key === 'Escape' && modal.classList.contains('is-open'))
    closeModal();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && burgerMenu.classList.contains('active'))
      ToggleBurger();
});

function ToggleBurger()
{
  burger.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  navLinksContainer.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

if (loadMoreButton !=null )
  loadMoreButton.addEventListener('click', () => {
      let menuListItems = document.querySelectorAll('.menu-list.active .menu-list-item:nth-child(n+5)');

      menuListItems.forEach(menuListItem => menuListItem.style.setProperty('display', 'flex'));

      loadMoreButton.style.setProperty('display', 'none');
  });

function VisibleLoadMoreButton()
{
  if (window.innerWidth <= 768 && document.querySelectorAll('.menu-list.active .menu-list-item:nth-child(n+5)').length>0)
    loadMoreButton.style.setProperty('display', 'block');
}

function openModal(product) {
  modal.querySelector('.menu-list-item-modal-image').style.backgroundImage = `url(${product.image})`;
  modal.querySelector('.menu-list-item-modal-description h2').textContent = product.name;
  modal.querySelector('.menu-list-item-modal-description p').textContent = product.description;
  modal.querySelector('.menu-list-item-modal-total-price span:last-child').textContent = `$${product.price}`;

  let sizeList=modal.querySelector('.sizes');
  sizeList.innerHTML = '';
  Object.entries(product.sizes).forEach(([key, size]) => {
    const sizeItem = document.createElement('div');
      sizeItem.className = 'sizes-button link-button-text';
      sizeItem.dataset.addPrice = size['add-price'];
      sizeItem.innerHTML = `
          <span class="sizes-size">${key}</span>
          <span>${size.size}</span>
        `;

      sizeList.append(sizeItem);

      sizeItem.addEventListener('click', () => {
        modal.querySelectorAll('.sizes-button').forEach(b => b.classList.remove('active'));
        sizeItem.classList.add('active');
        let total = Number(product.price) + Number(size['add-price']);
        const activeAdditives = modal.querySelectorAll('.additivity-button.checked');
        activeAdditives.forEach(checked => {
          total = total + Number(checked.dataset.addPrice);
        });
        modal.querySelector('.menu-list-item-modal-total-price span:last-child').textContent = `$${total.toFixed(2)}`;
      });
  });

  sizeList.querySelector('.sizes-button:first-child').classList.add('active');

  let additiyList=modal.querySelector('.additives');
  additiyList.innerHTML = '';
  for (let i = 0; i < product.additives.length; i++) {
    const item = product.additives[i];
    let addityItem = document.createElement('div');
      addityItem.className = 'additivity-button link-button-text';
      addityItem.dataset.addPrice = item['add-price'];
      addityItem.innerHTML = `
          <span class="additive-number">${i+1}</span>
          <span>${item.name}</span>
        `;

      additiyList.append(addityItem);

      addityItem.addEventListener('click', () => {
        addityItem.classList.toggle('checked');
        let total = Number(product.price);

        const activeSize = modal.querySelector('.sizes-button.active');
        total = total + Number(activeSize.dataset.addPrice);
        const activeAdditives = modal.querySelectorAll('.additivity-button.checked');
        activeAdditives.forEach(checked => {
          total = total + Number(checked.dataset.addPrice);
        });

        modal.querySelector('.menu-list-item-modal-total-price span:last-child').textContent = `$${total.toFixed(2)}`;
      });
  };

  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}