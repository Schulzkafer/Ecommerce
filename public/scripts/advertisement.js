'use strict';

///!создать классы для рулетки

let main = document.querySelector('#main');
let idRoulette = document.querySelector('#roulette-line');
let idRoulette2 = document.querySelector('#roulette-line2');

let rouletteWindow = document.querySelector('#roulette-window');
let rouletteWindow2 = document.querySelector('#roulette-window2');

let arrowControlLeft = document.querySelector('.arrow-control-left');
let arrowControlRight = document.querySelector('.arrow-control-right');
let arrowControlLeft2 = document.querySelector('.arrow-control-left2');
let arrowControlRight2 = document.querySelector('.arrow-control-right2');




let arrContainerImagesCellphone = [];
let arrContainerImagesNotebook = [];

let currentCellphoneImageId = 0;
let currentNotebookImageId = 0;

let rouletteLine = document.querySelector('#roulette-line');


arrowControlLeft.addEventListener('click', () => {
   if (currentImageId == 0) currentImageId = arrContainerImagesCellphone.length - 1;
   else currentImageId--;
   putImage();
})

arrowControlRight.addEventListener('click', () => {
   if (currentImageId == arrContainerImagesCellphone.length - 1) currentImageId = 0;
   else currentImageId++;
   putImage();
})


function automaticRoulette() {
   let ev = new Event("click", { bubbles: true });
   arrowControlRight.dispatchEvent(ev);
}

let t = setInterval(automaticRoulette, 3000);

async function createImageAdvertisemantContainers(name) {
   console.log(name)
   let response = await fetch('/' + name);

   if (response.ok) {
      let raw = await response.json();
      let currentRaw;
      if (name == 'cellphoneAdvertisement') {
         arrContainerImagesCellphone = shuffleSimple(raw).slice(0, 3)//измени слайс для просмотра большего количества картинок
         putImage('', arrContainerImagesCellphone, currentCellphoneImageId);
      } else if (name == 'notebookAdvertisement') {
         arrContainerImagesNotebook = shuffleSimple(raw).slice(0, 3)
         putImage2('2', arrContainerImagesNotebook, currentNotebookImageId);
      }

   } else {
      console.log("Error HTTP: " + response.status);
   }

}

/* ['cellphoneAdvertisement', 'notebookAdvertisement'].forEach(x => createImageAdvertisemantContainers(x))
 */
['cellphoneAdvertisement'].forEach(x => createImageAdvertisemantContainers(x))

function putImage(num, arr, curPos) {
   (idRoulette + num).innerHTML = '';
   if (document.querySelector('#descriptionContainer' + num)) document.querySelector('#descriptionContainer' + num).remove()
      (idRoulette + num).insertAdjacentHTML('beforeend', `<div class="roulette-img"><img src="${arr[curPos.ImageCode]}" class="test-img" alt="Test image1"></div>`);

   (rouletteWindow + num).insertAdjacentHTML('beforeend',
      `<div id=${descriptionContainer + num}>
   <p hidden="true">${arr[curPos].id}</p>
   <p>${arr[curPos].ProductName}</p>
   <p>${arr[curPos].Price}</p>
   </div>`)
}




