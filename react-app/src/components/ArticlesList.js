import React from 'react';

function ArticlesList(props){
    return(
        <React.Fragment>
            <tr>
                <td>{props.id_product}</td>
                <td>{props.name_product}</td>
                <td>{props.quantity_product}</td>
                <td>{props.price_product}</td>
                <td>{props.description_product}</td>
            </tr>    
        </React.Fragment>
    )
}
export default ArticlesList;