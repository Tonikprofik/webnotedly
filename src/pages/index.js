import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//routes
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';

//defined routes
const Pages = () => {
    return (
        <Router>
            <Route exact path="/" component={Home}/>
            <Route path="/mynotes" component= {MyNotes} />
            <Route path="/favorites" component= {Favorites} />
            
        </Router>
    );
};

export default Pages;