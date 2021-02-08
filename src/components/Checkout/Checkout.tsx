/**
 * 
 * Checkout page
 * Loads course information
 * Contains cart icon and title
 * Passes course information to draggable container
 * Navigation buttons
 * 
 */



import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CoursesContext } from '../Context/CoursesContext';
import { CartContext } from '../Context/CartContext';
import classes from './Checkout.module.css';
import Button from '../UI/Button/Button';
import CourseInfo from '../types/CourseInfo';
import DraggableContainer from './DraggableContainer/DraggableContainer';
import Spinner from '../UI/Spinner/Spinner';
import CartIcon from '../../img/cartIcon.png';

const Checkout = (props: RouteComponentProps) => {
    const { courses } = useContext(CoursesContext);
    const { cart } = useContext(CartContext);
    const [display, setDisplay] = useState(<Spinner />);

    useEffect(() => {
        if (courses) {
            let displayCourses: CourseInfo[] = [];
            for (let course of [...cart]) {
                const obj = courses.find((elem) => {
                    return elem.id === course;
                });
                if (obj) displayCourses.push(obj);
            }
            setDisplay(<DraggableContainer courses={displayCourses} />);
        }
    }, [cart, courses]);

    const backHandler = () => {
        props.history.push({
            pathname: '/',
        });
    };

    const continueHanlder = () => {
        props.history.push({
            pathname: '/receipt',
        });
    };
    return (
        <div className={classes.Checkout}>
            <div className={classes.TopBanner}>
                <img
                    src={CartIcon}
                    style={{
                        height: '42px',
                        width: '42px',
                    }}
                    className={classes.CartIcon}
                    alt="cartIcon"
                />
                <h1 className={classes.Title}>Cart</h1>
            </div>
            <hr className={classes.Hr} />
            {cart.length === 0 ? (
                <h1>No courses selected</h1>
            ) : (
                <div className={classes.DisplayList}>{display}</div>
            )}
            <p className={classes.DragPrompt}>Rank courses by dragging</p>
            <div className={classes.Buttons}>
                <Button color="black" onClick={backHandler}>
                    Back to Courses
                </Button>
                <Button
                    color="blue"
                    onClick={continueHanlder}
                    disabled={cart.length <= 0 || cart.length > 7}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Checkout);
