'use strict';

let personalInfo = document.querySelector('#personal-info');
let registrationContainer = document.querySelector('#registration-container');
let emailCheckin = document.querySelector('#email-checkin');
//let buttonCheckin = document.querySelector('#button-checkin');
let registrationButton = document.querySelector('#registration-button');


personalInfo.addEventListener('click', ()=>{
    registrationContainer.hidden = !registrationContainer.hidden;
});

registrationButton.addEventListener('click', ()=>{

});
