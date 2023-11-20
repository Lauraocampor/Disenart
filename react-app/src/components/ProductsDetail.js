import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function ProductsDetail() {
  const [products, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductsDetails = async () => {
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

    fetchProductsDetails();
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
                      <h5 className="m-0 font-weight-bold text-gray-800">{products.name_product}</h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                          <img
                          className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                          style={{ width: '40rem' }}
                          src={products.img_url}
                          alt={products.name_product}
                          />
                      </div>
                      <div>
                        <p>CANTIDAD: {products.quantity_product}</p>
                        <p>PRECIO: {`${products.price_product}`}</p>
                        <p>ESPECIFICACIONES: {products.description_product}</p>
                      </div>
                      <section>
                        <a className="btn btn-info" style={{ marginRight: '10px' }} href={`/products/edit/${products.id_product}`}>
                          Modificar
                        </a>
                        <a className="btn btn-danger" style={{ marginRight: '10px' }} href={`/products/delete/${products.id_product}`}>
                          Borrar
                        </a>
                        <a className="btn btn-info" href="/products">
                          Productos
                        </a>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </React.Fragment>
  );
}

export default ProductsDetail;