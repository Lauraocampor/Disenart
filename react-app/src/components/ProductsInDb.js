import React, { useEffect, useState, useRef } from 'react';
import Products from './Products'; // Asegúrate de importar el componente correcto

function ProductsInDb() {

  const [countByCategory, setCountByCategory] = useState({});
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        const data = await response.json();

        // Obtener count y countByCategory del resultado
        const { countByCategory, products } = data;

        // Actualizar los estados
        setCountByCategory(countByCategory);
        setProductsList(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const elementoRef = useRef();

  const cambiarBackground = () => {
    elementoRef.current.classList.add('bg-secondary');
  };

  return (
    <React.Fragment>
      {/*<!-- Categories in DB -->*/}
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-gray-800" onMouseOver={cambiarBackground}>
              Productos en la base de datos
            </h6>
          </div>
          <div ref={elementoRef} className="card-body fondoCaja">
            <div className="row">
              {productsList.length === 0 && <p>Cargando...</p>}
              {Object.entries(countByCategory).map(([category, count]) => (
  <Products key={category} categoryName={category} categoryCount={count} />
))}
            </div>
          </div>
        </div>
      </div>

      
    </React.Fragment>
  );
}

export default ProductsInDb;