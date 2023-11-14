import React, {useEffect, useState} from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Total --> */

let total = {
    title:'Cantidad de ventas?', 
    color:'success', 
    cuantity: '20',
    icon:'fa-award'
}

function ContentRowArticles(){

    /* <!-- Articles in DB --> */
    const [productsList, setProductsList] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()
                setProductsList({
                    title: 'Artículos en la base de datos',
                    color: 'primary', 
                    cuantity: data.count,
                    icon: 'fa-clipboard-list'
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [])

    /* <!-- Users quantity --> */
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()
                setUsersList({title:'Cantidad de usuarios',
                color:'warning',
                cuantity: data.count,
                icon:'fa-user-check'});
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [])

    const cartProps = [productsList, total, usersList];

    return (
    
        <div className="row">
            
            {cartProps.map( (article, i) => {

                return <SmallCard {...article} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowArticles;