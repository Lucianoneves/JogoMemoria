const input =document.querySelector('.login__input');
const button =document.querySelector('.login__button');
const form =document.querySelector('.login-form');

const validadeInput = ({target}) => {
    if (target.value.length > 3){
    button.removeAttribute('disabled');
return;
}
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) =>{
event.preventDefault();

console.log(input.value)

localStorage.setItem('player', input.value);
window.location = 'pages/game.html';

}

input.addEventListener('input', validadeInput);
form.addEventListener('submit', handleSubmit);