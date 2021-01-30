'use strict';
//будет необходимо указать правильный адрес url для сохранения куки(сейчас localhost)




let personalInfo = document.querySelector('#personal-info');
let registrationContainer = document.querySelector('#registration-container');
let emailCheckin = document.querySelector('#email-checkin');
// let registrationButton = document.querySelector('#registration-button');
// let buttonCheckin = document.querySelector('#button-checkin');
 let registrationButton  = null;
 let buttonCheckin = null;
 //let accountSettings  = null;
 //let logOut = null;


// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//       ));
//       return matches ? decodeURIComponent(matches[1]) : undefined;
// }

if (getCookie('email'))  {
    registrationContainer.innerHTML = '';
    registrationContainer.insertAdjacentHTML('beforeend', `<p id="account-settings"><a href="/userpage">Your account settings</a></button><p><br><br>
    <button id="log-out">Log out</button>`);
     //accountSettings = document.querySelector('#account-settings');
    // let logOut = document.querySelector('#log-out');
    activateButtonslogOut();
} else {
    registrationContainer.innerHTML = '';
    registrationContainer.insertAdjacentHTML('beforeend', `<form id="registration-form">
                            <label for="email-checkin" class="label-reg">E-mail</label>
                            <input id="email-checkin" type="email" name="email">
                            <label for="password-checkin" class="label-reg">Password</label>
                            <input id="password-checkin" type="password" name="password">
                            <input type="submit" value="Check in" id="button-checkin">
                        </form>
                        <div id="account-frase"><p>Don't have a account?</p>
                            <button id="registration-button"><a href="/openregistration">Register now</a></button>
                        </div>`)
                        registrationButton = document.querySelector('#registration-button');
                        buttonCheckin = document.querySelector('#button-checkin');
                        activateButtonsCheckin();
}



personalInfo.addEventListener('click', ()=>{
    registrationContainer.hidden = !registrationContainer.hidden;
});


function activateButtonsCheckin() {
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
    
    if (xhr.status == 401) {
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-error"><p class="message-op">check-in data error</p><i class="far fa-window-close"></i></div>');
    } else if (xhr.status == 500) {
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-server-error"><p class="message-op">internal server error</p><i class="far fa-window-close"></i></div>');
    } else if (xhr.status == 200) {
        setCookie('email', em, {secure: true, 'max-age': 3600});

        // let expire = new Date();

        // expire.setHours(expire.getHours()+2);
        // document.cookie=`email=${em}; domain=localhost; expires=` + expire.toUTCString();/////////////////////////
        main.insertAdjacentHTML('beforeend', '<div class="result-op op-success"><p class="message-op">you have successfully logged in</p><i class="far fa-window-close"></i></div>');
    }
    activateWindowClose();
}
})
}


function activateButtonslogOut() {
    let logOut = document.querySelector('#log-out');
    logOut.addEventListener('click', logOutFromAccount);

    function logOutFromAccount() {
        deleteCookie('email') ///переделать куки на запомнить вход/выход
    }

}







function activateWindowClose() {
Array.from(document.querySelectorAll('.fa-window-close')).map(x=>x.addEventListener('click', function (){
    this.parentElement.remove()
}))
}
activateWindowClose()