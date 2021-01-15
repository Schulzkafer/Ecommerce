'use strict';

let arrowControlLeft = document.querySelector('.arrow-control-left');
let arrowControlRight = document.querySelector('.arrow-control-right');

let actualImgMargin = 0;
let actualPosRoulette = 0;

let rouletteLine = document.querySelector('#roulette-line');


arrowControlLeft.addEventListener('click', ()=> {
    if (actualPosRoulette == 0) return;
    else {
        rouletteLine.style.marginLeft = actualImgMargin + 31 + 'em';
        actualImgMargin += 31;
        actualPosRoulette--;
}
})

arrowControlRight.addEventListener('click', ()=> {
    if (actualPosRoulette < document.querySelectorAll('.roulette-img').length - 1) {
    rouletteLine.style.marginLeft = actualImgMargin - 31 + 'em';
    actualPosRoulette++;
    actualImgMargin -= 31;
    }
})

let dirAutoRoulette = 'right';

function automaticRoulette () {
    let ev = new Event("click", {bubbles : true});
    if (dirAutoRoulette == 'right') {
    (actualPosRoulette < document.querySelectorAll('.roulette-img').length - 1) ? arrowControlRight.dispatchEvent(ev) :  dirAutoRoulette = 'left';               
       
    } else {
        (actualPosRoulette > 0) ? arrowControlLeft.dispatchEvent(ev) :  dirAutoRoulette = 'right';
    }
}


let t = setInterval(automaticRoulette, 5000);