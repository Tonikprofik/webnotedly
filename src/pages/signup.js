import React,{useEffect, useState} from 'react'
import styled from 'styled-components'

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

    return (
        <Wrapper>
            <Form>
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
