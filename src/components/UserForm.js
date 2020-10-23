import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const Wrapper = styled.div`
    border: 1px solid purple
    max-width: 500px;
    padding: 1em;
    margin:0 auto;
    
    `;

const Form = styled.form`
    label,
    input: {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

const UserForm = props => {
    //default state of form
    const [values, setValues] = useState();

    //update the state when user types in form
    const onChange = event => {
        setValues({
            ...values,[event.target.name] : event.target.value
        });
    };

    return (
        <Wrapper>
            {/* Display the sign up/in */}
            {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            {/*  perform mutation when a user submits the form */}
            <Form
                onSubmit= {e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}>
                    {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor='username'>Username:</label>
                        <input
                            required
                            type="text"
                            id="username"
                            name = "username"
                            placeholder="username"
                            />
                    </React.Fragment>)}
                    <label htmlFor="email">Email:</label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                    />
                    <label htmlFor="password"> Password:</label>
                    <input 
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    )

}

export default UserForm;
