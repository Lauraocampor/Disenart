import React, { useState, useEffect } from 'react';


function LastArticleInDb() {
    const [lastProduct, setLastProduct] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch la API
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Error al obtener datos');
          }
          const data = await response.json();
  
          // Obtengo último producto de la lista
          const lastProductFromList = data.products[data.products.length - 1];
  
          // Obtenengo el id
          const lastProductId = lastProductFromList.id_product;
  
          // Fetch el último producto
          const productResponse = await fetch(`/api/products/${lastProductId}`);
          if (!productResponse.ok) {
            throw new Error('Error al obtener detalles del último producto');
          }
          const productData = await productResponse.json();
  
          // último producto con sus detalles
          setLastProduct(productData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Último artículo agregado</h5>
          </div>
          <div className="card-body">
            {lastProduct && (
              <>
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    style={{ width: '40rem' }}
                    src={lastProduct.img_url}
                    alt={lastProduct.name_product}
                  />
                </div>
                <p>{lastProduct.description_product}</p>
                <a className="btn btn-danger" target="_blank" rel="noreferrer" href={`/products/detail/${lastProduct.id_product}`}>
                  Ver detalle del producto
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default LastArticleInDb;