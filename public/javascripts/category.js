const button_delete = document.querySelector('.delete-modal');
const delete_input = document.querySelector('.delete-input');
const delete_panel = document.querySelector('.confirm-panel-delete');

button_delete.addEventListener('click', () =>{
    delete_input.classList.toggle('hidden');
    delete_panel.classList.toggle('hidden');

})