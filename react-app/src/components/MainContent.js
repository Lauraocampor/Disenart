import React from 'react';
import ContentRowTop from './ContentRowTop';
import SearchArticles from './SearchArticles';
import Article from './Article';
import UsersInDb from './UsersInDb';
import ContentRowArticles from './ContentRowArticles';
import ProductsDetail from './ProductsDetail';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';

function ContentWrapper(){
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact={true} component={ContentRowTop} />
                <Route path="/search" exact={true} component={SearchArticles} />
                <Route path="/pages" exact={true} component={UsersInDb} />
                <Route path="/charts" exact={true} component={ContentRowArticles} />
                <Route path="/tables" exact={true} component={Article} />
                <Route path="/products/detail/:id" exact={true} component={ProductsDetail} />
                {<Route component={NotFound}/>}
            </Switch>
        </React.Fragment>
    )
}
export default ContentWrapper;