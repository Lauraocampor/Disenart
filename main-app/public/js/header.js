window.addEventListener('load', () => {
	// SEARCH VALIDATOR
	let searchBarButton = document.querySelector('.header--searchButton');
	let searchBarForm = document.querySelector('#searchBarForm');
	let searchBarInput = document.querySelector('#inputSearch');
	let searchBarMsg = document.querySelector('#searchBarMsg');

	searchBarButton.addEventListener('click', (event) => {
		event.preventDefault();
		let searchErrors = {};
		if (searchBarInput.value.length < 1 || searchBarInput.value.length > 50) {
			searchErrors.searchBarInput =
				'Tu búsqueda debe tener entre uno y cincuenta carácteres';
		}
		if (Object.keys(searchErrors).length > 0) {
			searchBarMsg.innerText = searchErrors.searchBarInput;
			searchBarMsg.style.color = 'var(--mustard)';
			searchBarMsg.style.textAlign = 'center  ';
		} else {
			searchBarForm.submit();
		}
	});

	// USER BUTTON LOGIN CREATOR
	try {
		document.getElementById('avatarButton').addEventListener(
			'click',
			() => {
				document
					.getElementById('userList')
					.classList.toggle('about-user-toggler');
			},
			false,
		);
	} catch (error) {
		console.log('There is no user logged at the moment.');
	}

	// HAMBURGER SCRIPT
	document.getElementById('hamburgerButton').addEventListener(
		'click',
		() => {
			document
				.getElementById('hamburgerList')
				.classList.toggle('about-nav-toggler');
		},
		false,
	);

	// OPEN SEARCH SCRIPT
	document.getElementById('searchButton').addEventListener(
		'click',
		() => {
			document.getElementById('searchModal').classList.toggle('searchToggle');
		},
		false,
	);

	document.getElementById('searchButton').addEventListener(
		'click',
		() => {
			document
				.getElementById('searchBoxPosition')
				.classList.toggle('searchToggleBox');
		},
		false,
	);

	document.getElementById('searchButton').addEventListener(
		'click',
		() => {
			document
				.getElementById('searchModalBox')
				.classList.toggle('searchToggleBox');
		},
		false,
	);

	// CLOSE SEARCH SCRIPT
	document.getElementById('escapeButton').addEventListener(
		'click',
		() => {
			document.getElementById('searchModal').classList.toggle('searchToggle');
		},
		false,
	);

	document.getElementById('escapeButton').addEventListener(
		'click',
		() => {
			document
				.getElementById('searchModalBox')
				.classList.toggle('searchToggleBox');
		},
		false,
	);

	document.getElementById('escapeButton').addEventListener(
		'click',
		() => {
			document
				.getElementById('searchBoxPosition')
				.classList.toggle('searchToggleBox');
		},
		false,
	);
});
