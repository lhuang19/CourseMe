/**
 * 
 * Higher order compoennt to wrap content when routing
 * 
 */

import React from 'react';
import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../components/Context/AuthContext';
import { useContext } from 'react';

function Layout(props: {children: JSX.Element}) {
    const { auth, user } = useContext(AuthContext);
    return (
        <div>
            <Header />
            <main className={classes.Content}>{props.children}</main>
            {auth ? (
                <footer className={classes.Footer}>{user}</footer>
            ) : (
                <footer className={classes.Footer}>Guest</footer>
            )}
        </div>
    );
}
export default Layout;
