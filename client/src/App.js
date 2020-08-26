import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, } from "react-router-dom";

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
    <ApolloProvider client={client}>
        <Router>
            <Fragment>
                <Menu />
                {/* <Home /> */}
                <Container>
                    <Login />
                </Container>
            </Fragment>
        </Router>
    </ApolloProvider >
);


export default App;
