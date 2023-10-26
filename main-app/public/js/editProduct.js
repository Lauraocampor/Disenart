window.addEventListener('load', () => {
    let form = document.querySelector('#editProductForm');
    let name = document.querySelector('#editProduct-name');
    let nameError = document.querySelector('#editProduct-nameError');
    let color = document.querySelector('#editProduct-color');
    let colorError = document.querySelector('#editProduct-colorError');
    let size = document.querySelector('#editProduct-size');
    let sizeError = document.querySelector('#editProduct-sizeError');
    let price = document.querySelector('#productPrice');
    let priceError = document.querySelector('#productPriceError');
    let description = document.querySelector('#editProduct-information-product');
    let descriptionError = document.querySelector('#editProduct-information-productError');
    let stock = document.querySelector('#editProduct-stock');
    let stockError = document.querySelector('#editProduct-stockError');
/*     let images = document.querySelector('#editProduct-images');
    let imagesError = document.querySelector('#editProduct-imagesError'); */
    let submit = document.querySelector('#editProduct-finish');


    submit.addEventListener('click', (event) => {
        event.preventDefault();

        let errors = {}
        
        // NAME
		if (name.value.length <= 5) {
			errors.name = 'Debes ingresar un nombre de al menos 5 caracteres';
		}
		if (Object.keys(errors).length > 0) {
			nameError.innerText = errors.name ? errors.name : '';
		}
        
        // COLOR
		if (color.value === 'Color') {
			errors.color = 'Debes elegir o crear un color';
		}
		if (Object.keys(errors).length > 0) {
			colorError.innerText = errors.color ? errors.color : '';
		}

        // SIZE
		if (size.value === 'Talle') {
			errors.size = 'Debes elegir o crear un talle';
		}
		if (Object.keys(errors).length > 0) {
			sizeError.innerText = errors.size ? errors.size : '';
		}

        // PRICE
		if (price.value.length < 1 || isNaN(price.value)) {
			errors.price = 'Debes asignar un valor numérico válido';
		}
		if (Object.keys(errors).length > 0) {
			priceError.innerText = errors.price ? errors.price : '';
		}

        // DESCRIPTION
		if (description.value.length <= 20) {
			errors.description = 'Debes escribir una descripción de al menos 20 caracteres';
		}
		if (Object.keys(errors).length > 0) {
			descriptionError.innerText = errors.description ? errors.description : '';
		}

        // STOCK
		if (stock.value.length < 1 || isNaN(stock.value)) {
			errors.stock = 'Debes elegir una cantidad';
		}
		if (Object.keys(errors).length > 0) {
			stockError.innerText = errors.stock ? errors.stock : '';
		}

		// SUBMIT
		if (Object.keys(errors).length == 0) {
			form.submit();
		}
    })

})