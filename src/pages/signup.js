import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import {useMutation, useApolloClient, gql} from '@apollo/client'

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
    //default state of the form
    const [ values, setValues] = useState();
    //update state when user types in the form
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
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
        <Wrapper>
            <h2>Sign Up</h2>
            {/* pass the form data to the mutation when user submits */}
            <Form 
                onSubmit={event => {
                    event.preventDefault();
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }} >
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
