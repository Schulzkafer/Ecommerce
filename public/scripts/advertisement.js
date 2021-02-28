'use strict';

//! положить все картики в массив и вставлть их по очереди в рулетку

let main = document.querySelector('#main');


let arrowControlLeft = document.querySelector('.arrow-control-left');
let arrowControlRight = document.querySelector('.arrow-control-right');

let actualImgMargin = 0;
let actualPosRoulette = 0;

let arrContainerImagesCellphone = [];

let rouletteLine = document.querySelector('#roulette-line');


arrowControlLeft.addEventListener('click', () => {
   let actualImgMargin = 0;
   let actualPosRoulette = 0;
   if (actualPosRoulette == 0) return;
   else {
      rouletteLine.style.marginLeft = actualImgMargin + 13 + 'em';
      actualImgMargin += 13;
      actualPosRoulette--;
   }
})

arrowControlRight.addEventListener('click', () => {
   if (actualPosRoulette < document.querySelectorAll('.roulette-img').length - 1) {
      rouletteLine.style.marginLeft = actualImgMargin - 13 + 'em';
      actualPosRoulette++;
      actualImgMargin -= 13;
   }
})

let dirAutoRoulette = 'right';

function automaticRoulette() {
   let ev = new Event("click", { bubbles: true });
   if (dirAutoRoulette == 'right') {
      (actualPosRoulette < document.querySelectorAll('.roulette-img').length - 1) ? arrowControlRight.dispatchEvent(ev) : dirAutoRoulette = 'left';

   } else {
      (actualPosRoulette > 0) ? arrowControlLeft.dispatchEvent(ev) : dirAutoRoulette = 'right';
   }
}


let t = setInterval(automaticRoulette, 5000);

async function cellphoneAdvertisement() {
   let response = await fetch('/cellphoneAdvertisement');

   if (response.ok) {
      arrContainerImagesCellphone = await response.json();
      let idRoulette = document.querySelector('#roulette-line');
      // for (let i = 0; i < arr.length; i++) {
      //    idRoulette.insertAdjacentHTML('beforeend', `<div class="roulette-img"><img src="${arr[i].ImageCode}" class="test-img" alt="Test image1"></div>`);
      // }

      let idRoulette2 = document.querySelector('#roulette-line2');
      for (let i = 0; i < arr.length; i++) {
         idRoulette2.insertAdjacentHTML('beforeend', `<div class="roulette-img"><img src="${arr[i].ImageCode}" class="test-img" alt="Test image1"></div>`);
      }

   } else {
      console.log("Error HTTP: " + response.status);
   }

}
cellphoneAdvertisement()