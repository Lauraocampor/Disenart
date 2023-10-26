window.addEventListener('load', () => {
	// DECLARATIONS
	let button = document.querySelector('#registerButton');
	let form = document.querySelector('#registerForm');
	let email = document.querySelector('#inputEmailRegister');
	let emailError = document.querySelector('#emailErrorRegister');
	let name = document.querySelector('#inputNameRegister');
	let nameError = document.querySelector('#nameErrorRegister');
	let lastName = document.querySelector('#inputLastNameRegister');
	let lastNameError = document.querySelector('#lastNameRegisterError');
	let password = document.querySelector('#inputPassRegister');
	let passwordError = document.querySelector('#passRegisterError');
	let birth = document.querySelector('#inputBirthRegister');
	let birthError = document.querySelector('#birthRegisterError');
	let image = document.querySelector('#inputImgRegister');
	let imageError = document.querySelector('#imgRegisterError');
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
		// NAME
		if (name.value.length < 1) {
			errors.name = 'Debes ingresar un nombre';
		}
		if (Object.keys(errors).length > 0) {
			nameError.innerText = errors.name ? errors.name : '';
		}
		// LAST NAME
		if (lastName.value.length < 1) {
			errors.lastName = 'Debes ingresar un apellido';
		}
		if (Object.keys(errors).length > 0) {
			lastNameError.innerText = errors.lastName ? errors.lastName : '';
		}
		//PASSWORD
		if (password.value.length < 8) {
			errors.password = 'La contraseña debe tener por lo menos 8 caracteres';
		}
		if (Object.keys(errors).length > 0) {
			passwordError.innerText = errors.password ? errors.password : '';
		}
		// BIRTH
		if (birth.value.length < 1) {
			errors.birth = 'Debes ingresar una fecha de nacimiento';
		}
		if (Object.keys(errors).length > 0) {
			birthError.innerText = errors.birth ? errors.birth : '';
		}
		// IMG
		if (image.value.length < 1) {
			errors.image = 'Ingresa una imagen de tipo .jpg, .jpeg, .png, .gif';
		}
		if (Object.keys(errors).length > 0) {
			imageError.innerText = errors.image ? errors.image : '';
		}
		// SUBMIT
		if (Object.keys(errors).length == 0) {
			form.submit();
		}
	});
});
