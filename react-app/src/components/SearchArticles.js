import React, {useEffect, useState} from 'react';

//import noPoster from '../assets/images/no-poster.jpg';

function SearchArticles(){
	
	const keyword = 'action'

	// Credenciales de API
	const apiKey = '27768b76'; // Intenta poner cualquier cosa antes para probar

	const [articles, setArticles] = useState([])

	useEffect(() => {
        const fetchData = async () => {
			console.log('%c se montó el componente', 'color: green');
            try {
                const response = await fetch('http://www.omdbapi.com/?s=' + keyword +'&apikey=' + apiKey);
                //const response = await fetch('http://www.omdbapi.com/?s=action&apikey=27768b76');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()
				//console.log(data.Search);
                setArticles(data.Search);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" />
								</div>
								<button className="btn btn-info">Buscar</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Artículos para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							articles.length > 0 && articles.map((article, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{article.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={article.Poster}
														alt={article.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{article.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ articles.length === 0 && <div className="alert alert-warning text-center">No se encontraron artículos</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchArticles;
