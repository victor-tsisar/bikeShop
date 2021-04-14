"use strict";
/* swiper */
const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        767: {
            spaceBetween: -25,
        },
        992: {
            freeMode: true,
            spaceBetween: -75,
        }
    },

});

const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 10,
    loop: true,
    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.news__arrow-next',
        prevEl: '.news__arrow-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        500: {
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            loopFillGroupWithBlank: true,
        }
    },
});

const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 'auto',
    centeredSlides: true,

    pagination: {
        el: '.category-block__dots',
        clickable: true,
    },

    navigation: {
        nextEl: '.category-block__arrow-next',
        prevEl: '.category-block__arrow-prev',
    },
});

const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 30,
    loop: true,

    pagination: {
        el: '.goods__dots',
        clickable: true,
    },

});

/* script */
let width = window.innerWidth;
const body = document.querySelector('body');
const menu = document.querySelector('.menu');
const menuMobile = document.querySelector('.menu-mobile');
const menuLangBtn = document.querySelectorAll('.menu-lang__btn');
const productsArrow = document.querySelectorAll('.products__arrow');
const productColor = document.querySelector('.product-form__color legend span');
const productFormColorItems = document.querySelectorAll('.product-form__color-item');
const productSize = document.querySelector('.product-form__size legend span');
const productFormSizeItems = document.querySelectorAll('.product-form__size-item');
const productFormBtn = document.querySelector('.product-form__btn');
const newsItemTextElems = document.querySelectorAll('.news__item-text');
const descriptionListElems = document.querySelectorAll('.description__list-item');
const descriptionBlock = document.querySelectorAll('.description__block');
const blogNewsItems = document.querySelectorAll('.blog-news__item');
const blogNewsItemCurrent = document.querySelector('.blog-news__item--current');
const cards = document.querySelectorAll('.cart-good');
const btnCartGoodsCount = document.querySelectorAll('.cart-good__count');
const btnCartGoodsDelete = document.querySelectorAll('.cart-good__delete');
const totalPrice = document.querySelector('.price-order span');
const customerName = document.getElementById('customer-name');
const customerPhone = document.getElementById('customer-phone');
const customerEmail = document.getElementById('customer-email');
const customerCity = document.getElementById('customer-city');
const cartForm = document.querySelector('.cart-form');
const cartGoodsQuantity = document.querySelector('.cart-goods legend span');
const cartGoodsList = document.querySelector('.cart-goods__list');
const btnGoodsBuy = document.querySelector('.cart-goods__btn[type=submit]');
const btnForMainContact = document.querySelector('.form-main__btn');
const labelForMainContact = document.querySelector('.form-main__label');
const inputForMainContact = document.querySelector('.form-main__input');
const alertWindow = document.querySelector('.alert-window');
const btnAlertWindow = document.querySelector('.alert-window__btn');
// overlay для модального вікна
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.insertAdjacentElement('beforeend', overlay);

function activeAlertWindow() {
    overlay.classList.add('active');
    alertWindow.classList.add('active');
}

function closeAlertWindow() {
    overlay.classList.remove('active');
    alertWindow.classList.remove('active');
}

function invalidStyle(item) {
    item.style.borderColor = 'red';
}

function getLabel(arr, currentLabel) {
    arr.forEach((item) => {
        if (item.checked) {
            currentLabel.textContent = item.value;
        }

        item.addEventListener('click', () => {
            if (item.checked) {
                currentLabel.textContent = item.value;
            }
        });
    });
}

function setCartGoodsQuantity() {
    let totalGoodsQuantity = 0;

    cards.forEach((card) => {
        if (!card.classList.contains('no-show')) {
            const countGood = +card.querySelector('.cart-good__count-value').textContent;

            totalGoodsQuantity += countGood;
        }

    });

    return cartGoodsQuantity.textContent = totalGoodsQuantity;
}

function renderGoodPrice() {
    let totalValueGood = 0;

    cards.forEach((card) => {
        if (!card.classList.contains('no-show')) {
            const countGood = +card.querySelector('.cart-good__count-value').textContent;
            const valueGood = +card.querySelector('.cart-good__price span').textContent;

            totalValueGood += countGood * valueGood;
        }

    });

    return totalPrice.textContent = totalValueGood;
}

function deleteBlock(elem) {
    const parent = elem.parentElement;

    parent.classList.add('no-show');
    renderGoodPrice();
    setCartGoodsQuantity();
}

function validPhone(str) {
    const regName = /^\d{9}$/;
    return regName.test(str);
}

function validEmail(str) {
    const regEmail = /^\w+@\w+\.\w{2,}$/;
    return regEmail.test(str);
}

(function stopChangeBlogItems() {
    if (blogNewsItemCurrent && width <= 500) {
        blogNewsItemCurrent.classList.remove('blog-news__item--current');
    }
})();

// Мобільне меню
menuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});
// Позначка вибраної мови
menuLangBtn.forEach((item) => {
    item.addEventListener('click', () => {
        for (let i = 0; i < menuLangBtn.length; i++) {
            menuLangBtn[i].classList.remove('active');
        }
        item.classList.toggle('active');
    });
});
// секція Вибрані товари
productsArrow.forEach(function (card, i, productsArrow) {
    card.addEventListener('click', (event) => {
        const target = event.target;
        const item = target.closest('.products-card--curent');

        if (item) {
            item.classList.remove('products-card--curent');
            item.style.order = '1';

            const nextEl = item.nextElementSibling;
            if (nextEl) {
                nextEl.classList.add('products-card--curent');
                nextEl.style.order = '0';
            } else {
                item.parentElement.firstElementChild.classList.add('products-card--curent');
            }
        }
    });

});
// Трикрапка в картках новин
newsItemTextElems.forEach(function (news) {
    let sizeText = 250;  // кількість символів
    let newsContent = news;
    let newsText = newsContent.textContent;

    if (newsText.length > sizeText) {
        newsContent.textContent = newsText.slice(0, sizeText) + '...';
    }
});
// Таби для картки товару
descriptionListElems.forEach(function (elem) {
    elem.addEventListener('click', function () {
        let id = elem.dataset.target;
        let content = document.querySelector('.description__block[data-target="' + id + '"]');
        let activeElem = document.querySelector('.description__list-item.active');
        let activeContent = document.querySelector('.description__block.active');

        activeElem.classList.remove('active');
        elem.classList.add('active');

        activeContent.classList.remove('active');
        content.classList.add('active');
    });
});
// Рух карток новин в блозі
let delay = 6000;
let timerId = setTimeout(function changeBlogItems() {

    for (let i = 0; i < blogNewsItems.length; i++) {
        const element = blogNewsItems[i];

        if (width <= 500 || !blogNewsItemCurrent) {
            break;
        }

        setTimeout(() => {
            console.log("START");
            if (element.classList.contains('blog-news__item--current')) {
                element.classList.remove('blog-news__item--current')
                element.style.order = '1';

                const nextEl = blogNewsItems[i + 1];
                if (nextEl) {
                    nextEl.classList.add('blog-news__item--current');
                    nextEl.style.order = '0';
                } else {
                    element.parentElement.firstElementChild.classList.add('blog-news__item--current');
                }
            }
        }, delay * i);
    }

    timerId = setTimeout(changeBlogItems, delay * blogNewsItems.length);

    // Зупинка безкінечного циклу перемішування
    blogNewsItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            clearTimeout(timerId);
        });
    });

}, delay);
// Модальне вікно alert для контактної форми головної сторінки і кнопки В КОРЗИНУ
if (btnForMainContact) {
    btnForMainContact.addEventListener('click', (e) => {
        e.preventDefault();

        if (validEmail(inputForMainContact.value)) {
            setTimeout(() => {
                inputForMainContact.style.borderColor = '#000000';
                inputForMainContact.value = '';
                labelForMainContact.removeAttribute('title');
                activeAlertWindow();
            }, 300);
        } else {
            invalidStyle(inputForMainContact);
            labelForMainContact.setAttribute('title', 'Вірно введіть адресу електронної почти. Наприклад: sergiy@gmail.com');
        }
    });
}

if (productFormBtn) {
    productFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(activeAlertWindow, 300);
    });
}

if (btnAlertWindow) {
    btnAlertWindow.addEventListener('click', () => {
        closeAlertWindow();
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        closeAlertWindow();
    });
}
//  Label для Колір та Рама
if (productSize) {
    getLabel(productFormSizeItems, productSize);
    
}
if (productColor) {
    getLabel(productFormColorItems, productColor);

}
// Лічильник товарів корзини i їх вартiсть
if (btnCartGoodsCount) {
    btnCartGoodsCount.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            let countValue = +item.querySelector('p').textContent;

            if (target.closest('.cart-good__count-minus')) {
                countValue--;

                if (+item.querySelector('p').textContent > 0) {
                    item.querySelector('p').textContent = countValue;
                }

                if (+item.querySelector('p').textContent <= 0) {
                    countValue = 0;
                    const elem = item.querySelector('p').parentElement;
                    deleteBlock(elem);
                }

            } else if (target.closest('.cart-good__count-plus')) {
                countValue++;
                item.querySelector('p').textContent = countValue;
            }

            renderGoodPrice();
            setCartGoodsQuantity();

        });
    });
}

if (btnCartGoodsDelete) {
    btnCartGoodsDelete.forEach((btn) => {

        btn.addEventListener('click', () => {
            deleteBlock(btn);
        });
    });
}

if (totalPrice) {
    renderGoodPrice();
}

if (cartGoodsQuantity) {
    setCartGoodsQuantity();
} 

// оформлення замовлення
if (btnGoodsBuy) {
    btnGoodsBuy.addEventListener('click', (e) => {
        e.preventDefault();

        if (customerName.value && validPhone(+customerPhone.value) && validEmail(customerEmail.value) && customerCity.value && +totalPrice.textContent > 0) {
            setTimeout(() => {
                activeAlertWindow();
                cartForm.reset();
                cartGoodsList.innerHTML = '';
                totalPrice.textContent = '0';
                cartGoodsQuantity.textContent = '0';
            }, 500);
        } else {
            alert("Заповніть обо'язкові поля");
            
            if (!customerName.value) {
                invalidStyle(customerName);
            }
            if (!validPhone(+customerPhone.value)) {
                invalidStyle(customerPhone);
            }
            if (!validEmail(customerEmail.value)) {
                invalidStyle(customerEmail);
            }
            if (!customerCity.value) {
                invalidStyle(customerCity);
            }
            if (+totalPrice.textContent <= 0) {
                alert('Ви не вибрали жодного товару!');
            }
        }

    });
}
