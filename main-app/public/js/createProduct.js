window.addEventListener('load', () => {
	let form = document.querySelector('#createProductForm');
	let name = document.querySelector('#createProduct-name');
	let nameError = document.querySelector('#createProduct-nameError');
	let color = document.querySelector('#productColor');
	let colorError = document.querySelector('#productColorError');
	let size = document.querySelector('#size');
	let sizeError = document.querySelector('#sizeError');
	let price = document.querySelector('#productPrice');
	let priceError = document.querySelector('#productPriceError');
	let description = document.querySelector(
		'#createProduct-information-product',
	);
	let descriptionError = document.querySelector(
		'#createProduct-information-productError',
	);
	let contador = document.getElementById('contador');
	let caracteres = document.getElementById('caracteres');
	let stock = document.querySelector('#productStock');
	let stockError = document.querySelector('#productStockError');
	let images = document.querySelector('#productImages');
	let imagesError = document.querySelector('#productImagesError');
	let submit = document.querySelector('#createProduct-finish');

	description.addEventListener('input', () => {
		const inputDescription = description.value;
		const numeroCaracteres = inputDescription.length;

		contador.textContent = numeroCaracteres;

		if (numeroCaracteres >= 20) {
			caracteres.classList.remove('text-danger');
			caracteres.style.fontSize = 'small';
		}
	});

	submit.addEventListener('click', (event) => {
		event.preventDefault();

		let errors = {};

		// NAME
		if (name.value.length <= 4) {
			errors.name = 'Debes ingresar un nombre de al menos 4 caracteres';
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
			errors.description =
				'Debes escribir una descripción de al menos 20 caracteres';
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
		// IMG
		if (images.value.length < 1) {
			errors.images = 'Ingresa imágenes de tipo .jpg, .jpeg, .png, .gif';
		}
		if (images.files.length > 5) {
			errors.images = 'Solo podés cargar hasta 4 imágenes';
		}
		if (Object.keys(errors).length > 0) {
			imagesError.innerText = errors.images ? errors.images : '';
		}
		// SUBMIT
		if (Object.keys(errors).length == 0) {
			form.submit();
		}
	});
});
