import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function EditProduct(){
    const [products, setProduct] = useState(null);
    const { id } = useParams();
    console.log(id)

    function handleSubmit(e) {
        // Previene que el navegador recargue la página
        e.preventDefault();
    }

    useEffect(() => {
        const fetchEdit = async () => {
            try {
                // Obtener información general de todos los productos
                const generalResponse = await fetch('/api/products');
                if (!generalResponse.ok) {
                    throw new Error('Error al obtener datos generales');
                }
                const generalData = await generalResponse.json();
        
            
                // Obtenengo el id
                const productGeneral = generalData.products.find(p => p.id_product === Number(id));
        
                // Verificar que se encontró el producto en la información general
                if (!productGeneral) {
                console.error('Producto no encontrado en la información general');
                return;
                }
        
                // Obtener detalles específicos del producto
                const detailsResponse = await fetch(`/api/products/${id}`);
                if (!detailsResponse.ok) {
                throw new Error('Error al obtener detalles del producto');
                }
                const detailsData = await detailsResponse.json();
        
                // Combina la información general y detallada
                const combinedProduct = { ...productGeneral, ...detailsData };
        
                setProduct(combinedProduct);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchEdit();
    }, [id]);
    
    if (!products) {
        return <p>Cargando...</p>;
    }
    
    return (
        <React.Fragment>
                    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Edición de producto</h5>
                </div>
                <div className="card-body">
                <form method="GET" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Nombre:</label>
									<input type="text" className="form-control" required value={products.name_product}/>
								</div>
								<div className="form-group">
									<label htmlFor="">Precio:</label>
									<input type="number" className="form-control" required min={1} value={products.price_product}/>
								</div>
								<div className="form-group">
									<label htmlFor="">Descripción:</label>
									<textarea name="descriptionProduct" minLength={20} className="form-control" required value={products.description_product}/>
								</div>
								<div className="form-group">
									<label htmlFor="">Cantidad:</label>
									<input type="number" className="form-control"required min={1} value={products.quantity_product}/>
								</div>
								<div className="form-group">
									<label htmlFor="">Foto del producto:</label>
									<input type="file" accept=".jpg, .jpeg, .png, .gif" className="form-control" />
								</div>
                                <button className="btn btn-info">Enviar</button>
							</form>
                </div>
            </div>
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default EditProduct;