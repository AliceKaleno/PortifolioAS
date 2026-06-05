const scanButton =
document.getElementById("scanButton");

const scannerResult =
document.getElementById("scannerResult");

let aberto = false;

scanButton.addEventListener("click", () => {

if(!aberto){

scannerResult.classList.remove("scanner-hidden");

scannerResult.classList.add("scanner-active");

scanButton.innerHTML =
'<i class="fas fa-times"></i>';

aberto = true;

}else{

scannerResult.classList.remove("scanner-active");

scannerResult.classList.add("scanner-hidden");

scanButton.innerHTML =
'<i class="fas fa-robot"></i>';

aberto = false;

}

});