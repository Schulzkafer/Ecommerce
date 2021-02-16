let body = document.body;

function showHideStuffCommonF(arg) { //не везде работает 
    arg = document.querySelector(arg)
    arg.hidden = !arg.hidden;
}

function cleanHtmlCommonF(arr) {
    arr.forEach(x=>document.querySelector(x).innerHTML = '');
} 

function showPasswordCommonF(elem) {
    let el = document.querySelector('#' + elem);
    el.type = (el.type == "password") ? 'text' : "password";
  }