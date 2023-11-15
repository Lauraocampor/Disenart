import React, { useState, useEffect } from 'react';

function LastArticlesInDb() {
    const [lastProducts, setLastProducts] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch la API
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Error al obtener datos');
            }
            const data = await response.json();

            // Obtengo últimos 5 productos de la lista
            const lastProductsFromList = data.products.slice(-5);

            console.log(lastProductsFromList)

            // Fetch los últimos 5 productos
            const productPromises = lastProductsFromList.map(async (product) => {
            const productResponse = await fetch(`/api/products/${product.id_product}`);
            if (!productResponse.ok) {
                throw new Error(`Error al obtener detalles del producto con ID ${product.id_product}`);
            }
            const productData = await productResponse.json();
                return productData;
            });

            // Esperar a que se completen todas las solicitudes de productos
            const productsData = await Promise.all(productPromises);

            // últimos 5 productos con sus detalles
            setLastProducts(productsData);
        } catch (error) {
        console.error(error);
        }
    };

    fetchData();
    }, []);

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Últimos 5 artículos agregados</h5>
                </div>
                <div className="card-body">
                {lastProducts.map((product, index) => (
                    <div key={index}>
                    <div className="text-center">
                        <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: '40rem' }}
                        src={product.img_url}
                        alt={product.name_product}
                        />
                    </div>
                    <p>{product.description_product}</p>
                    <a className="btn btn-danger" target="_blank" rel="noreferrer" href={`/products/${product.id_product}/details`}>
                        Ver detalle del producto
                    </a>
                    {index < lastProducts.length - 1 && <hr />} {/* Agregar separador entre productos */}
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default LastArticlesInDb;