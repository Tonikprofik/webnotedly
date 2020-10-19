// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './components/GlobalStyle';
//imp Routes
import Pages from '/pages';
//imp Apollo Client libraries
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from 'apollo-link-context';

// configure API URI & cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//check for token and return the headers to the context
const authLink = setContext((_, {headers}) => {
    return {

        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };  
});

//configure Apollo Client
const client  = new ApolloClient({
    link:authLink.concat(httpLink),
    cache, 
    resolvers: {}, 
    connectToDevTools: true
});
// check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};
// write the cache data on initial load
cache.writeData({ data });
// write cache data after cache reset
client.onResetStore( () => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages/>    
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));