/**
 * 
 * Login popup
 * Allows user to login/register/continue as gues
 * Updates authorization state
 * 
 */

import { useContext, useState } from 'react';
import classes from './Login.module.css';
import { AuthContext } from '../Context/AuthContext';
import axios from '../../axios-instance';
import Button from '../UI/Button/Button';

type CloseHndl = () => void;

const Login = (props: { close: CloseHndl }) => {
    const [mode, setMode] = useState('Login');

    const [usrName, setUsrName] = useState('');

    const [pwd, setPwd] = useState('');

    const { validated, setUser } = useContext(AuthContext);

    type InputHndl = (event: React.FormEvent<HTMLInputElement>) => void;
    const usrNameChangedHandler: InputHndl = (event) => {
        setUsrName(event.currentTarget.value);
    };
    const pwdChangedHandler: InputHndl = (event) => {
        setPwd(event.currentTarget.value);
    };

    const modeChangedHandler = (btnType: string) => {
        if (btnType !== mode) {
            setMode(btnType);
        }
    };

    const proceedAsGuestHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.close();
    };

    const loginHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        axios
            .get('/users.json')
            .then((response) => {
                return response.data;
            })
            .then((responseData) => {
                for (let user of responseData.users) {
                    if (user == null) continue;
                    if (user.name === usrName && user.password === pwd) {
                        validated();
                        setUser(usrName);
                        props.close();
                        return;
                    }
                }
                alert('Incorrect Username or Password');
            });
    };

    const registerHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        axios
            .get('/users.json')
            .then((response) => {
                return response.data;
            })
            .then((responseData) => {
                if (responseData === null) {
                    responseData = { users: [] };
                }
                for (let user of responseData.users) {
                    if (user == null) continue;
                    if (user.name === usrName) {
                        alert('Username has been taked already');
                        return;
                    }
                }
                if (pwd.length < 1) {
                    alert('Enter a password');
                    return;
                }
                const newData = {
                    users: [
                        ...responseData.users,
                        { name: usrName, password: pwd },
                    ],
                };
                axios.patch('/users.json', newData).then((responseData) => {
                    props.close();
                });
                validated();
                setUser(usrName);
            });
    };

    return (
        <div className={classes.Login}>
            <div className={classes.ButtonDisplay}>
                <button
                    className={[
                        classes.LeftButton,
                        classes.Button,
                        mode === 'Login' ? classes.Active : null,
                    ].join(' ')}
                    onClick={() => modeChangedHandler('Login')}
                >
                    Login
                </button>
                <button
                    className={[
                        classes.RightButton,
                        classes.Button,
                        mode === 'Register' ? classes.Active : null,
                    ].join(' ')}
                    onClick={() => modeChangedHandler('Register')}
                >
                    Register
                </button>
            </div>
            {mode === 'Login' ? (
                <div className={classes.Display}>
                    <h3 className={classes.LoginRegisterTitle}>Login</h3>
                    <form className={classes.Form}>
                        <input
                            placeholder="Username"
                            className={classes.FormElement}
                            value={usrName}
                            onChange={usrNameChangedHandler}
                        />
                        <hr className={classes.Hr}/>
                        <input
                            placeholder="Password"
                            className={classes.FormElement}
                            value={pwd}
                            onChange={pwdChangedHandler}
                            type="password"
                        />
                        <hr className={classes.Hr}/>
                        <div className={classes.LoginButtons}>
                            <Button
                                onClick={proceedAsGuestHandler}
                                color="blue"
                            >
                                GUEST (No Saving)
                            </Button>
                            <Button onClick={loginHandler} color="green">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className={classes.Display}>
                    <h3 className={classes.LoginRegisterTitle}>Register</h3>
                    <form className={classes.Form}>
                        <input
                            placeholder="Username"
                            className={classes.FormElement}
                            value={usrName}
                            onChange={usrNameChangedHandler}
                        />
                        <hr className={classes.Hr}/>
                        <input
                            placeholder="Password"
                            className={classes.FormElement}
                            value={pwd}
                            onChange={pwdChangedHandler}
                            type="password"
                        />
                        <hr className={classes.Hr}/>
                        <div className={classes.LoginButtons}>
                            <Button
                                onClick={proceedAsGuestHandler}
                                color="blue"
                            >
                                GUEST (No Saving)
                            </Button>
                            <Button onClick={registerHandler} color="green">
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
