import React, {useEffect, useState} from 'react';
import SmallCard from './SmallCard';


function ContentRowArticles(){
    /*  Cada set de datos es un objeto literal */

    /* <!-- Total Products--> */
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
                    title: 'Cantidad de productos',
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

    /* <!-- Total Categories --> */
    const [categoryList, setCategoryList] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products');
                if(!response.ok){
                    throw new Error('Error al obtener datos');
                }
                const data = await response.json()
                setCategoryList({
                    title: 'Cantidad de categorías',
                    color: 'success', 
                    cuantity: Object.getOwnPropertyNames(data.countByCategory).length,
                    icon: 'fa-list-ol'
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []) 

    /* <!-- Total Users --> */
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

    const cartProps = [productsList, categoryList, usersList];

    return (
    
        <div className="row">
            
            {cartProps.map( (article, i) => {

                return <SmallCard {...article} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowArticles;