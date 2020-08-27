import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Menu from '../src/pages/Menu';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Home from './pages/Home';
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


function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="flex-column justify-flex-start min-100-vh">
                    <Header />
                    <div className="container">
                        <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        {/* <Route exact path="/profile" component={Profile} /> */}

                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
