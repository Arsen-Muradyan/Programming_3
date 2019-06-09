var clickCount = 0;
function clickHandler(e){
    alert(e.keyCode)
}

var p = document.getElementById("pElement");
window.addEventListener("keydown", clickHandler);

