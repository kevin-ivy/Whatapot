import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
          </Switch>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
