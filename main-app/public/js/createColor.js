window.addEventListener('load', () => {
    let form = document.querySelector('#createColorForm');
    let submit = document.querySelector('#colour-size-finish');
    let color = document.querySelector('#productColor');
    let colorError = document.querySelector('#productColorError');

    submit.addEventListener('click', (event) => {
        event.preventDefault();

        let errors = {}
        
        // COLOR
		if (color.value.length < 1) {
			errors.color = 'Debes escribir un color';
		}
		if (Object.keys(errors).length > 0) {
			colorError.innerText = errors.color ? errors.color : '';
		}

		// SUBMIT
		if (Object.keys(errors).length == 0) {
			form.submit();
		}
    })  
})