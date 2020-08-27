import React, {useState} from 'react';
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
    <main className='d-flex justify-content-center mt-4 p-3 w-100'>
        <div>
            <div className='card'>
                <h2 className='card-header text-center mb-3'>Login</h2>
                <div className='card-body p-2 m-3'>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <input 
                                className='form-control'
                                placeholder='Your email'
                                name='email'
                                type="email" 
                                id="email" 
                                value={formState.email}
                                onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <input 
                                className='form-control'
                                placeholder='********'
                                name='password'
                                type="password" 
                                id="password" 
                                value={formState.password}
                                onChange={handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-info w-100">Login</button>
                    </form>
                </div>
            </div>
            {error && <div className='mt-1 text-center'>Something went wrong!</div>}
        </div>
    </main>
    );
};

export default Login;