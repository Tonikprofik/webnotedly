import { useApolloClient, useMutation, gql } from '@apollo/client';
import React, {useEffect} from 'react'

import UserForm from '../components/UserForm'

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }

`;

const SignIn = (props) => {
    useEffect(() => {
        // update doc title
        document.title = 'Sign In - Notedly';

    });

const client = useApolloClient();
const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
        // store token
        localStorage.setItem('token', data.signIn);
        // update local cache
        client.writeData({ data: {isLoggedIn: true }});
        // redirect user to homepage
        props.history.push('/');
    }
})


return (
    <React.Fragment>
        <UserForm action={signIn} formtype="signIn"/>
        {/* if data is loading display loading */}
        { loading && <p>Loading.... </p>}
        { /* if error, show error  */ }        
        { error && <p>Error. signing in! </p>}
    </React.Fragment>
    );
};

export default SignIn;