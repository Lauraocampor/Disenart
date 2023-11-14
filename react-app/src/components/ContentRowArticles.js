import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Articles in DB --> */

let articlesInDB = {
    title: 'Artículos en la base de datos',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total --> */

let total = {
    title:'Cantidad de ventas?', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Users quantity --> */

let usersQuantity = {
    title:'Cantidad de usuarios' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [articlesInDB, total, usersQuantity];

function ContentRowArticles(){
    return (
    
        <div className="row">
            
            {cartProps.map( (article, i) => {

                return <SmallCard {...article} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowArticles;