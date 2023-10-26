window.addEventListener('load', () => {
    let form = document.querySelector('#createSizeForm');
    let submit = document.querySelector('#colour-size-finish');
    let size = document.querySelector('#productSize');
    let sizeError = document.querySelector('#productSizeError');

    submit.addEventListener('click', (event) => {
        event.preventDefault();

        let errors = {}

        // SIZE
		if (size.value.length < 1) {
			errors.size = 'Debes escribir un talle';
		}
		if (Object.keys(errors).length > 0) {
			sizeError.innerText = errors.size ? errors.size : '';
		}

		// SUBMIT
		if (Object.keys(errors).length == 0) {
			form.submit();
		}
    })  
})