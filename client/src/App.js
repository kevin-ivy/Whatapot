import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Menu from '../src/pages/Menu';
import Login from '../src/pages/Login';
// import Home from './src/pages/Home';
import Signup from './pages/Signup';


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
            <div className="flex-column justify-flex-start min-100-vh">
                {/* <Header /> */}
                <div className="container">
                    <Switch>

                        <Route exact path="/login" component={Login} />

                        <Route exact path="/signup" component={Signup} />
                        <Fragment>
                        <Menu />
                        {/* <Home /> */}
                        <Container>
                        <Login />
                        </Container>
                        </Fragment>
                    </Switch>
                </div>

            </div>
        </Router>
    </ApolloProvider >
);


export default App;
