import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return (
        <nav className='navbar navbar-expand fixed-top navbar-dark bg-dark justify-content-between'>
            <a className='navbar-brand' href='/'>Whatapot</a>
            <div className='navbar' id='navbarNav'>
                <ul className='navbar-nav justify-content-between'>
                    {Auth.loggedIn() ? (
                        <>
                            <li className='navbar nav-item'>
                                <Link to='/profile' style={{textDecoration: 'none', color:'white'}}>My Profile</Link>
                            </li>
                            <li className='navbar nav-item'>
                                <a href='/' onClick={logout} style={{textDecoration: 'none', color:'white'}}>Logout</a>
                            </li>
                        </>
                    ): (
                        <>
                            <li className='navbar nav-item'>
                                <Link to='/login' className='no-text-decoration' style={{textDecoration: 'none', color:'white'}}>Login</Link>
                            </li>
                            <li className='navbar nav-item'>
                                <Link to='/signup' style={{textDecoration: 'none', color:'white'}}>Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
