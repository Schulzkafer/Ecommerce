let body = document.body;

function showHideStuffCommonF(arg) {
    arg = document.querySelector(arg)
    arg.hidden = !arg.hidden;
}

function cleanHtmlCommonF(arr) {
    arr.forEach(x=>document.querySelector(x).innerHTML = '');
} 
