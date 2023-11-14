import React from 'react';
import ContentRowTop from './ContentRowTop';
import SearchArticles from './SearchArticles';
import Article from './Article';
import UsersInDb from './UsersInDb';
import ContentRowArticles from './ContentRowArticles';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';

function ContentWrapper(){
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact="true" component={ContentRowTop} />
                <Route path="/SearchArticles" exact="true" component={SearchArticles} />
                <Route path="/pages" exact="true" component={UsersInDb} />
                <Route path="/charts" exact="true" component={ContentRowArticles} />
                <Route path="/tables" exact="true" component={Article} />
                {<Route component={NotFound}/>}
            </Switch>
        </React.Fragment>
    )
}
export default ContentWrapper;