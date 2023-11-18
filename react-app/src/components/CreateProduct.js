import React from "react";

function CreateProduct(){

    function handleSubmit(e) {
        // Previene que el navegador recargue la página
        e.preventDefault();
    }
    return (
        <React.Fragment>
                    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Creación de producto</h5>
                </div>
                <div className="card-body">
                <form method="GET" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Nombre:</label>
									<input type="text" className="form-control" required/>
								</div>
								<div className="form-group">
									<label htmlFor="">Color:</label>
									<select className="form-control" defaultValue={"color"} required> 
                                        <option value="color" disabled={true}>Seleccione un color</option>
                                        <option value="Negro">Negro</option>
                                        <option value="Blanco">Blanco</option>
                                        <option value="Rojo">Rojo</option>
                                        <option value="Azul">Azul</option>
                                        <option value="Verde">Verde</option>
                                        <option value="Amarillo">Amarillo</option>
                                        <option value="Marrón">Marrón</option>
                                        <option value="Violeta">Violeta</option>
                                    </select>
								</div>
								<div className="form-group">
									<label htmlFor="">Talle:</label>
									<select className="form-control" defaultValue={"talle"} required> 
                                        <option value="talle" disabled={true}  >Seleccione un talle</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                        <option value="No Aplica">No Aplica</option>
                                        <option value="Único">Único</option>
                                    </select>
								</div>
								<div className="form-group">
									<label htmlFor="">Precio:</label>
									<input type="number" className="form-control" required min={1}/>
								</div>
								<div className="form-group">
									<label htmlFor="">Descripción:</label>
									<textarea name="descriptionProduct" minLength={20} className="form-control" required/>
								</div>
								<div className="form-group">
									<label htmlFor="">Cantidad:</label>
									<input type="number" className="form-control"required min={1} />
								</div>
								<div className="form-group">
									<label htmlFor="">Foto del producto:</label>
									<input type="file" accept=".jpg, .jpeg, .png, .gif" className="form-control" required/>
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

export default CreateProduct;