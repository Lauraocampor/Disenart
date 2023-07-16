// Obtener el botón que abre el modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}
  
// Obtener el elemento que cierra el modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}
  
// Obtener los modales
var modals = document.getElementsByClassName('modal');
  
// Cerrar los modales al hacer clic fuera de ellos
window.addEventListener('click', function(event) {
    for (var i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
        modals[i].style.display = 'none';
      }
    }
});
  