const sliderLine = document.querySelector('.page__slider');
const returnHeaderBtn = document.querySelector('.header__button');
const showMainInfoBtn = document.querySelector('.intro__button');
const openPopupBtn = document.querySelector('.main-content__button');
const popupInfo = document.querySelector('.popup');
const showPrevBtn = document.querySelector('.switch-box__button_type_back ');
const showNextBtn = document.querySelector('.switch-box__button_type_forward');
const prevBtnDot = document.querySelector('.switch-box__dot_type_back');
const nextBtnDot = document.querySelector('.switch-box__dot_type_forward');
const listPrev = document.querySelector('.list_page_1');
const listNext = document.querySelector('.list_page_2');

// прокрутка при нажатии на кнопку
let offset = 0;

returnHeaderBtn.addEventListener('click', function () {
  offset = 0;
  sliderLine.style.left = offset;
})

showMainInfoBtn.addEventListener('click', function () {
  if (document.documentElement.clientWidth === 2048) {
    offset += document.documentElement.clientWidth;
  } else {
    offset += 1024;
  }
  sliderLine.style.left = -offset + 'px';
});

// горизонтальный свайп
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let x1 = null;
let y1 = null;

function handleTouchStart(evt) {
  const firstTouch = evt.touches[0];

  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
  // console.log(x1, y1);
}

function handleTouchMove(evt) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = evt.touches[0].clientX;
  let y2 = evt.touches[0].clientY;

  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  let breakPoint = 2 * document.documentElement.clientWidth;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // right - left
    if (xDiff > 0) {
      console.log('right')
      if (offset === 0) {
        return
      } if (document.documentElement.clientWidth === 2048) {
        offset -= document.documentElement.clientWidth;
      } else {
        offset -= 1024;
      }
      sliderLine.style.left = -offset + 'px';

    } else {
      console.log('left')
      if (offset === breakPoint) {
        return
      } if (document.documentElement.clientWidth === 2048) {
        offset += document.documentElement.clientWidth;
      } else {
        offset += 1024;
      }
      sliderLine.style.left = -offset + 'px';
    }
  } else {
    return false;
  }
  x1 = null;
  y1 = null;
}

// кнопка переключения
showNextBtn.addEventListener('click', onSwitchBtnClick);
showPrevBtn.addEventListener('click', onSwitchBtnClick);


function onSwitchBtnClick() {
  showPrevBtn.classList.toggle('button_disabled');
  showNextBtn.classList.toggle('button_disabled');

  prevBtnDot.classList.toggle('switch-box__dot_active');
  nextBtnDot.classList.toggle('switch-box__dot_active');

  listPrev.classList.toggle('list_active');
  listNext.classList.toggle('list_active');
}

// открытие, закрытие попапа
openPopupBtn.addEventListener('click', function () {
  openPopup(popupInfo)
});

popupInfo.addEventListener('mousedown', (evt) => {
  // закрытие на оверлей
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupInfo)
  }
  // закрытие на крестик
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(popupInfo)
  }
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEscape);
}

function closePopupByClickEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
