/**
 * 
 * Shows saves receipts from sign-in users
 * Can delete previous receipts
 * 
 */

import { useEffect, useContext, useState, useCallback } from 'react';
import classes from './Schedules.module.css';
import { AuthContext } from '../Context/AuthContext';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../axios-instance';
import Schedule from './Schedule/Schedule';

const Schedules = (props: RouteComponentProps) => {
    const { auth, user } = useContext(AuthContext);
    const [display, setDisplay] = useState(
        <h1>Login to Display Saved Schedules</h1>
    );

    const deleteScheduleHandler = useCallback(
        (id: number) => {
            axios
                .get('/users.json')
                .then((response) => {
                    return response.data;
                })
                .then((responseData) => {
                    for (let key in responseData.users) {
                        const entry = responseData.users[key];
                        if (entry == null) continue;
                        if (entry.name === user) {
                            axios
                                .delete(
                                    `/users/users/${key}/schedules/${id}.json`
                                )
                                .then((response) =>
                                    props.history.push('/schedules')
                                );
                            return;
                        }
                    }
                });
        },
        [props.history, user]
    );
    useEffect(() => {
        if (auth) {
            setDisplay(<h1>Loading...</h1>);
            axios
                .get('/users.json')
                .then((response) => {
                    return response.data;
                })
                .then((responseData) => {
                    for (let elem of responseData.users) {
                        if (elem == null) continue;
                        if (elem.name === user) {
                            if (
                                elem.schedules === null ||
                                elem.schedules === undefined
                            ) {
                                setDisplay(<h1>No Schedules to Display</h1>);
                                return;
                            }

                            setDisplay(
                                <div>
                                    {Object.keys(elem.schedules).map(
                                        (key, id) => {
                                            let item = elem.schedules[key];
                                            if (item == null) return null;
                                            return (
                                                <Schedule
                                                    key={key}
                                                    name={item.name}
                                                    courses={item.list}
                                                    remove={() =>
                                                        deleteScheduleHandler(
                                                            Number(key)
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            );
                            return;
                        }
                    }
                });
        }
    }, [auth, user, deleteScheduleHandler]);

    return <div className={classes.Schedules}>{display}</div>;
};

export default Schedules;
