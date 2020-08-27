import React, {useState} from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {LOGIN_USER} from '../utils/mutations';
import {useMutation} from '@apollo/react-hooks'
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({email: '', password:''});
    const [login, {error}] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    //submit login form
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const {data} = await login({
                variables: {...formState}
            });
            Auth.login(data.login.token);
        } catch(e) {
            console.error(e);
        }
    };

    return (
    <Grid centered columns={2}>
        <Grid.Column>
            <Header as="h2" textAlign="center">
                Login
            </Header>
            <Segment>
                <Form size="large">
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email address"
                    />
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                    />

                    <Button color="blue" fluid size="large">
                        Login
                    </Button>
                </Form>
            </Segment>
            <Message>
                Not registered yet? <a href="#">Sign Up</a>
            </Message>
        </Grid.Column>
    </Grid>
    );
};

export default Login;