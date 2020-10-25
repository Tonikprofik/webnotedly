import React, { Component } from 'react';
//route dependency
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

//shared layout component
import Layout from '../components/Layout';

//routes
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new'

import {useQuery, gql} from '@apollo/client'

const IS_LOGGED_IN = gql`
{
  isLoggedIn @client
}`;

//defined routes
const Pages = () => {
    return (
        <Router>
            
          <Layout>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/mynotes" component= {MyNotes} />
            <PrivateRoute path="/favorites" component= {Favorites} />
            <Route path="/note/:id" component={NotePage}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
            <PrivateRoute path="/new" component={NewNote}/>
          </Layout>  
            
        </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {loading, error, data} = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  // if error fetching data, dispaly error
  if (error) return <p>Error!</p>;
  
  // if the user is logged in, route them to requested component
  // else redirect to signin page
  return( 
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? ( <Component {...props} />) : (
            <Redirect to = {{ pathname: '/signin', 
                              state: { from: props.location}}} />
        )
      }
    />
  );

};

export default Pages;