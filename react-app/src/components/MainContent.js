import React from 'react';
import ContentRowTop from './ContentRowTop';
import SearchMovies from './SearchMovies';
import Movie from './Movie';
import GenresInDb from './GenresInDb';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';

function ContentWrapper(){
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact="true" component={ContentRowTop} />
                <Route path="/SearchMovies" exact="true" component={SearchMovies} />
                <Route path="/pages" exact="true" component={GenresInDb} />
                <Route path="/charts" exact="true" component={ContentRowMovies} />
                <Route path="/tables" exact="true" component={Movie} />
                {<Route component={NotFound}/>}
            </Switch>
        </React.Fragment>
    )
}
export default ContentWrapper;