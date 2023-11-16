import React, {useEffect, useState} from 'react';
import ArticlesList from './ArticlesList';

function Article(){

	const [articles, setArticles] = useState([]);

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

    return(
        <React.Fragment>
				    {/*<!-- PRODUCTS LIST -->*/}
					<h1 className="h3 mb-2 text-gray-800">Todos los productos en la base de datos</h1>
					
					{/*<!-- DataTales Example -->*/}
					<div className="card shadow mb-4">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
									<thead>
										<tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Detalle</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
										<th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Detalle</th>
										</tr>
									</tfoot>
									<tbody>
										{articles.length === 0 && <tr><td>Cargando...</td></tr>}
										{articles.map((article,index)=>{
											return <ArticlesList {...article} key={index} />
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>            
        </React.Fragment>
    )
}
export default Article;