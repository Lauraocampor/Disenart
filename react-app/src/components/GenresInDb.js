import React, {useEffect, useState, useRef} from 'react';
import Genre  from './Genre';

function GenresInDb (){
    
    const [genresList, setGenresList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/genres');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()
                setGenresList(data.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const elementoRef = useRef();

    const cambiarBackground = () => {
        elementoRef.current.classList.add('bg-secondary');
    }

    return (
            <React.Fragment>
                    {/*<!-- Categories in DB -->*/}
                    <div className="col-lg-6 mb-4">						
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-gray-800" onMouseOver={cambiarBackground} >Artículos en la base de datos</h6>
                            </div>
                            <div ref={elementoRef} className="card-body fondoCaja">
                                <div className="row">
                                    {/* {genresList.length === 0 && <p>Cargando...</p>} */}
                                    {genresList.map((genre,index)=>{
                                        return <Genre {...genre} key={index} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
            
            </React.Fragment>
    )
}
export default GenresInDb;
