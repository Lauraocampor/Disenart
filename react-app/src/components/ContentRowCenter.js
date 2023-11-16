import React from 'react';
import LastArticleInDb from './LastArticleInDb';
import ProductsInDb from './ProductsInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastArticleInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <ProductsInDb />

        </div>
    )
}

export default ContentRowCenter;