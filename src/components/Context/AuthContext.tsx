/**
 * 
 * Manages authorization information
 * Stores if user is authenticated and if so the user's name
 * Stores functions to set authenitation and name
 * Passes relevant info to consumers
 * 
 */


import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import Login from '../Login/Login';

export const AuthContext = React.createContext({
    auth: false,
    user: '',
    validated: () => {},
    setUser: (s: string) => {},
});

export const AuthContextProvider = (props: { children: JSX.Element }) => {
    const [authState, setAuthState] = useState(false);
    const [user, setUser] = useState('');
    const [showModal, setShowModal] = useState(true);

    const closeModalHandler = () => {
        setShowModal(false);
    };

    return (
        <AuthContext.Provider
            value={{
                auth: authState,
                user: user,
                validated: () => setAuthState(true),
                setUser: (value) => setUser(value),
            }}
        >
            <Modal show={showModal} close={closeModalHandler}>
                <Login close={closeModalHandler} />
            </Modal>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
