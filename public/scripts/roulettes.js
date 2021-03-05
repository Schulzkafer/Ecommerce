'use strict';

let main = document.querySelector('#main');

class Roulette {
   constructor(number, url, limitImgs, interval, subline) {
      this.number = number;
      this.url = url;
      this.subline = subline;
      this.rouletteId = 'roulette' + this.number;
      this.descriptionContainer = 'descriptionContainer' + this.number;
      this.rouletteWindow = 'roulette-window' + this.number;
      this.leftControl = 'arrow-control-left' + this.number;
      this.rightControl = 'arrow-control-right' + this.number;
      this.rouletteLine = 'roulette-line' + this.number;
      this.arrImages = [];
      this.curPos = 0;
      this.limitImgs = limitImgs || 3;
      this.interval = interval || 5000;
      this.linkID = 'linkID' + this.number;
      this.insertBlock();
      this.delegation();
   }

   delegation() {

      document.querySelector('#' + this.linkID).addEventListener('click', function (e) {
         if (e.target.tagName == 'I') e.preventDefault()
      })
   }



   insertBlock() {
      if (!this.subline) this.subline = '#first-subline';
      document.querySelector(this.subline).insertAdjacentHTML('beforeend',
         `<a id="${this.linkID}"><div id="${this.rouletteId}">
 <div id="${this.rouletteWindow}"><i class="fas fa-arrow-alt-circle-left arrow-control ${this.leftControl}"></i>
 <i class="fas fa-arrow-alt-circle-right arrow-control ${this.rightControl}"></i>
    <div id="${this.rouletteLine}"></div>
 </div>
 </div></a>`)
      this.fetch()
   }

   async fetch() {
      let response = await fetch(this.url);
      if (response.ok) {
         let raw = await response.json();
         this.arrImages = shuffleSimple(raw).slice(0, this.limitImgs)//измени слайс для просмотра большего количества картинок
         this.putImage();
         this.activateButtons();
      } else {
         console.log("Error HTTP: " + response.status);
      }

   }
   putImage() {
      //---------добавление динамической ссылки----------------//
      this.link;
      if ((/cellphone/).test(this.url)) this.link = '/cell_phones/';
      else if ((/notebook/).test(this.url)) this.link = '/laptops/';
      this.link = this.link + 'observer/' + this.arrImages[this.curPos].id;
      let l = document.querySelector('#' + this.linkID);
      l.href = this.link;
      //---------------------------------------------------//

      document.querySelector('#' + this.rouletteLine).innerHTML = '';
      if (document.querySelector('#' + this.descriptionContainer)) document.querySelector('#' + this.descriptionContainer).remove()
      document.querySelector('#' + this.rouletteLine).insertAdjacentHTML('beforeend', `<div class="roulette-img"><img src="${this.arrImages[this.curPos].ImageCode}" class="test-img" alt="Test image1"></div>`);
      document.querySelector('#' + this.rouletteWindow).insertAdjacentHTML('beforeend',
         `<div id=${this.descriptionContainer}>
      <p hidden="true">${this.arrImages[this.curPos].id}</p>
      <p>${this.arrImages[this.curPos].ProductName}</p>
      <p>${this.arrImages[this.curPos].Price}</p>
      </div>`)

   }

   activateButtons() {
      document.querySelector('.' + this.leftControl).addEventListener('click', () => {
         if (this.curPos == 0) this.curPos = this.arrImages.length - 1;
         else this.curPos--;
         this.putImage();
      })

      document.querySelector('.' + this.rightControl).addEventListener('click', () => {
         if (this.curPos == this.arrImages.length - 1) this.curPos = 0;
         else this.curPos++;
         this.putImage();
      })
   }

   rotate() {
      document.querySelector('.' + this.rightControl).dispatchEvent(new CustomEvent("click"))
   }

   beginRotate() {
      this.r = setInterval(this.rotate.bind(this), this.interval)
   }
   stopRotate() {
      clearInterval(this.r)
   }
}


let cellphoneRoulette = new Roulette(1, '/cellphoneAdvertisement', null, 10000);
cellphoneRoulette.beginRotate()
let notebookRoulette = new Roulette(2, '/notebookAdvertisement');
notebookRoulette.beginRotate()
// let mixNotebookCellphoneRoulette = new Roulette(3, '/mixNotebookCellphoneAdvertisement');
// mixNotebookCellphoneRoulette.beginRotate()
let cellphoneRoulette2 = new Roulette(4, '/cellphoneAdvertisement');
let cellphoneRoulette3 = new Roulette(5, '/cellphoneAdvertisement');
let cellphoneRoulette4 = new Roulette(6, '/cellphoneAdvertisement');

//!todo микс из телефонов и ноутбуков - удалить

//!сделать счетчик кликов
