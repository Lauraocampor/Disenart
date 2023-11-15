import React from 'react';
import LastArticleInDb from './LastArticleInDb';
import UsersInDb from './UsersInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastArticleInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <UsersInDb />

        </div>
    )
}

export default ContentRowCenter;