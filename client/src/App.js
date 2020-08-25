import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'; 
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Menu from '../src/pages/Menu';
import Login from '../src/pages/Login';
// import Home from './src/pages/Home';


const client = new ApolloClient({
    request: (operation) => {
        const token = localStorage.getItem("id_token");
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            },
        });
    },
    uri: "/graphql",
});


const App = () => (

    <Fragment>
        <Menu />
        {/* <Home /> */}
        <Container>
            <Login />
        </Container>
    </Fragment>
);


export default App;