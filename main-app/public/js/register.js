window.addEventListener('load', () => {
	// DECLARATIONS
	let button = document.querySelector('#registerButton');
	let form = document.querySelector('#registerForm');
	let email = document.querySelector('#inputEmailRegister');
	let emailError = document.querySelector('#emailErrorRegister');
	// EVENT
	button.addEventListener('click', (event) => {
		event.preventDefault();
		let errors = {};
		// EMAIL
		if (email.value.length < 1 || !email.value.includes('@')) {
			errors.email = 'Debes ingresar un correo electrónico válido';
		}
		if (Object.keys(errors).length > 0) {
			emailError.innerText = errors.email ? errors.email : '';
		}

		if (Object.keys(errors).length == 0) {
			form.submit();
		}
	});
});
