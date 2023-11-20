import React, {useEffect, useState, useRef} from 'react';

//import noPoster from '../assets/images/no-poster.jpg';

function SearchArticles(){

	const inputRef = useRef(null);

	const [articles, setArticles] = useState([])
	const [resultados, setResultados] = useState([]);

	useEffect(() => {
		//console.log('%c Se montó el componente', 'color: green');
		const articlesFetch = async () => {
			try {
				const response = await fetch('/api/products');
				if (!response.ok) {
					throw new Error('Error al obtener datos');
				}
				
				const data = await response.json();
				const products = data.products;
				const productsId = products.map(product => product.id_product);
				
				const articlesArray = [];
				
				for (const id of productsId) {
					const apiUrl = `/api/products/${id}`;
					const apiResponse = await fetch(apiUrl);
					
					if (!apiResponse.ok) {
						throw new Error('Error al obtener datos para el producto con ID ' + id);
					}
					
					const responseData = await apiResponse.json();
					articlesArray.push(responseData);
				}
				// Después de completar todas las solicitudes, actualiza el estado
				setArticles(articlesArray);
			} catch (error) {
			console.error(error);
			}
		};
		
		articlesFetch();
	}, []);

	const buscarProductoPorNombre = (keyword) => {
		const resultados = articles.filter(producto =>
			producto.name_product.toLowerCase().includes(keyword.toLowerCase())
		);
		setResultados(resultados);
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const input = inputRef.current.value;
		buscarProductoPorNombre(input);
	};

	return(
		<div className="container-fluid">
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" ref={inputRef} className="form-control" />
								</div>
								<button className="btn btn-info">Buscar</button>
							</form>
						</div>
					</div>
					{
						inputRef.current && inputRef.current.value  ?
						<>
							<div className="row">
								<div className="col-12">
									<h2>Productos para la palabra: {inputRef.current && inputRef.current.value}</h2>
								</div>
								{/* Listado de películas */}
								{
									resultados  && resultados.map((article, i) => {
										return (
											<div className="col-sm-6 col-md-3 my-2" key={i}>
												<div className="card shadow mb-4">
													<div className="card-header py-3">
														<h5 className="m-0 font-weight-bold text-gray-800">{article.name_product}</h5>
													</div>
													<div className="card-body">
														<div className="text-center">
															<img 
																className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
																src={article.img_url}
																alt={article.name_product} 
																style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
															/>
														</div>
														<p>{article.price_product}</p>
														<a className="btn btn-info" target="_blank" rel="noreferrer" href={`/products/detail/${article.id_product}`}>
															Ver detalle del producto 
														</a>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
							{ resultados.length  === 0  && <div className="alert alert-warning text-center">No se encontraron artículos</div>}
						</>
						:
						<>
							<div className="row">
								<div className="col-12">
									<h2>Productos para la palabra: {inputRef.current && inputRef.current.value}</h2>
								</div>
								{/* Listado de películas */}
								{articles.length === 0 && <p>Cargando...</p>}
									{
										articles && articles.map((article, i) => {
											return (
											<div className="col-sm-6 col-md-3 my-4" key={i}>
												<div className="card shadow mb-4">
												<div className="card-header py-3">
													<h5 className="m-0 font-weight-bold text-gray-800">{article.name_product}</h5>
												</div>
												<div className="card-body">
													<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={article.img_url}
														alt={article.name_product} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
													</div>
													<p>{article.price_product}</p>
													<a className="btn btn-info btn-sm" target="_blank" rel="noreferrer" href={`/products/detail/${article.id_product}`}>
															Ver detalle del producto 
													</a>
												</div>
												</div>
											</div>
											);
										})
									}
							</div>
						</>
					}
		</div>
	)
}

export default SearchArticles;
