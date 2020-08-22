import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';

import Menu from '../src/pages/Menu';
import Login from '../src/pages/Login';

const App = () => (
    <Fragment>
        <Menu />
        <Container>
            <Login />
        </Container>
    </Fragment>
);

export default App;