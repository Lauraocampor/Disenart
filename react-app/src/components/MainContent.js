import React from 'react';
import ContentRowTop from './ContentRowTop';
import SearchArticles from './SearchArticles';
import Article from './Article';
import UsersInDb from './UsersInDb';
import ProductsDetail from './ProductsDetail';
import FiveLastArticles from './FiveLastArticles';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';

function ContentWrapper(){
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact={true} component={ContentRowTop} />
                <Route path="/products" exact={true} component={SearchArticles} />
                <Route path="/users" exact={true} component={UsersInDb} />
                <Route path="/lastProducts" exact={true} component={FiveLastArticles} />
                <Route path="/productsList" exact={true} component={Article} />
                <Route path="/products/detail/:id" exact={true} component={ProductsDetail} />
                <Route path="/products/create" exact={true} component={CreateProduct} />
                <Route path="/products/edit/:id" exact={true} component={EditProduct} />
                {<Route component={NotFound}/>}
            </Switch>
        </React.Fragment>
    )
}
export default ContentWrapper;