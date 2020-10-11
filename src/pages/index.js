import React from 'react';
//route dependency
import {BrowserRouter as Router, Route} from 'react-router-dom';

//shared layout component
import Layout from '../components/Layout';

//routes
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NotePage from './note';

//defined routes
const Pages = () => {
    return (
        <Router>
            
          <Layout>
            <Route exact path="/" component={Home}/>
            <Route path="/mynotes" component= {MyNotes} />
            <Route path="/favorites" component= {Favorites} />
            <Route path="/note/:id" component={NotePage}/>
          </Layout>  
            
        </Router>
    );
};

export default Pages;