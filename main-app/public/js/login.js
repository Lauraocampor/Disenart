window.addEventListener('load', () => {
	// DECLARATIONS
	let button = document.querySelector('#formButtonSub');
	let form = document.querySelector('#loginModalForm');
	let emailInput = document.querySelector('#emailInput');
	let errMsgMail = document.querySelector('#textDangerVal');
	let passInput = document.querySelector('#passInput');
	let errMsgPass = document.querySelector('#textDangerPass');
	// EVENT
	button.addEventListener('click', (event) => {
		event.preventDefault();
		let frontErrors = {};
		// EMAIL VAL
		if (emailInput.value.length < 1) {
			frontErrors.email = 'Debes poner tu correo electrónico acá';
		}
		if (Object.keys(frontErrors).length > 0) {
			errMsgMail.innerText = frontErrors.email ? frontErrors.email : '';
		}
		// PASS VAL
		if (passInput.value.length < 1) {
			frontErrors.pass = 'Debes poner tu contraseña acá';
		}
		if (Object.keys(frontErrors).length > 0) {
			errMsgPass.innerText = frontErrors.pass ? frontErrors.pass : '';
		} else {
			form.submit();
		}
	});
});
