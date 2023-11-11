import React, {useEffect, useState} from 'react';
import MovieList from './MovieList';

function Movie(){

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		//console.log('%c se montó el componente', 'color: green');
		const moviesFetch = async() => {
			try {
				const response = await fetch('/api/movies');
				if(!response.ok){
					throw new Error('Error al obtener datos');
				}
				const data = await response.json();
				//console.log(data.data);
				setMovies(data.data)
			} catch (error) {
				console.error(error);
			}
		}
		moviesFetch()
	}, [])

    return(
        <React.Fragment>
				    {/*<!-- PRODUCTS LIST -->*/}
					<h1 className="h3 mb-2 text-gray-800">Todos los artículos en la base de datos</h1>
					
					{/*<!-- DataTales Example -->*/}
					<div className="card shadow mb-4">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
									<thead>
										<tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Espacificaciones</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
										<th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Espacificaciones</th>
										</tr>
									</tfoot>
									<tbody>
										{movies.map((movie,index)=>{
											return <MovieList {...movie} key={index} />
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>            
        </React.Fragment>
    )
}
export default Movie;