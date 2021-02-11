'use strict';

let personalInfo = document.querySelector('#personal-info');
let registrationContainer = document.querySelector('#registration-container');
let emailCheckin = document.querySelector('#email-checkin');

let registrationButton = null;
let buttonCheckin = null;

if (getCookie('email')) {
    registrationContainer.innerHTML = '';
    registrationContainer.insertAdjacentHTML('beforeend', `<p id="account-settings"><a href="/userpage">Access your account settings<i class="fas fa-user-cog"></i></a><p>
    <p id="log-out">Logout <i class="fas fa-sign-out-alt"></i></p>`);

    activateButtonslogOut();
} else {
    registrationContainer.innerHTML = '';
    registrationContainer.insertAdjacentHTML('beforeend', `<form id="registration-form">
                            <label for="email-checkin" class="label-reg">E-mail</label>
                            <input id="email-checkin" type="email" name="email">
                            <label for="password-checkin" class="label-reg">Password</label>
                            <input id="password-checkin" type="password" name="password">
                            <input type="submit" value="Check in" id="button-checkin">
                            <div><p id="result-message"></p></div>
                        </form>

                        <div id="account-frase"><p>Don't have a account?</p>
                            <button id="registration-button"><a href="/openregistration">Register now</a></button>
                        </div>`)
    registrationButton = document.querySelector('#registration-button');
    buttonCheckin = document.querySelector('#button-checkin');
    activateButtonsCheckin();
}


personalInfo.addEventListener('click', () => {
    registrationContainer.hidden = !registrationContainer.hidden;
});


function activateButtonsCheckin() {
    buttonCheckin.addEventListener('click', (event) => {
        event.preventDefault();
        let em = document.querySelector('#email-checkin').value;
        let pa = document.querySelector('#password-checkin').value;
        let json = JSON.stringify({ 'email': em, 'password': pa });
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/checkin');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(json);
        xhr.onload = function () {
            let resultMessage = document.querySelector('#result-message');
            if (xhr.status == 401) {
                resultMessage.innerHTML = 'check-in data error';
                resultMessage.style.color = 'red';
                // main.insertAdjacentHTML('beforeend', '<div class="result-op op-error"><p class="message-op">check-in data error</p><i class="far fa-window-close"></i></div>');
            } else if (xhr.status == 500) {
                resultMessage.innerHTML = 'internal server error';
                resultMessage.style.color = 'yellow';
                // main.insertAdjacentHTML('beforeend', '<div class="result-op op-server-error"><p class="message-op">internal server error</p><i class="far fa-window-close"></i></div>');
            } else if (xhr.status == 200) {

                resultMessage.innerHTML = 'you have successfully logged in';
                resultMessage.style.color = 'green';
                let res = JSON.parse(xhr.response)[0];
                console.log(res)

                let idU = res.id;
                setCookie('id', idU, { 'max-age': 3600 });

                let ema = res.email;
                setCookie('email', ema, { 'max-age': 3600 });

                let cre = res.credit;
                setCookie('credit', cre, { 'max-age': 3600 });

                let nam = res.name;
                setCookie('name', nam, { 'max-age': 3600 });

                let surnam = res.surname;
                setCookie('surname', surnam, { 'max-age': 3600 });
                location.href = location.href;

            }
            activateWindowClose();
        }
    })
}


function activateButtonslogOut() {
    let logOut = document.querySelector('#log-out');
    logOut.addEventListener('click', logOutFromAccount);

    function logOutFromAccount() {
        deleteCookie('email'); ///переделать куки на запомнить вход/выход
        location.href = location.href;
    }

}







function activateWindowClose() {
    Array.from(document.querySelectorAll('.fa-window-close')).map(x => x.addEventListener('click', function () {
        this.parentElement.remove()
    }))
}
activateWindowClose()