import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import {useMutation, useApolloClient, gql} from '@apollo/client'
import UserForm from '../components/UserForm'

import Button from '../components/Button';

const Wrapper = styled.div`
    border: 3px solid purple;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input{
        width: 100%;
        margin-bottom: 1em;
    }

`;

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!)
            {
            signUp(email: $email, username: $username, password:$password)
            }`;

const SignUp = (props) => {
    //update document title
    useEffect( () => {
        document.title= 'Sign Up - Notedly';
    });
    
    // Apollo Client
    const client = useApolloClient();
    //Mutation hook
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, { 
        onCompleted: data => {
        // store jwt token
        localStorage.setItem('token',data.signUp);
        //update local cache
        client.writeData({data: {isLoggedin: true} });
        // redirect user to homepage after completion
        props.history.push('/');
        }});

    return (
        <React.Fragment>
            {/* pass the form data to the mutation when user submits */}
            <UserForm action={signUp} formType="signup"/>
            {/* if data loading, show loading message */}
            {loading && <p>Loading...</p>}
            {/* if theres error, display error message */}
            {error && <p>Error creating an account!</p>}            
        </React.Fragment>
    );
};

export default SignUp;
