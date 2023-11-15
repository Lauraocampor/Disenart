import React, {useEffect, useState, useRef} from 'react';
import User  from './User';

function UsersInDb (){
    
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()

                const users = data.users;
				const usersId = users.map(user => user.id);
				
				const usersArray = [];
				
				for (const id of usersId) {
					const apiUrl = `/api/users/${id}/detail`;
					const apiResponse = await fetch(apiUrl);
					
					if (!apiResponse.ok) {
						throw new Error('Error al obtener datos para el producto con ID ' + id);
					}
					
					const responseData = await apiResponse.json();
					usersArray.push(responseData);
				}
				console.log(usersArray)
				// Después de completar todas las solicitudes, actualiza el estado
				setUsersList(usersArray);
            } catch (error) {
                console.error(error);
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
                                <h6 className="m-0 font-weight-bold text-gray-800" onMouseOver={cambiarBackground} >Usuarios en la base de datos</h6>
                            </div>
                            <div ref={elementoRef} className="card-body fondoCaja">
                                <div className="row">
                                    {usersList.length === 0 && <p>Cargando...</p>}
                                    {usersList.map((user,index)=>{
                                        return <User {...user} key={index} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
            
            </React.Fragment>
    )
}
export default UsersInDb;
