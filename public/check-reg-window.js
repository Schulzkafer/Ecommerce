'use strict';

let personalInfo = document.querySelector('#personal-info');
let registrationContainer = document.querySelector('#registration-container');
let emailCheckin = document.querySelector('#email-checkin');
//let buttonCheckin = document.querySelector('#button-checkin');
let registrationButton = document.querySelector('#registration-button');
let buttonCheckin = document.querySelector('#button-checkin');

personalInfo.addEventListener('click', ()=>{
    registrationContainer.hidden = !registrationContainer.hidden;
});

// registrationButton.addEventListener('click', ()=>{
//     console.log(454)
//    let xhr = new XMLHttpRequest();
//    xhr.open('GET', '/openregistration');
//    xhr.send();
// });


let userData = {
    email:'fgf',
    name:'',
    surname:''
}

let hh = 'sdasdasdasdasd';



buttonCheckin.addEventListener('click', (event)=> {
    event.preventDefault();
 let em = document.querySelector('#email-checkin').value;
 let pa = document.querySelector('#password-checkin').value;
let json = JSON.stringify({'email':em, 'password':pa});
let xhr = new XMLHttpRequest();
xhr.open('POST', '/checkin');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(json);
xhr.onload = function() {
    console.log(xhr.status)
    if (xhr.status == 401) {
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-error"><p class="message-op">check-in data error</p><i class="far fa-window-close"></i></div>');
    } else if (xhr.status == 500) {
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-server-error"><p class="message-op">internal server error</p><i class="far fa-window-close"></i></div>');
    } else if (xhr.status == 200) {
        document.cookie=`userEmail=${em}`
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-success"><p class="message-op">you have successfully logged in</p><i class="far fa-window-close"></i></div>');
    }
    activateWindowClose();
}
})


function activateWindowClose() {
Array.from(document.querySelectorAll('.fa-window-close')).map(x=>x.addEventListener('click', function (){
    this.parentElement.remove()
}))
}
activateWindowClose()