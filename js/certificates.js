const modal =
document.getElementById("certificateModal");

const modalImage =
document.getElementById("modalImage");

const closeModal =
document.querySelector(".close-modal");

function openModal(image){

modal.style.display = "flex";

modalImage.src = image;

}

closeModal.addEventListener("click", () => {

modal.style.display = "none";

});

function toggleInfo(button){

const info =
button.parentElement.nextElementSibling;

info.classList.toggle("active");

if(info.classList.contains("active")){

button.textContent = "Mostrar Menos";

}else{

button.textContent = "Saber Mais";

}

}
