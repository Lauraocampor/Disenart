import React, {useEffect, useState} from 'react';
import ArticlesList from './ArticlesList';

function Article(){

	const [articles, setArticles] = useState([]);

	useEffect(() => {
		//console.log('%c se montó el componente', 'color: green');
		const articlesFetch = async() => {
			try {
				const response = await fetch('/api/products');
				if(!response.ok){
					throw new Error('Error al obtener datos');
				}
				const data = await response.json();
				//console.log(data);
				setArticles(data.products)
			} catch (error) {
				console.error(error);
			}
		}
		articlesFetch()
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
                                            <th>Especificaciones</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
										<th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Especificaciones</th>
										</tr>
									</tfoot>
									<tbody>
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